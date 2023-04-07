"use strict";
const common_vendor = require("../../common/vendor.js");
const store_order = require("../../store/order.js");
require("../../api/index.js");
const api_modules_order = require("../../api/modules/order.js");
const api_modules_comment_ = require("../../api/modules/comment .js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _component_van_goods_action_icon = common_vendor.resolveComponent("van-goods-action-icon");
  const _component_van_goods_action_button = common_vendor.resolveComponent("van-goods-action-button");
  const _component_van_goods_action = common_vendor.resolveComponent("van-goods-action");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_tab + _component_van_tabs + _component_van_icon + _easycom_uni_rate2 + _component_van_goods_action_icon + _component_van_goods_action_button + _component_van_goods_action + _component_van_popup)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const getOrder = store_order.GetOrder();
    const state = common_vendor.reactive({
      current: 0,
      value: 3,
      // 列表cid
      cid: "",
      detailsList: [],
      show: false,
      isOption: false,
      // 列表id
      id: "",
      arrlogoLenght: "",
      ggList: [],
      // 规格id
      classId: "",
      plList: [],
      pl: ""
    });
    const getShop = async () => {
      const index = state.ggList.findIndex((item) => item.id === state.classId);
      getOrder.addordder(state.ggList[index]);
      common_vendor.index.navigateTo({
        url: `/subpkg/place-order/place-order?cid=${state.cid}&oid=${state.classId}`
      });
    };
    const clickRemark = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/remark/remark?id=${state.id}`
      });
    };
    const choiceGg = (id) => {
      state.classId = id;
    };
    const onClose = () => {
      state.isOption = false;
    };
    const shopSpecs = async () => {
      state.isOption = true;
      const { data } = await api_modules_order.reqShopSpecs(state.cid);
      if (!data.data.length)
        return;
      console.log(data.data);
      state.ggList = data.data;
      if (!data.data[0].id)
        return;
      state.classId = data.data[0].id;
    };
    const getDetails = async () => {
      const { data } = await api_modules_order.reqShopDetails({ cid: state.id });
      state.detailsList = data.data[0];
      common_vendor.index.setNavigationBarTitle({ title: data.data[0].h1 });
      getOrder.getTitle(data.data[0].h1);
      state.arrlogoLenght = data.data[0].arrlogo.length;
    };
    const getpress = async () => {
      const page = 1;
      const { data } = await api_modules_comment_.reqGetComment(state.id, page);
      console.log(data);
      state.pl = data.data.total;
      if (data.data.total < 3) {
        state.plList = data.data.list;
      } else {
        data.data.list.forEach((item) => {
          item.lb = item.lb.slice(0, 2);
          item.imgs = item.imgs.slice(0, 2);
        });
        state.plList = data.data.list.slice(0, 3);
      }
    };
    const init = () => {
      getDetails();
      getpress();
    };
    const changeSwiper = (e) => {
      state.current = e.detail.current;
    };
    const scrollBar = (e) => {
      const name = e.detail.title;
      if (name == "评价") {
        common_vendor.index.pageScrollTo({
          scrollTop: 330
        });
      } else if (name == "详情") {
        common_vendor.index.pageScrollTo({
          scrollTop: 630
        });
      } else {
        common_vendor.index.pageScrollTo({
          scrollTop: 0
        });
      }
    };
    common_vendor.onLoad((message) => {
      state.id = message.id;
      state.cid = message.cid;
      console.log(state.cid);
      init();
    });
    common_vendor.onPageScroll((e) => {
      e.scrollTop > 150 ? state.show = true : state.show = false;
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { current, value, detailsList, show, isOption, arrlogoLenght, ggList, classId, plList, pl } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        b: common_vendor.p({
          title: "商品"
        }),
        c: common_vendor.p({
          title: "评价"
        }),
        d: common_vendor.p({
          title: "详情"
        }),
        e: common_vendor.o(scrollBar)
      } : {}, {
        f: common_vendor.f(common_vendor.unref(detailsList).arrlogo, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        g: common_vendor.o(changeSwiper),
        h: common_vendor.t(common_vendor.unref(current) + 1),
        i: common_vendor.t(common_vendor.unref(arrlogoLenght)),
        j: common_vendor.p({
          name: "location"
        }),
        k: common_vendor.t(common_vendor.unref(detailsList).Price),
        l: common_vendor.t(common_vendor.unref(detailsList).h1),
        m: common_vendor.t(common_vendor.unref(detailsList).h6),
        n: common_vendor.p({
          name: "passed",
          size: "14"
        }),
        o: common_vendor.p({
          name: "passed"
        }),
        p: common_vendor.p({
          name: "passed"
        }),
        q: common_vendor.t(common_vendor.unref(pl)),
        r: common_vendor.p({
          name: "arrow"
        }),
        s: common_vendor.o(clickRemark),
        t: common_vendor.f(common_vendor.unref(plList), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.sf),
            c: "32cf0be8-9-" + i0,
            d: common_vendor.p({
              size: "16",
              readonly: true,
              value: item.pf
            }),
            e: common_vendor.f(item.lb, (item2, i, i1) => {
              return {
                a: common_vendor.t(item2),
                b: i
              };
            }),
            f: common_vendor.t(item.value),
            g: common_vendor.f(item.imgs, (img, i, i1) => {
              return {
                a: i,
                b: img
              };
            }),
            h: item.id
          };
        }),
        v: common_vendor.f(common_vendor.unref(detailsList).biglogo, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        w: common_vendor.p({
          icon: "chat-o",
          text: "客服"
        }),
        x: common_vendor.o(shopSpecs),
        y: common_vendor.p({
          text: "立即购买"
        }),
        z: common_vendor.unref(ggList).length
      }, common_vendor.unref(ggList).length ? {
        A: common_vendor.f(common_vendor.unref(ggList), (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: common_vendor.t(item.peice),
            d: common_vendor.n(item.id === common_vendor.unref(classId) ? "active-gg" : ""),
            e: common_vendor.o(($event) => choiceGg(item.id), item.id),
            f: item.id
          };
        }),
        B: common_vendor.o(getShop),
        C: common_vendor.p({
          text: "确定"
        })
      } : {}, {
        D: common_vendor.o(onClose),
        E: common_vendor.p({
          show: common_vendor.unref(isOption),
          position: "bottom",
          closeable: true,
          customStyle: "height: 80%;"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/details/details.vue"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
