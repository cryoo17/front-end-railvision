import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instanceLocal = axios.create({
  baseURL: environment.LOCAL_URL,
  headers,
  timeout: 60 * 1000,
});

instanceLocal.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

instanceLocal.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instanceLocal;
