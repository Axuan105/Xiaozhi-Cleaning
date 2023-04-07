"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_order = require("../../api/modules/order.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_checkbox = common_vendor.resolveComponent("van-checkbox");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_cell + _component_van_checkbox + _component_van_button)();
}
const _sfc_main = {
  __name: "cancelOrder",
  setup(__props) {
    const state = common_vendor.reactive({
      listade: [
        { text: "需修改服务地址", checked: false },
        { text: "预约时间不合适", checked: false },
        { text: "修改服务时长", checked: false },
        { text: "价格原因", checked: false },
        { text: "其他 (填空)", checked: false }
      ],
      cid: "",
      show: false
    });
    const cancelOrder = async () => {
      const index = state.listade.findIndex((item) => item.checked === true);
      if (index === -1)
        return common_vendor.index.showToast({ title: "请选择原因", icon: "none" });
      await api_modules_order.reqZfjk({ cid: state.cid, onsale: 7 });
      common_vendor.index.navigateBack();
    };
    const onChange = (i) => {
      state.listade[i].checked = !state.listade[i].checked;
      const index = state.listade.findIndex((item) => item.checked === true);
      index !== -1 ? state.show = true : state.show = false;
    };
    common_vendor.onLoad((message) => {
      state.cid = message.cid;
      console.log(message);
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { checked, listade, show } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listade), (itmi, i, i0) => {
          return {
            a: "f61ddc20-0-" + i0,
            b: common_vendor.p({
              border: "false",
              title: itmi.text
            }),
            c: common_vendor.o(($event) => onChange(i), i),
            d: "f61ddc20-1-" + i0,
            e: common_vendor.p({
              value: itmi.checked
            }),
            f: i
          };
        }),
        b: common_vendor.o(cancelOrder),
        c: common_vendor.p({
          type: "primary",
          color: !common_vendor.unref(show) ? "#ff8e94" : "#e6454a",
          size: "large"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/cancelOrder/cancelOrder.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
