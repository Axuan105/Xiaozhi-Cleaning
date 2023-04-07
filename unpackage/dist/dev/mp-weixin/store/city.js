"use strict";
const common_vendor = require("../common/vendor.js");
const UserCity = common_vendor.defineStore("UserCity", {
  state: () => ({
    city: "长沙"
  }),
  // 函数
  actions: {
    reviseCity(city) {
      this.city = city;
    }
  },
  // 计算属性
  getters: {}
});
exports.UserCity = UserCity;
