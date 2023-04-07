"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_order = require("../../api/modules/order.js");
require("../../api/index.js");
const store_order = require("../../store/order.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_icon + _component_van_tab + _component_van_tabs)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const getOrder1 = store_order.GetOrder();
    const state = common_vendor.reactive({
      orderList: [],
      isToken: true
    });
    const getReviseZt = (i, id) => {
      const index = state.orderList.findIndex((item) => item.cid == id);
      getOrder1.addordder(state.orderList[index]);
      console.log(index);
      console.log(i, id);
      common_vendor.index.navigateTo({
        url: `/subpkg/place-order/place-order?cid=${id}`
      });
    };
    const cancelOrder = (id) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/cancelOrder/cancelOrder?cid=${id}`
      });
    };
    const getRevise = async (id) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/refer-remark/refer-remark?id=${id}`
      });
    };
    const getOrder = async () => {
      const { data } = await api_modules_order.ApiShopOrder();
      state.orderList = data.data.reverse();
      console.log(data.data);
    };
    const init = () => {
      const token = common_vendor.index.getStorageSync("TOKEN");
      if (!token) {
        return state.isToken = false;
      } else {
        state.isToken = true;
      }
      getOrder();
    };
    const getLogin = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/login/login"
      });
    };
    const clickOrderState = (id) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/order-state/order-state?id=${id}`
      });
    };
    common_vendor.onLoad((message) => {
      init();
    });
    common_vendor.onShow(() => {
      init();
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { orderList, isToken } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isToken)
      }, common_vendor.unref(isToken) ? common_vendor.e({
        b: common_vendor.unref(orderList).length
      }, common_vendor.unref(orderList).length ? {
        c: common_vendor.f(common_vendor.unref(orderList), (item, k0, i0) => {
          return common_vendor.e({
            a: item.img,
            b: common_vendor.t(item.category),
            c: item.onsale === 1
          }, item.onsale === 1 ? {} : item.onsale === 2 ? {} : item.onsale === 3 ? {} : item.onsale === 4 ? {} : item.onsale === 5 ? {} : item.onsale === 7 ? {} : {}, {
            d: item.onsale === 2,
            e: item.onsale === 3,
            f: item.onsale === 4,
            g: item.onsale === 5,
            h: item.onsale === 7,
            i: "22a4be58-2-" + i0 + ",22a4be58-1",
            j: common_vendor.t(item.time),
            k: "22a4be58-3-" + i0 + ",22a4be58-1",
            l: common_vendor.t(item.address),
            m: common_vendor.o(($event) => clickOrderState(item.id), item.id),
            n: item.onsale === 1
          }, item.onsale === 1 ? {
            o: common_vendor.o(($event) => cancelOrder(item.cid), item.id),
            p: common_vendor.o(($event) => getReviseZt(2, item.cid), item.id)
          } : {}, {
            q: item.onsale === 2 || item.onsale === 3 || item.onsale === 4
          }, item.onsale === 2 || item.onsale === 3 || item.onsale === 4 ? {
            r: common_vendor.o(($event) => cancelOrder(item.cid), item.id)
          } : {}, {
            s: item.oonsale == 0
          }, item.oonsale == 0 ? {
            t: common_vendor.o(($event) => getRevise(item.id), item.id)
          } : {}, {
            v: item.oonsale == 1
          }, item.oonsale == 1 ? {} : {}, {
            w: item.id
          });
        }),
        d: common_vendor.p({
          size: "16",
          name: "clock-o"
        }),
        e: common_vendor.p({
          size: "16",
          name: "location-o"
        }),
        f: common_vendor.p({
          title: "全部订单"
        }),
        g: common_vendor.p({
          title: "周期服务"
        })
      } : {}) : {
        h: common_vendor.o(getLogin)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/pages/order/order.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
