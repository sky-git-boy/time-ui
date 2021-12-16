import request from "@/utils/request";

export const requestLogin = params => {
  return request({
    url: "/member/login",
    method: "post",
    data: params
  });
};
