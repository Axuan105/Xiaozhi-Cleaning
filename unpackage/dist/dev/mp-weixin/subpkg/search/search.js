"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_home = require("../../api/modules/home.js");
const store_user = require("../../store/user.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const getUserInfo = store_user.GetUserInfo();
    const state = common_vendor.reactive({
      arrHistory: common_vendor.index.getStorageSync("SEARCH") || [],
      timer: null,
      searchValue: "",
      seachList: [],
      searchShow: true,
      hotSearch: []
    });
    common_vendor.watch(() => state.searchValue, (n, o) => {
      if (n.length) {
        state.searchShow = false;
      } else {
        state.searchShow = true;
      }
    });
    const getHotSearch = async () => {
      const { data } = await api_modules_home.reqGetHotSearch();
      state.hotSearch = data.data;
      console.log(data.data);
    };
    const addInputValue = async () => {
      console.log(state.searchValue);
      clearTimeout(state.timer);
      state.timer = setTimeout(async () => {
        const { data } = await api_modules_home.reqGetSearch({ h1: state.searchValue });
        state.seachList = data.data.list;
        if (!state.searchValue)
          return;
        const index = state.arrHistory.indexOf(state.searchValue);
        if (index !== -1) {
          state.arrHistory.splice(index, 1);
        }
        state.arrHistory.unshift(state.searchValue);
        if (state.arrHistory.length > 10) {
          state.arrHistory.pop();
        }
      }, 500);
      common_vendor.index.setStorageSync("SEARCH", state.arrHistory);
    };
    const searchHistory = (item) => {
      state.searchValue = item;
      state.seachList = [];
      addInputValue();
    };
    const getDetails = (id) => {
      getUserInfo.judgeLogin();
      common_vendor.index.navigateTo({
        url: `/subpkg/details/details?id=${id}`
      });
    };
    const removeHistory = () => {
      state.arrHistory = [];
      common_vendor.index.removeStorageSync("SEARCH");
    };
    common_vendor.onLoad((message) => {
      getHotSearch();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { arrHistory, searchValue, seachList, searchShow, hotSearch } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          size: "20",
          name: "search"
        }),
        b: common_vendor.o([($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event.detail.value : null, addInputValue]),
        c: common_vendor.unref(searchValue),
        d: common_vendor.o(addInputValue),
        e: common_vendor.unref(searchShow)
      }, common_vendor.unref(searchShow) ? common_vendor.e({
        f: common_vendor.unref(arrHistory).length
      }, common_vendor.unref(arrHistory).length ? {
        g: common_vendor.o(removeHistory),
        h: common_vendor.p({
          size: "14",
          name: "delete-o"
        }),
        i: common_vendor.f(common_vendor.unref(arrHistory), (item, i, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => searchHistory(item), i),
            c: i
          };
        })
      } : {}, {
        j: common_vendor.f(common_vendor.unref(hotSearch), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.h1),
            b: common_vendor.o(($event) => getDetails(item.id), item.id),
            c: item.id
          };
        })
      }) : common_vendor.e({
        k: common_vendor.unref(seachList).length
      }, common_vendor.unref(seachList).length ? {
        l: common_vendor.f(common_vendor.unref(seachList), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.h1),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.jg),
            e: common_vendor.o(($event) => getDetails(item.id), item.id),
            f: item.id
          };
        })
      } : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/search/search.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
