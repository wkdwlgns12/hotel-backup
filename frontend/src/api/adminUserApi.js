import axiosClient from "./axiosClient";

export const adminUserApi = {
  // [Admin] 사용자 목록 조회
  getUsers: (params) => {
    return axiosClient.get("/user/admin", { params });
  },

  // [Admin] 사용자 정보 수정 (Role, Block)
  updateUserByAdmin: (userId, data) => {
    return axiosClient.put(`/user/admin/${userId}`, data);
  },
};

export default adminUserApi;