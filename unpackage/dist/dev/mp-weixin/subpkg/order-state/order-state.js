"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_order = require("../../api/modules/order.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "order-state",
  setup(__props) {
    const state = common_vendor.reactive({
      desc: "",
      id: "",
      shopDetail: {}
    });
    const ddzt = () => {
      const { onsale } = state.shopDetail;
      if (onsale == 1) {
        state.desc = "待支付";
      } else if (onsale == 2) {
        state.desc = "已支付";
      } else if (onsale == 3) {
        state.desc = "待派单";
      } else if (onsale == 4) {
        state.desc = "已派单";
      } else if (onsale == 5) {
        state.desc = "服务完成";
      } else {
        state.desc = "已取消";
      }
    };
    const getOrderDetail = async () => {
      const { data } = await api_modules_order.ApiShopDetail(state.id);
      console.log(data);
      state.shopDetail = data.data;
      ddzt();
    };
    common_vendor.onLoad((message) => {
      console.log(message);
      state.id = message.id;
      getOrderDetail();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { desc, shopDetail } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "checked",
          color: "#07c160",
          size: "14"
        }),
        b: common_vendor.t(common_vendor.unref(desc)),
        c: common_vendor.t(common_vendor.unref(shopDetail).category),
        d: common_vendor.t(common_vendor.unref(shopDetail).cid),
        e: common_vendor.t(common_vendor.unref(shopDetail).address),
        f: common_vendor.t(common_vendor.unref(shopDetail).phone),
        g: common_vendor.t(common_vendor.unref(shopDetail).label),
        h: common_vendor.t(common_vendor.unref(shopDetail).peice),
        i: common_vendor.t(common_vendor.unref(shopDetail).peice)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/order-state/order-state.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
