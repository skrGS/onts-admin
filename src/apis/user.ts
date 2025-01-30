import { HttpRequest } from "@/utils/request";

// const appHttpRequest = new HttpRequest(null, `http://localhost:3011`);
const appHttpRequest = new HttpRequest(null, `https://onts.boosters.mn`);

export const getUsers = async ({page, city, isPayment, registerNumber}: {page: number, city?: string, isPayment?: boolean, registerNumber?: string}) => {
  const res = await appHttpRequest.get("/users", {page, city, isPayment, registerNumber});
  return res;
};

export const userPaymentSuccess = async (id: string) => {
  const res = await appHttpRequest.post(`/user/payment-success/${id}`);
  return res
}

export const userEdit = async (id: string, data: {
  firstName: string;
  lastName: string;
  registerNumber: string;
  phone: string
}) => {
  const res = await appHttpRequest.post(`/user/update/${id}`, data);
  return res;
}

export const userDelete = async (id: string) => {
  const res = await appHttpRequest.del(`/delete/${id}`);
  return res;
}