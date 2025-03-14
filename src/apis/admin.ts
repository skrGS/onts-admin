// /admin/chart-dashboard
import { HttpRequest } from "@/utils/request";

const appHttpRequest = new HttpRequest(null, `https://noskr.boosters.mn/admin`);
// const appHttpRequest = new HttpRequest(null, `http://localhost:3011/admin`);

export const getChartDashboard = async () => {
  const res = await appHttpRequest.get(`/chart-dashboard`);
  return res;
};

export const getDashboard = async () => {
  const res = await appHttpRequest.get("/dashboard");
  return res;
};

export const convertExcelByUser = async (startDate?: string, endDate?: string, isPayment?: boolean | null) => {
  const res = await appHttpRequest.get("/convert-excel", {startDate, endDate, isPayment})
  return res;
};