"use strict";
const common_vendor = require("../common/vendor.js");
const GetOrder = common_vendor.defineStore("GetOrder", {
  state: () => ({
    order: {},
    title: ""
  }),
  // 函数
  actions: {
    addordder(obj) {
      this.order = obj;
      console.log(this.order);
    },
    getTitle(item) {
      this.title = item;
    }
  },
  // 计算属性
  getters: {}
});
exports.GetOrder = GetOrder;
