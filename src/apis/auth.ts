import { store } from "@/store";
import { authMe, setToken } from "@/store/auth-slice";
import { HttpRequest } from "@/utils/request";

// const appHttpRequest = new HttpRequest(null, `http://localhost:3011/user`);
const appHttpRequest = new HttpRequest(null, `https://noskr.boosters.mn/user`);

export const me = async () => {
  const res = await appHttpRequest.get("/me");
  store.dispatch(authMe(res?.user));
  return res?.user;
};

export const login = async (data: { phone: string; password: string }) => {
  const res = await appHttpRequest.post("/login", data);
  store.dispatch(setToken(res));
  return res;
};