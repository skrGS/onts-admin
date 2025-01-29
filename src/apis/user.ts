import { HttpRequest } from "@/utils/request";

const appHttpRequest = new HttpRequest(null, `http://localhost:3011`);
// const appHttpRequest = new HttpRequest(null, `https://onts.boosters.mn`);

export const getUsers = async () => {
  const res = await appHttpRequest.get("/users");
  return res;
};

export const userPaymentSuccess = async (id: string) => {
  const res = await appHttpRequest.post(`/user/payment-success/${id}`);
  return res
}