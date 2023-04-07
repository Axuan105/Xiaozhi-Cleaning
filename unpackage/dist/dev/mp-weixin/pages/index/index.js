"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_modules_home = require("../../api/modules/home.js");
const store_city = require("../../store/city.js");
const store_user = require("../../store/user.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const getUserInfo = store_user.GetUserInfo();
    const userCity = store_city.UserCity();
    const state = common_vendor.reactive({
      current: 0,
      current2: 0,
      swiperList: [],
      sum: 0,
      hotList: [],
      sellList: [],
      list1: [],
      list2: [],
      list3: []
    });
    const init = () => {
      getSwiper();
      getDate();
      getSort();
    };
    const getDetails = (id) => {
      getUserInfo.judgeLogin();
      common_vendor.index.navigateTo({
        url: `/subpkg/details/details?id=${id}`
      });
    };
    const clickFl = (id, title) => {
      console.log(title);
      getUserInfo.judgeLogin();
      common_vendor.index.navigateTo({
        url: `/subpkg/service/service?id=${id}&title=${title}`
      });
    };
    const getSort = async () => {
      const { data } = await api_modules_home.reqGetgetlm();
      state.list1 = data.data.slice(0, 8);
      state.list2 = data.data.slice(9, 18);
      state.list3 = data.data.slice(19, data.length);
    };
    const getDate = async () => {
      const { data } = await api_modules_home.reqGetDate2();
      state.list = data.data.list;
      state.sellList = data.data.list.filter((item) => {
        return item.oonsale === 2;
      }).slice(0, 3);
      state.hotList = data.data.list.filter((item) => {
        return item.oonsale === 3;
      });
    };
    const getSwiper = async () => {
      const { data } = await api_modules_home.reqGetSwiper();
      state.swiperList = data.data;
      state.sum = state.swiperList.length;
    };
    const clickAnchor = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/anchor/anchor"
      });
    };
    const clickSearch = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    };
    const changeSwiper = (e) => {
      state.current = e.detail.current;
    };
    const changeSwiper2 = (e) => {
      state.current2 = e.detail.current;
    };
    common_vendor.onLoad((message) => {
      init();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { current, current2, swiperList, hotList, sellList, list1, list2, list3 } = common_vendor.toRefs(state);
    const { city } = common_vendor.storeToRefs(userCity);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(common_vendor.unref(city)),
        c: common_vendor.o(clickAnchor),
        d: common_vendor.p({
          size: "40rpx",
          name: "search"
        }),
        e: common_vendor.o(clickSearch),
        f: common_vendor.f(common_vendor.unref(swiperList), (item, k0, i0) => {
          return {
            a: item.logos,
            b: item.id
          };
        }),
        g: common_vendor.o(changeSwiper),
        h: common_vendor.f(common_vendor.unref(swiperList).length, (item, k0, i0) => {
          return {
            a: common_vendor.unref(current) === item - 1 ? 1 : "",
            b: item
          };
        }),
        i: common_vendor.f(common_vendor.unref(list1), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: common_vendor.o(($event) => clickFl(item.id, item.label), item.id),
            d: item.id
          };
        }),
        j: common_vendor.f(common_vendor.unref(list2), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: common_vendor.o(($event) => clickFl(item.id, item.label), item.id),
            d: item.id
          };
        }),
        k: common_vendor.f(common_vendor.unref(list3), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: common_vendor.o(($event) => clickFl(item.id, item.label), item.id),
            d: item.id
          };
        }),
        l: common_vendor.o(changeSwiper2),
        m: common_vendor.f(common_vendor.unref(swiperList).length, (item, k0, i0) => {
          return {
            a: common_vendor.unref(current2) === item - 1 ? 1 : "",
            b: item
          };
        }),
        n: common_vendor.f(common_vendor.unref(sellList), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.h1),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.jg),
            e: common_vendor.o(($event) => getDetails(item.id), item.id),
            f: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
