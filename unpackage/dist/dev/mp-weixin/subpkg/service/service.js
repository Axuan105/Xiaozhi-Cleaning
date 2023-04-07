"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_home = require("../../api/modules/home.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
const _sfc_main = {
  __name: "service",
  setup(__props) {
    const state = common_vendor.reactive({
      cid: "",
      list: []
    });
    const init = async () => {
      const { data } = await api_modules_home.reqGetDate(state.cid);
      state.list = data.data.list;
      console.log(data.data.list);
    };
    common_vendor.onLoad((message) => {
      state.cid = message.id;
      init();
      common_vendor.index.setNavigationBarTitle({ title: message.title });
    });
    const getDetails = (id, cid) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/details/details?id=${id}&cid=${cid}`
      });
    };
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { list } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(list).length
      }, common_vendor.unref(list).length ? {
        b: common_vendor.f(common_vendor.unref(list), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.h1),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.jg),
            e: common_vendor.o(($event) => getDetails(item.id, item.cid), item.id),
            f: item.id
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/service/service.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
