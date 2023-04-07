"use strict";
const common_vendor = require("../common/vendor.js");
const api_modules_login = require("../api/modules/login.js");
const GetUserInfo = common_vendor.defineStore("GetUserInfo", {
  state: () => ({
    token: "",
    uid: ""
  }),
  // 函数
  actions: {
    // 保存token
    getInfo(token, uid) {
      this.token = token;
      this.uid = uid;
      common_vendor.index.setStorageSync("TOKEN", this.token);
      this.getUserIofn();
    },
    // 获取用户信息
    async getUserIofn() {
      const {
        data
      } = await api_modules_login.reqUserGethy({
        uid: this.uid
      });
      common_vendor.index.setStorageSync("USERINFO", {
        phone: data.data.phone,
        uid: this.uid
      });
    },
    signOutLogin() {
      common_vendor.index.removeStorage("TOKEN");
      common_vendor.index.removeStorage("USERINFO");
    },
    //是否登录
    judgeLogin() {
      const token = common_vendor.index.getStorageSync("TOKEN");
      if (!token) {
        return common_vendor.index.navigateTo({
          url: "/subpkg/login/login"
        }, 1e3);
      }
    }
  },
  // 计算属性
  getters: {}
});
exports.GetUserInfo = GetUserInfo;
