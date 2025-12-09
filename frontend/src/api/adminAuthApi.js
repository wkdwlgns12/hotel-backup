import axiosClient from "./axiosClient";

const adminAuthApi = {
  // 로그인
  login: (credentials) => {
    return axiosClient.post("/auth/login", credentials);
  },

  // 내 정보 조회
  getMyInfo: () => {
    return axiosClient.get("/auth/me");
  },

  // 비밀번호 변경
  changePassword: (data) => {
    return axiosClient.put("/user/me/password", data);
  },
  
  // 사업자 회원가입 (백엔드에만 있고 프론트에 없던 기능, 필요시 사용)
  registerOwner: (data) => {
    return axiosClient.post("/auth/owner/register", data);
  }
};

export default adminAuthApi;