import { company } from "@/apis";
import { useState } from "react";

const AddCompany = ({ mutate, setOpenModal, companyList }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    createdDate: "",
    numberOfEmployees: "",
    activity: "",
    theMission: "",
    introduction: "",
    address: "",
    website: "",
    phone: "",
    email: "",
    logo: "",
    parentId: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await company.companyCreate({
      name: formData.name,
      createdDate: formData.createdDate,
      numberOfEmployees: formData.numberOfEmployees,
      activity: formData.activity,
      theMission: formData.theMission,
      introduction: formData.introduction,
      address: formData.address,
      website: formData.website,
      phone: formData.phone,
      email: formData.email,
      logo: formData.logo,
      parentId: formData.parentId,
    });

    console.log(result);
    if (result) {
      setOpenModal(false);
      mutate();
    }
  };

  const [checked, setChecked] = useState(false);

  console.log(company);

  return (
    <>
      <div className="rounded-sm bg-white shadow-default  mt-10">
        <form action="#" onSubmit={handleSubmit}>
          <div className="p-6.5 flex flex-col gap-y-4">
            <div className="mb-4.5 flex items-start gap-x-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Толгой компанитай эсэх :
              </label>
              <input
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
                className="h-[20px] w-[20px]"
              />
            </div>
            {checked && (
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                  Компанийн нэр <span className="text-meta-1">*</span>
                </label>
                <select
                  name="parentId"
                  onChange={handleChange}
                  value={formData.parentId}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
                >
                  <option value="" disabled selected>
                    Компани сонгох
                  </option>
                  {companyList?.map((company: any) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Нэр <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Байгуулагдсан огноо
              </label>
              <input
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Ажилчдын тоо
              </label>
              <input
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Үйл ажиллагааны чиглэл
              </label>
              <input
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Эрхэм зорилго
              </label>
              <input
                name="theMission"
                value={formData.theMission}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Товч танилцуулга
              </label>
              <input
                name="introduction"
                value={formData.introduction}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Хаяг
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Веб сайт
              </label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                Утас
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-gray-600">
                И-мэйл
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-600r dark:border-form-strokedark dark:bg-form-input dark:text-gray-600 dark:focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#0e1245] p-3 font-medium text-gray hover:bg-opacity-90 text-white"
            >
              Нэмэх
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCompany;
