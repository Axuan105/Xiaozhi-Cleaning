"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_order = require("../../api/modules/order.js");
const api_modules_comment_ = require("../../api/modules/comment .js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_easycom_uni_rate2 + _component_van_button)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
const _sfc_main = {
  __name: "refer-remark",
  setup(__props) {
    const state = common_vendor.reactive({
      pf: "",
      value: "",
      imgs: "",
      imgList: [],
      id: "",
      detail: {},
      nid: ""
    });
    const orderDetail = async () => {
      const { data } = await api_modules_order.ApiShopDetail(state.id);
      state.detail = data.data;
      state.nid = data.data.nid;
      console.log(data.data);
    };
    const renderComment = async () => {
      const sf = "杭师傅";
      const imgs = state.imgList.toString();
      const { data } = await api_modules_comment_.reqGetAddComment({ imgs, value: state.value, pf: state.pf, sf, cid: state.nid });
      if (data.code === 200) {
        common_vendor.index.showToast({ title: data.data, icon: "none" });
        common_vendor.index.navigateBack();
      }
      console.log(data);
    };
    const onChange = (e) => {
      state.pf = e.value;
    };
    const upSuccess = (e) => {
      const token = "Bearer " + common_vendor.index.getStorageSync("TOKEN");
      common_vendor.index.chooseImage({
        success(e2) {
          const imgs = e2.tempFilePaths;
          common_vendor.index.uploadFile({
            url: "http://192.168.137.206:4090/dish/dishs/addlogos",
            filePath: imgs[0],
            header: {
              Authorization: token
            },
            name: "file",
            success: (imgData) => {
              let data = JSON.parse(imgData.data.replace("\uFEFF", ""));
              state.imgList.unshift(data.data);
              console.log(data.data);
            }
          });
        }
      });
    };
    common_vendor.onLoad((message) => {
      console.log(message);
      state.id = message.id;
      orderDetail();
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { zhpj, value, imageValue, imgList, detail, pf } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(detail).img,
        b: common_vendor.t(common_vendor.unref(detail).label),
        c: common_vendor.o(onChange),
        d: common_vendor.p({
          size: "25",
          value: common_vendor.unref(pf)
        }),
        e: common_vendor.unref(value),
        f: common_vendor.o(($event) => common_vendor.isRef(value) ? value.value = $event.detail.value : null),
        g: common_vendor.o(upSuccess),
        h: common_vendor.f(common_vendor.unref(imgList), (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        i: common_vendor.o(renderComment),
        j: common_vendor.p({
          type: "danger",
          block: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/refer-remark/refer-remark.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
