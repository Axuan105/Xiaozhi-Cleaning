"use strict";
const common_vendor = require("../common/vendor.js");
const GetAddress = common_vendor.defineStore("GetAddress", {
  state: () => ({
    addressObj: {},
    aid: ""
  }),
  // 函数
  actions: {
    // 保存地址
    address(address) {
      this.addressObj = address;
    },
    addsserId(id) {
      this.aid = id;
    }
  },
  // 计算属性
  getters: {}
});
exports.GetAddress = GetAddress;
