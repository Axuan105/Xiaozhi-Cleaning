"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/order/order.js";
  "./pages/my/my.js";
  "./subpkg/remark/remark.js";
  "./subpkg/anchor/anchor.js";
  "./subpkg/details/details.js";
  "./subpkg/search/search.js";
  "./subpkg/login/login.js";
  "./subpkg/order-state/order-state.js";
  "./subpkg/address/address.js";
  "./subpkg/add-address/add-address.js";
  "./subpkg/service/service.js";
  "./subpkg/place-order/place-order.js";
  "./subpkg/cancelOrder/cancelOrder.js";
  "./subpkg/refer-remark/refer-remark.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
