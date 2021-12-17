import { requestLogin } from "@/api/user";
import router from "@/router";
import { setUserToken, isAuthenticated } from "@/utils/auth";

const state = {
  isUserLoggedIn: () => {
    return localStorage.getItem("userInfo") && isAuthenticated();
  },
};

const mutations = {};

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      requestLogin(payload.userDetails)
        .then((response) => {
          // If there's user data in response
          if (response.data) {
            var data = response.data
            // Set accessToken
            //localStorage.setItem("accessToken", response.data.accessToken);
            const token = data.access_token;
            const accessTime = data.expire
            const refreshToken = data.refreshToken;
            setUserToken(token, accessTime, refreshToken);

            // Navigate User to homepage
            router.push(router.currentRoute.query.to || "/");

            // Update user details
            commit("UPDATE_USER_INFO", data, { root: true });
            
            resolve(response);
          } else {
            reject({ message: "密码或手机号错误！！！" });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
