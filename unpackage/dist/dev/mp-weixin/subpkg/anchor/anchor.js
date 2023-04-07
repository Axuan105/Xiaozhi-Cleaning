"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_city = require("../../utils/city.js");
const store_city = require("../../store/city.js");
if (!Array) {
  const _component_van_index_anchor = common_vendor.resolveComponent("van-index-anchor");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_index_bar = common_vendor.resolveComponent("van-index-bar");
  (_component_van_index_anchor + _component_van_cell + _component_van_index_bar)();
}
const _sfc_main = {
  __name: "anchor",
  setup(__props) {
    const userCity = store_city.UserCity();
    const state = common_vendor.reactive({
      cityList: ["承德", "北京", "广州", "上海", "南京", "杭州", "武汉", "成都", "天津", "哈尔滨", "重庆", "长沙"]
    });
    const clickLocation = async () => {
      common_vendor.index.getLocation({
        success: (res) => {
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
        }
      });
    };
    const selectBar = (e) => {
      console.log(1);
      console.log(e);
    };
    const clickHome = (item) => {
      userCity.reviseCity(item);
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: `/pages/index/index`
        });
      }, 300);
    };
    common_vendor.onLoad((message) => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { cityList } = common_vendor.toRefs(state);
    common_vendor.storeToRefs(userCity);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clickLocation),
        b: common_vendor.f(common_vendor.unref(cityList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => clickHome(item), item),
            c: item
          };
        }),
        c: common_vendor.f(common_vendor.unref(utils_city.choiceCityList), (item, i, i0) => {
          return {
            a: "af5da6b4-1-" + i0 + ",af5da6b4-0",
            b: common_vendor.p({
              index: item.code
            }),
            c: common_vendor.f(item.cityList, (value, index, i1) => {
              return {
                a: common_vendor.o(($event) => clickHome(value), index),
                b: index,
                c: "af5da6b4-2-" + i0 + "-" + i1 + ",af5da6b4-0",
                d: common_vendor.p({
                  title: value
                })
              };
            }),
            d: i
          };
        }),
        d: common_vendor.o(selectBar)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/anchor/anchor.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
