import { AUTH_URL } from "../endpoints";
import { authHttpPost } from "../../utils/httpMethods";

export const LOGIN_USER = async (email: string, password: string) => {
  const response = await authHttpPost({ url: `${AUTH_URL}/login`, payload: { email, password} });
  return response;
};

export const REGISTER_USER = async (email: string, password: string, role: string, name: string) => {
  const response = await authHttpPost({ url: `${AUTH_URL}/register`, payload: {email, password, role ,name } });
  return response;
};

