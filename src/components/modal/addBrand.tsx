import { branch, brand } from "@/apis";
import { create, update } from "@/apis/brand";
import { Button, message, Upload, UploadFile } from "antd";
import { useState, useEffect } from "react";
import useSWR from "swr";

const AddBrand = ({ mutate, setOpenModal, selectedBrand ,isEditing}: any) => {
  const [formData, setFormData] = useState({
    name: "",
    branchId: "",
  });

  const {
    data: branchList,
    isLoading,
    error,
  } = useSWR(`swr.department.list`, async () => {
    try {
      const res = await branch.branchList();
      return res;
    } catch (err: any) {
      alert(err);
    }
  });

  const [imageId, setImageId] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if (selectedBrand) {
      setFormData({
        name: selectedBrand.name,
        branchId: selectedBrand.branchId,
      });
    }
  }, [selectedBrand]);

  const handleImageUpload = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file as any);

    try {
      const res = await branch.imageUpload(formData);
      if (res?.data?.imageId) {
        setImageId(res.data.imageId);
        setImageURL(res.data.url);
        message.success("Зураг амжилттай сонгогдлоо!");
      } else {
        message.error("Image upload failed: no imageId returned");
      }
    } catch (error: any) {
      message.error("Failed to upload image");
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const brandData = {
      ...formData,
      image: imageId,
    };

    const result = isEditing
      ? await update(selectedBrand._id, brandData)
      : await create(brandData);

    if (result) {
      setOpenModal(false);
      mutate();
    }
  };

  return (
    <div className="rounded-sm bg-white shadow-default mt-10">
      <form action="#" onSubmit={handleSubmit}>
        <div className="p-6.5 flex flex-col gap-y-4">
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
              Салбарын нэр <span className="text-meta-1">*</span>
            </label>
            <select
              name="branchId"
              onChange={handleChange}
              value={formData.branchId}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
            >
              <option value="" disabled>
                Салбар сонгох
              </option>
              {branchList &&
                branchList.map((company: any) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Зураг <span className="text-meta-1">*</span> 
              </label>
              <Upload
                beforeUpload={(file) => {
                  handleImageUpload(file);
                  return false;
                }}
                listType="picture"
                maxCount={1}
                onRemove={() => setImageId("")}
              >
                <Button icon={<i className="ri-image-add-line" />}>
                  Зураг оруулах
                </Button>
              </Upload>
    
            </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
              Нэр <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600 dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-[#0e1245] p-3 font-medium text-gray hover:bg-opacity-90 text-white"
          >
            {selectedBrand ? "Засах" : "Нэмэх"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
