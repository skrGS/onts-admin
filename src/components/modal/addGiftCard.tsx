import { brand } from "@/apis";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import useSWR from "swr";
import CompanySelect from "./companySelect";


interface Brand {
	_id: string;
	name: string;
  }

const AddGiftCard = ({isEditing , isModalVisible , setIsModalVisible , form, setIsEditing , setCurrentRecord , handleCreateOrEdit} :any) => {
	const { data: brands } = useSWR<Brand[]>(`/swr.brand.list`, async () => {
		try {
		  const res = await brand.list();
		  return res.brand || [];
		} catch (err: any) {
		  message.error(err.message || "Failed to fetch brands");
		  return [];
		}
	  });
	return(
	<Modal
        title={isEditing ? "Бэлгийн карт засах" : "Бэлгийн карт нэмэх"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setIsEditing(false);
          setCurrentRecord(null);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateOrEdit} layout="vertical">
          <Form.Item
            name="name"
            label="Нэр"
            rules={[{ required: true, message: "Нэр оруулна уу" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Үнийн дүн (₮)"
            rules={[{ required: true, message: "Үнийн дүн оруулна уу" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
          name="quantity"
          label="Тоо ширхэг"
          rules={[{ required: true, message: "Тоо ширхэг оруулна уу" }]}
          >
          <Input type="number" />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Хүчинтэй хугацаа"
            rules={[{ required: true, message: "Хүчинтэй хугацаа оруулна уу" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Бренд"
            rules={[{ required: true, message: "Бренд сонгоно уу" }]}
          >
            <Select placeholder="Бренд сонгоно уу">
              {brands?.map((brand: any) => (
                <Select.Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                {isEditing ? "Засах" : "Нэмэх"}
              </Button>
            </div>
          </Form.Item>
        </Form>
		<CompanySelect />
      </Modal>
	)
}

export default AddGiftCard;


