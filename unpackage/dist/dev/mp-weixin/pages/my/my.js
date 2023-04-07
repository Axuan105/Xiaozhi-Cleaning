"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_cell + _component_van_button)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const state = common_vendor.reactive({
      phone: "",
      show: false
    });
    const clickLogin = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/login/login"
      });
    };
    const getAddress = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/address/address"
      });
    };
    const getUserInfo = () => {
      const userInfo = common_vendor.index.getStorageSync("USERINFO");
      userInfo === "" ? state.show = false : state.show = true;
      if (!userInfo)
        return;
      state.phone = userInfo.phone.slice(0, 3) + "****" + userInfo.phone.slice(7);
    };
    const info = () => {
      getUserInfo();
    };
    const deleteLogin = () => {
      common_vendor.index.clearStorageSync("USERINFO");
      common_vendor.index.clearStorageSync("TOKEN");
      getUserInfo();
    };
    common_vendor.onLoad((message) => {
      info();
    });
    common_vendor.onShow(() => {
      info();
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { phone, show } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(show)
      }, !common_vendor.unref(show) ? {
        b: common_vendor.o(clickLogin)
      } : {
        c: common_vendor.t(common_vendor.unref(phone))
      }, {
        d: common_assets._imports_0$1,
        e: common_vendor.p({
          title: "我的优惠价",
          isLink: true
        }),
        f: common_assets._imports_1,
        g: common_vendor.p({
          title: "我的地址",
          isLink: true
        }),
        h: common_vendor.o(getAddress),
        i: common_assets._imports_2,
        j: common_vendor.p({
          title: "联系客服",
          isLink: true
        }),
        k: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        l: common_vendor.o(deleteLogin),
        m: common_vendor.p({
          type: "default",
          size: "large"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/pages/my/my.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
