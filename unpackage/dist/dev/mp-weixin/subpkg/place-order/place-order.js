"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_address = require("../../api/modules/address.js");
const api_modules_order = require("../../api/modules/order.js");
const store_order = require("../../store/order.js");
const store_address = require("../../store/address.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_goods_action_button = common_vendor.resolveComponent("van-goods-action-button");
  (_component_van_icon + _component_van_goods_action_button)();
}
const _sfc_main = {
  __name: "place-order",
  setup(__props) {
    const getOrder = store_order.GetOrder();
    const getAddress = store_address.GetAddress();
    const state = common_vendor.reactive({
      address: [],
      cid: "",
      oid: "",
      aid: "",
      orderId: "",
      show: true
    });
    const getDz = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/address/address"
      });
    };
    const getAddOrder = async () => {
      const { data } = await api_modules_order.reqZfjk({ cid: state.orderId, onsale: 2 });
      console.log(state.orderId);
      if (data.code === 200) {
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/order/order"
          });
        });
      } else {
        common_vendor.index.showToast({
          title: "支付失败",
          icon: "none"
        });
      }
    };
    const getShop = async () => {
      const { province, county, city, address: address2 } = state.address;
      const address22 = province + county + city + address2;
      const { phone } = common_vendor.index.getStorageSync("USERINFO");
      const { data } = await api_modules_order.reqShopOrder({ phone, address: address22, cid: state.cid, oid: state.oid });
      state.orderId = data.data;
    };
    const getaddress = async () => {
      const userInfo = common_vendor.index.getStorageSync("USERINFO");
      const { data } = await api_modules_address.reqgetdz({ id: getAddress.aid, uid: userInfo.uid });
      state.address = data.data[0];
      getShop();
    };
    const getSilent = async () => {
      const pages = getCurrentPages();
      const page = pages[pages.length - 2].route;
      if (page === "subpkg/details/details") {
        const id = "";
        getAddress.addsserId(id);
      }
      const { data } = await api_modules_address.reqgetdzList();
      if (!data.data.length) {
        common_vendor.index.showToast({ title: "请选择地址", icon: "none" });
        state.show = false;
        return;
      }
      const index = data.data.findIndex((item) => item.onsale === 1);
      if (index === -1) {
        state.address = data.data[0];
      } else {
        state.address = data.data[index];
      }
      const aid = getAddress.aid;
      if (aid === "") {
        getShop();
      } else {
        getaddress();
      }
    };
    const init = () => {
      console.log(getOrder.order);
    };
    common_vendor.onLoad((message) => {
      state.cid = message.cid;
      state.oid = message.oid;
      state.aid = message.aid;
      getSilent();
      init();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { address, show } = common_vendor.toRefs(state);
    const { order, title } = common_vendor.storeToRefs(getOrder);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        b: common_vendor.t(common_vendor.unref(address).province),
        c: common_vendor.t(common_vendor.unref(address).county),
        d: common_vendor.t(common_vendor.unref(address).city),
        e: common_vendor.t(common_vendor.unref(address).address),
        f: common_vendor.t(common_vendor.unref(address).contacts),
        g: common_vendor.t(common_vendor.unref(address).phone)
      } : {}, {
        h: common_vendor.p({
          name: "arrow",
          size: "20"
        }),
        i: common_vendor.o(getDz),
        j: !common_vendor.unref(order).img == ""
      }, !common_vendor.unref(order).img == "" ? {
        k: common_vendor.unref(order).img
      } : {}, {
        l: common_vendor.t(common_vendor.unref(title)),
        m: common_vendor.t(common_vendor.unref(order).label),
        n: common_vendor.t(common_vendor.unref(order).peice),
        o: common_vendor.o(getAddOrder),
        p: common_vendor.p({
          text: "确认支付"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/place-order/place-order.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
