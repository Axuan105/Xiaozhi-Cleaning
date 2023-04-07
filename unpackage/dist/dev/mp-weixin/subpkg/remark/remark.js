"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_comment_ = require("../../api/modules/comment .js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "remark",
  setup(__props) {
    const state = common_vendor.reactive({
      tagList: [],
      id: "",
      goodPl: "",
      show: 1,
      zhpj: 0,
      page: 1,
      pageSize: 10
    });
    const getTagList = async (item = 1) => {
      state.show = item;
      const { data } = await api_modules_comment_.reqGetComment(state.id, state.page);
      state.pl = data.data.total;
      const arr = [];
      data.data.list.forEach((item2) => {
        item2.time = item2.time.split("T")[0];
        if (item2.pf >= 4) {
          arr.push(item2.pf);
        }
      });
      state.tagList = [...state.tagList, ...data.data.list];
      console.log(state.tagList);
    };
    common_vendor.onPullDownRefresh(() => {
      state.page = 1;
      state.tagList = [];
      getTagList();
    });
    common_vendor.onReachBottom(() => {
      state.page++;
      getTagList();
    });
    common_vendor.onLoad((message) => {
      state.id = message.id;
      getTagList();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { tagList, goodPl, show, zhpj } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: "16",
          ["allow-half"]: true,
          readonly: true,
          value: common_vendor.unref(zhpj)
        }),
        b: common_vendor.t(common_vendor.unref(goodPl)),
        c: common_vendor.n(common_vendor.unref(show) === 1 ? "active" : ""),
        d: common_vendor.o(($event) => getTagList(1)),
        e: common_vendor.n(common_vendor.unref(show) === 2 ? "active" : ""),
        f: common_vendor.o(($event) => getTagList(2)),
        g: common_vendor.f(common_vendor.unref(tagList), (item, k0, i0) => {
          return common_vendor.e({
            a: item.img,
            b: common_vendor.t(item.sf),
            c: "b7481b74-1-" + i0,
            d: common_vendor.p({
              size: "16",
              readonly: true,
              value: item.pf
            }),
            e: common_vendor.t(item.time),
            f: common_vendor.f(item.lb, (item2, k1, i1) => {
              return {
                a: common_vendor.t(item2),
                b: item2
              };
            }),
            g: common_vendor.t(item.value),
            h: !item.imgs[0] == ""
          }, !item.imgs[0] == "" ? {
            i: common_vendor.f(item.imgs, (img, i, i1) => {
              return {
                a: i,
                b: img
              };
            })
          } : {}, {
            j: item.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/remark/remark.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
