import axiosnew from "../axios";

export const login = async (formData) => {
  const response = await axiosnew.post(`/api/login`, formData);
  return response.data;
};
