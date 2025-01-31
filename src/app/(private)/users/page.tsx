"use client";
import { adminApi, userApi} from "@/apis";
import { message } from "@/utils/toast";
import useSWR from "swr";
import { Table, Spin, Card, Button, Form, Input,  Select, Alert, Tag,  } from "antd";
import {  MoneyCollectTwoTone, EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import ConfirmModal from "@/components/modal/confirm-modal";
import { useForm } from "react-hook-form";
import UserEditModal from "@/components/modal/user-edit-modal";
import AdminAddModal from "@/components/modal/admin-add-modal";
import {format} from "date-fns"
import ExcelJS from "exceljs"
import DateFilterModal, { IExcelDateForm } from "@/components/modal/date-filter-modal";
export interface IUser {
  phone: string;
  role: string;
  firstName: string;
  lastName: string;
  district: string;
  lesson: string;
  level: string;
  emergencyPhone: string;
  spentAmount: number;
  _id: string;
  city: string;
  wallet: {
    isPayment: boolean;
    _id: string;
    amount: number;
  };
  registerNumber: string;
  classes: string;
  createdAt: Date;
  school: string;
};

export type IAdmin = {
  phone: string;
  password: string;
  cPassword: string;
}



const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [searchRegister, setSearchRegister] = useState<string>("")
  const [selectCity, setSelectCity] = useState<string | undefined>(undefined);
  const [selectPayment, setSelectPayment] = useState<boolean | undefined>(undefined);
  const [adminModal, setAdminModal] = useState<boolean>(false);
  const [dateModal, setDateModal] = useState<boolean>(false);
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const { data: userData, isLoading: isUserLoading, error: userError, mutate } = useSWR<
  {users:IUser[], total: number, totalPages:number, currentPage: number}
  >(
    `swr.user.list.${page}.${selectPayment}.${selectCity}.${searchRegister}`,
    async () => {
      try {
        const res = await userApi.getUsers({
          page,
          city: selectCity,
          registerNumber: searchRegister,
          isPayment: selectPayment,
        });
        return res;
      } catch (err: any) {
        message.error(err.message || "Failed to fetch users");
        return [];
      }
    }
  );
  const allCity = [
    "Улаанбаатар хот",
    "Архангай аймаг",
    "Баян-Өлгий аймаг",
    "Баянхонгор аймаг",
    "Булган аймаг",
    "Говь-Алтай",
    "Говьсүмбэр аймаг",
    "Дархан-Уул аймаг",
    "Дорноговь аймаг",
    "Дорнод аймаг",
    "Дундговь аймаг",
    "Завхан аймаг",
    "Орхон аймаг",
    "Өвөрхангай аймаг",
    "Өмнөговь аймаг",
    "Сүхбаатар аймаг",
    "Сэлэнгэ аймаг",
    "Төв аймаг",
    "Увс аймаг",
    "Ховд аймаг",
    "Хөвсгөл аймаг",
    "Хэнтий аймаг",
  ]
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<IUser>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      registerNumber: "",
      _id: "",
    },
  });
  const {
    handleSubmit: dateHandleSubmit,
    formState: { errors: dateErrors },
    control: dateControl,
  } = useForm<IExcelDateForm>({
    defaultValues: {
      startDate: "",
      endDate: "",
      isPayment: null,
    },
  });
  const {
    handleSubmit: adminHandleSubmit,
    formState: { errors: adminErrors },
    control: adminControl,
  } = useForm<IAdmin>();

  const handleEditClick = (user: IUser) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleUserClick = (user: IUser) => {
    setValue("firstName", user.firstName)
    setValue("lastName", user.lastName)
    setValue("phone", user.phone)
    setValue("registerNumber", user.registerNumber)
    setValue("_id", user._id)
    setIsEditModalVisible(true)
  }

  const handleDeleteClick = (user: IUser) => {
    setCurrentUser(user);
    setDeleteModal(true);
  }

  const handleUserDelete = async () => {
    if(currentUser){
      try{
        await userApi.userDelete(currentUser._id);
        message.success("Хэрэглэгчийг амжилттай устгалаа");
        setDeleteModal(false)
        setCurrentUser(null);
        setTimeout(() => mutate(), 500)
      } catch(err:any){
        message.error(err.error?.message || "Серверийн алдаа!")
      }
    }
  }

  const handleConvertUsers = async (data: IExcelDateForm) => {
    setLoading(true)
    try{
      const res = await adminApi.convertExcelByUser(data.startDate, data.endDate, data.isPayment);
      
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Users");
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = {bold: true}
      })
      worksheet.columns = [
        { header: "Овог", key: "lastName", width: 25 },
        { header: "Нэр", key: "firstName", width: 25 },
        { header: "Регистр", key: "registerNumber", width: 15 },
        { header: "Утас", key: "phone", width: 10 },
        { header: "Утас-2", key: "emergencyPhone", width: 10 },
        { header: "Хот/Аймаг", key: "city", width: 18 },
        { header: "Дүүрэг/Сум", key: "district", width: 18 },
        { header: "Сургууль", key: "school", width: 25 },
        { header: "Анги", key: "classes", width: 15 },
        { header: "Хичээл", key: "lesson", width: 65 },
        { header: "Төлбөр", key: "isPayment", width: 15 },
        { header: "Үүсгэсэн", key: "createdAt", width: 15 },
      ];
      await res?.forEach((user: IUser) => {
        const row = worksheet.addRow({
          lastName: user.lastName,
          firstName: user.firstName,
          registerNumber: user.registerNumber,
          phone: user.phone,
          emergencyPhone: user.emergencyPhone,
          city: user.city,
          district: user.district,
          school: user.school,
          classes: user.classes,
          lesson: user.lesson,
          isPayment: (user.wallet as any)?.isPayment ? "Төлсөн" : "Төлөөгүй",
          createdAt: format(new Date(user.createdAt || "0"), 'yyyy-MM-dd'),
        });

        
  
        const walletCell = row.getCell(11);
        walletCell.font = {
          color: {argb: user.wallet?.isPayment ? "00FF00": "FF0000"}
        }
        // walletCell.fill = {
        //   type: "pattern",
        //   pattern: "solid",
        //   fgColor: { argb: user.wallet?.isPayment ? "00FF00" : "FF0000" }, // Green if true, Red if false
        // };
      });
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.xlsx'; // Name of the downloaded file
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up

      setDateModal(false);
      setLoading(false)
    } catch(err:any){
      setLoading(false)
      message.error(err.error?.message || "Серверийн алдаа!")
    }
  }

  const handleUserEdit = async (data: IUser) => {
    const newData=  {
      firstName: data.firstName,
      lastName: data.lastName,
      registerNumber: data.registerNumber,
      phone: data.phone
    }
      try{
        await userApi.userEdit(data._id, newData)
        message.success("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ");
        setIsEditModalVisible(false)
        setCurrentUser(null)
        setTimeout(() => mutate(), 500)
      } catch(err: any){
        message.error(err.error?.message || "Серверийн алдаа!")
      }
  }
  const handleAdminAdd = async (data: IAdmin) => {
      try{
        await userApi.addAdmin({data})
        message.success("Админ амжилттай нэмэгдлээ");
        setIsEditModalVisible(false)
        setCurrentUser(null)
        setTimeout(() => mutate(), 500)
      } catch(err: any){
        message.error(err.error?.message || "Серверийн алдаа!")
      }
  }

  const handleAcceptPayment = async () => {
    if(currentUser){
      try{
        await userApi.userPaymentSuccess(currentUser!._id);
        message.success("Төлбөр амжилттай баталгаажууллаа")
        setIsModalVisible(false);
        setCurrentUser(null);
        setTimeout(() => mutate(), 500)
      } catch(err:any){
        message.error(err.error?.message || "Failed to update accept payment")
      }
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    setIsEditModalVisible(false);
  };

  const addbutton = (
    <Button type="primary" icon={<PlusOutlined />} className="rounded-md" onClick={() => setAdminModal(true)}>
      Нэмэх
    </Button>
  );


  const columns = [
    {
      title: "№",
      key: "number",
      render: (_: any, __: IUser, index: number) => index + 1, 
    },
    {
      title: "Регистр",
      dataIndex: "registerNumber",
      key: "registerNumber",
    },
    {
      title: "Утас",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Овог",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: `firstName`,
      key: "firstName",
    },
    {
      title: "Хот",
      dataIndex: "city",
      key: "city",
    },
    
    {
      title: "Сургууль",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Анги",
      dataIndex: "classes",
      key: "classes",
    },
    {
      title:"Хичээл",
      dataIndex: "lesson",
      key: "lesson"
    },
    {
      title: "Төлбөр",
      dataIndex: "wallet",
      key: "wallet",
      render: (wallet: any) => {
        const color = wallet?.isPayment ? "green" : "red"
        return <Tag color={color}>{wallet?.amount || 0}</Tag>
      }
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text: any, record: IUser) => (
        <div className="flex flex-row g-4">
          {!record.wallet?.isPayment  ? 
        <Button
        type="link"
        icon={<MoneyCollectTwoTone />}
        onClick={() => handleEditClick(record)}
        />
        :
        null
      }
      <Button
      type="link"
      icon={<EditTwoTone/>}
      onClick={() => handleUserClick(record)}
      />
      <Button
      type="link"
      icon={<DeleteTwoTone/>}
      onClick={() => handleDeleteClick(record)}
      />
        </div>
      ),
    },
  ];

  if (userError) {
    return <div className="text-red-500">Error: {userError.message}</div>;
  }

  const renderFilterForm = () => (
    <div className="flex justify-between items-center w-full">
      <Form layout="inline">
   
        <Form.Item label="Регистр	" name="registerNumber">
          <Input.Search
            placeholder="Регистр"
            value={searchRegister}
            onChange={(e) => setSearchRegister(e.target.value)}
            enterButton
          />
        </Form.Item>
        <Form.Item label="Хот" name="city">
          <Select
            placeholder="Хот сонгох"
            value={selectCity}
            onChange={(value) => setSelectCity(value)}
            allowClear
          >
            {allCity.map((city) => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Төлбөрийн төлөв" name="isPayment">
          <Select
            placeholder="Төлбөрийн төлөв"
            value={selectPayment}
            onChange={(value) => setSelectPayment(value)}
            allowClear
          >
            {[true,false].map((payment, index) => (
              <Select.Option key={index} value={payment}>
                {payment ? "Төлөгдсөн" : "Төлөгдөөгүй"}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );

  
  const convert = (
    <Button type="primary" loading={loading} icon={<PlusOutlined />} className="rounded-md" onClick={() => setDateModal(true)}>
      Excel татах
    </Button>
  );
  
  return (
    <div className="flex flex-col w-full p-4">
      <Card 
      bordered={false}
      title="Хэрэглэгчид" 
      extra={convert}
      >
        {renderFilterForm()}
        <br />
        <Alert
          message={
            <p className="mb-0">
              Нийт тоо: <b>{userData?.total || 0}</b>
            </p>
          }
          type="info"
          className="mb-4"
        />
        {isUserLoading ? 
       <div className="flex justify-center items-center h-screen">
       <Spin tip="Loading..." />
     </div>
     :  
        <div className="overflow-x-auto">
        <Table 
        dataSource={userData?.users}
         columns={columns}
          rowKey="_id" 
         pagination={{
           current: userData?.currentPage,
           pageSize:10,
           onChange: (page) => setPage(page),
           total: userData?.total
         }} />
        </div>
        }
      </Card>
      <ConfirmModal
      onCancel={handleModalCancel}
      onOk={handleAcceptPayment}
      visible={isModalVisible}
      user={currentUser}
      />
      <UserEditModal
      onCancel={handleModalCancel}
      onOk={handleUserEdit}
      visible={isEditModalVisible}
      handleSubmit={handleSubmit}    
      errors={errors}  
      control={control}
      />
      <DateFilterModal
      onCancel={() => setDateModal(!dateModal)}
      onOk={handleConvertUsers}
      visible={dateModal}
      handleSubmit={dateHandleSubmit}    
      errors={dateErrors}  
      control={dateControl}
      />
      <AdminAddModal
      onCancel={() => setDeleteModal(false)}
      onOk={handleAdminAdd}
      visible={adminModal}
      handleSubmit={adminHandleSubmit}    
      errors={adminErrors}  
      control={adminControl}
      />
      <ConfirmModal
      onCancel={handleModalCancel}
      onOk={handleUserDelete}
      visible={deleteModal}
      user={currentUser}
      description="Тухайн хэрэглэгчийн мэдээлэл дахин сэргээгдэхгүйг анхаарна уу!"
      title="Хэрэглэгч устгах"
      okText="Устгах"
      type="error"
      />
    
    </div>
  );
};

export default Page;
