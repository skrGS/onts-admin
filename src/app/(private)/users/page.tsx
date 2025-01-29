"use client";
import { userApi} from "@/apis";
import { message } from "@/utils/toast";
import useSWR from "swr";
import { Table, Spin, Card, Button, Form, Input,  Select, Alert,  Tag } from "antd";
import {  MoneyCollectTwoTone } from "@ant-design/icons";
import { useState } from "react";
import ConfirmModal from "@/components/modal/confirm-modal";

export interface IUser {
  phone: string;
  tier: string;
  role: string;
  spentAmount: number;
  _id: string;
  city: string;
  wallet: {
    isPayment: boolean;
    _id: string;
    amount: number;
  };
  registerNumber: string;
}

const Page = () => {
  const { data: userData, isLoading: isUserLoading, error: userError, mutate } = useSWR<IUser[]>(
    `swr.user.list`,
    async () => {
      try {
        const res = await userApi.getUsers();
        return res;
      } catch (err: any) {
        message.error(err.message || "Failed to fetch users");
        return [];
      }
    }
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchRegister, setSearchRegister] = useState<string>("")
  const [selectCity, setSelectCity] = useState<string | undefined>(undefined);
  const [selectPayment, setSelectPayment] = useState<boolean | undefined>(undefined);

  const handleEditClick = (user: IUser) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

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
  };

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
        </div>
      ),
    },
  ];

  const allCity = Array.from(
    new Set(
      userData?.flatMap((user) => user.city || []).map((p) => p.trim())
    )
  );

  const filteredData = userData?.filter(user => {
    const matchesRoleName = user.phone?.includes(searchTerm.toLowerCase());
    const matchesRegister = user.registerNumber?.includes(searchRegister.toUpperCase());
    const matchesPermission = selectCity
      ? user.city && user.city?.includes(selectCity)
      : true;
      const matchesPayment = selectPayment !== undefined ? user.wallet?.isPayment === selectPayment : true;

    return matchesRoleName && matchesPermission && matchesPayment && matchesRegister
  }) || [];

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (userError) {
    return <div className="text-red-500">Error: {userError.message}</div>;
  }

  const renderFilterForm = () => (
    <div className="flex justify-between items-center w-full">
      <Form layout="inline">
        {/* <Form.Item label="Утасны дугаар" name="phone">
          <Input.Search
            placeholder="Утасны дугаар"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            enterButton
          />
        </Form.Item> */}
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
  

  return (
    <div className="flex flex-col w-full p-4">
      <Card bordered={false} title="Хэрэглэгчид">
        {renderFilterForm()}
        <br />
        <Alert
          message={
            <p className="mb-0">
              Нийт тоо: <b>{filteredData.length || 0}</b>
            </p>
          }
          type="info"
          className="mb-4"
        />
        <div className="overflow-x-auto">
        <Table dataSource={filteredData} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} />
        </div>
      </Card>
      <ConfirmModal
      onCancel={handleModalCancel}
      onOk={handleAcceptPayment}
      visible={isModalVisible}
      user={currentUser}
      />
    </div>
  );
};

export default Page;
