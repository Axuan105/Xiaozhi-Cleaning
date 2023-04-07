"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_address = require("../../api/modules/address.js");
const store_address = require("../../store/address.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_goods_action_button = common_vendor.resolveComponent("van-goods-action-button");
  const _component_van_goods_action = common_vendor.resolveComponent("van-goods-action");
  (_component_van_tag + _component_van_icon + _component_van_goods_action_button + _component_van_goods_action)();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const getAddress = store_address.GetAddress();
    const state = common_vendor.reactive({
      addressList: []
    });
    const modifyAdress = (id) => {
      const index = state.addressList.findIndex((item) => item.id === id);
      getAddress.address(state.addressList[index]);
      common_vendor.index.navigateTo({
        url: `/subpkg/add-address/add-address?id=${id}`
      });
    };
    const getOrder = (id) => {
      const pages = getCurrentPages();
      const page = pages[pages.length - 2].route;
      if (page !== "subpkg/place-order/place-order")
        return;
      common_vendor.index.navigateBack();
    };
    const clickAddress = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/add-address/add-address"
      });
    };
    const info = async () => {
      const { data } = await api_modules_address.reqgetdzList();
      state.addressList = data.data;
      if (data.code === 401)
        return;
      state.addressList.forEach((item) => {
        item.phone = item.phone.slice(0, 3) + "****" + item.phone.slice(7);
      });
    };
    common_vendor.onLoad(async (message) => {
      info();
    });
    common_vendor.onShow(() => {
      info();
    });
    common_vendor.onHide(() => {
    });
    const { addressList } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addressList), (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.province),
            b: common_vendor.t(item.county),
            c: common_vendor.t(item.city),
            d: item.onsale !== 0
          }, item.onsale !== 0 ? {
            e: "d46aad20-0-" + i0,
            f: common_vendor.p({
              type: "danger",
              round: true
            })
          } : {}, {
            g: common_vendor.t(item.contacts),
            h: common_vendor.t(item.phone),
            i: "d46aad20-1-" + i0,
            j: common_vendor.o(($event) => modifyAdress(item.id), item.id),
            k: common_vendor.o(($event) => getOrder(item.id), item.id),
            l: item.id
          });
        }),
        b: common_vendor.p({
          name: "edit",
          size: "20"
        }),
        c: common_vendor.o(clickAddress),
        d: common_vendor.p({
          text: "添加地址"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/address/address.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
