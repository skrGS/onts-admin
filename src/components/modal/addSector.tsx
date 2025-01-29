import { branch, department } from "@/apis";
import { branchCreate, branchUpdate } from "@/apis/branch";
import { useState } from "react";
import useSWR from "swr";
import { useEffect } from "react";
import { Button, message, Upload, UploadFile } from "antd";
interface FormData {
  name: string;
  startDate: string;
  endDate: string;
  phone: string;
  description: string;
  departmentId: string;
  discountPercentage: number;
  longitude: number;
  latitude: number;
}

const AddSector = ({
  mutate,
  setOpenModal,
  branch: selectedBranch,
  isEditing,
}: any) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startDate: "",
    endDate: "",
    phone: "",
    description: "",
    departmentId: "",
    longitude: 0,
    latitude: 0,
    discountPercentage: 0,
  });

  const [imageId, setImageId] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if (isEditing && selectedBranch) {
      setFormData({
        name: selectedBranch.name,
        startDate: selectedBranch.startDate,
        endDate: selectedBranch.endDate,
        phone: selectedBranch.phone,
        description: selectedBranch.description,
        departmentId: selectedBranch.departmentId || "",
        discountPercentage: selectedBranch.discountPercentage ?? 0,
        longitude: selectedBranch.location?.coordinates[0] || "",
        latitude: selectedBranch.location?.coordinates[1] || "",
      });
      setImageId(selectedBranch.image?._id || "");
      setImageURL(selectedBranch.image?.url || "");
    } else {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        phone: "",
        description: "",
        departmentId: "",
        discountPercentage: 0,
        longitude: 0,
        latitude: 0,
      });
      setImageId("");
      setImageURL(""); 
    }
  }, [isEditing, selectedBranch]);
  


  const { data: departmentList } = useSWR(`swr.department.list`, async () => {
    const res = await department.departmentList();
    return res;
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]:
        name === "discountPercentage" ||
        name === "longitude" ||
        name === "latitude"
          ? value === "" || /^[0-9.-]*$/.test(value)
            ? value 
            : formData[name] 
          : value,
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const branchData = {
      ...formData,
      image: imageId,
    };

    try {
      const result = isEditing
        ? await branchUpdate(selectedBranch._id, branchData)
        : await branchCreate(branchData);

      if (result) {
        message.success(`Салбар ${isEditing ? "засагдлаа" : "нэмэгдлээ"}!`);
        setOpenModal(false);
        mutate();
      }
    } catch (error: any) {
      message.error(error.message || "Алдаа гарлаа");
    }
  };

  return (
    <>
      <div className="rounded-sm bg-white shadow-default mt-10">
        <form action="#" onSubmit={handleSubmit}>
          <div className="p-6.5 flex flex-col gap-y-4">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Нэр <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
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
              <label className="mb-3 block text-sm font-medium text-black">
                longitude
              </label>
              <input
                name="longitude"
                onChange={handleChange}
                value={formData.longitude}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                latitude
              </label>
              <input
                name="latitude"
                onChange={handleChange}
                value={formData.latitude}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Department сонгох <span className="text-meta-1">*</span>
              </label>
              <select
                name="departmentId"
                onChange={handleChange}
                value={formData.departmentId}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              >
                <option value="" disabled>
                  Department сонгох
                </option>
                {departmentList &&
                  departmentList.map((company: any) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Утас
              </label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Ажил эхлэх цаг
              </label>
              <input
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
                name="startDate"
                onChange={handleChange}
                value={formData.startDate}
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Ажил дуусах цаг
              </label>
              <input
                type="text"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
                name="endDate"
                onChange={handleChange}
                value={formData.endDate}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Нэмэлт мэдээлэл
              </label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black">
                Хөнгөлөлтийн хувь
              </label>
              <input
                type="number"
                name="discountPercentage"
                onChange={handleChange}
                value={formData.discountPercentage}
                min={0}
                max={100}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#0e1245] p-3 font-medium text-white hover:bg-opacity-90"
            >
              Нэмэх
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSector;
