"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_address = require("../../api/modules/address.js");
require("../../api/index.js");
require("../../utils/request.js");
require("../../store/user.js");
require("../../api/modules/login.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_goods_action_button = common_vendor.resolveComponent("van-goods-action-button");
  const _component_van_skeleton = common_vendor.resolveComponent("van-skeleton");
  (_component_van_cell + _component_van_switch + _component_van_button + _component_van_goods_action_button + _component_van_skeleton)();
}
const _sfc_main = {
  __name: "add-address",
  setup(__props) {
    const state = common_vendor.reactive({
      loading: false,
      formInput: {
        contacts: "",
        phone: "",
        address: "",
        onsale: 0,
        nv: ""
      },
      checked: false,
      region: [],
      id: "",
      radioList: [
        {
          value: 1,
          name: "先生"
        },
        {
          value: 2,
          name: "女士"
        }
      ],
      current: 0
    });
    const init = async () => {
      common_vendor.index.showLoading({ title: "加载中...", mask: true });
      const userInfo = common_vendor.index.getStorageSync("USERINFO");
      const { data } = await api_modules_address.reqgetdz({ id: state.id, uid: userInfo.uid });
      const data2 = data.data[0];
      data2.onsale === 0 ? state.checked = false : state.checked = true;
      state.formInput = data2;
      state.region = [data2.province, data2.city, data2.county];
      common_vendor.index.hideLoading();
    };
    const regionChange = (e) => {
      const value = e.detail.value;
      state.region = value;
      state.formInput.province = value[0];
      state.formInput.county = value[1];
      state.formInput.city = value[2];
    };
    const switchChange = (e) => {
      e.detail ? state.formInput.onsale = 1 : state.formInput.onsale = 0;
      state.checked = e.detail;
    };
    const saveAddress = async () => {
      if (state.id) {
        const { data } = await api_modules_address.reqPutAddress(state.formInput);
        common_vendor.index.showToast({
          title: data.data,
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/subpkg/address/address"
          });
        }, 500);
      } else {
        const { contacts, phone, address } = state.formInput;
        if (!contacts.length) {
          common_vendor.index.showToast({
            title: "请填写联系人",
            icon: "none"
          });
        } else if (!phone.length) {
          common_vendor.index.showToast({
            title: "请填联系电话",
            icon: "none"
          });
        } else if (!address.length) {
          common_vendor.index.showToast({
            title: "请填服务地址",
            icon: "none"
          });
        } else {
          await api_modules_address.reqGetAddress(state.formInput);
          common_vendor.index.showToast({
            title: "添加成功",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 500);
        }
      }
    };
    const onDelete = async () => {
      await api_modules_address.reqDeleteAddress(state.id);
      common_vendor.index.showToast({
        title: "删除成功",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 500);
    };
    common_vendor.onLoad((message) => {
      console.log(message);
      const { id: id2 } = message;
      state.id = id2;
      common_vendor.index.setNavigationBarTitle({ title: id2 ? "修改地址" : "新增地址" });
      if (id2) {
        init();
      }
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { formInput, region, id, radioList, current, checked, loading } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(formInput).contacts,
        b: common_vendor.o(($event) => common_vendor.unref(formInput).contacts = $event.detail.value),
        c: common_vendor.unref(formInput).phone,
        d: common_vendor.o(($event) => common_vendor.unref(formInput).phone = $event.detail.value),
        e: !common_vendor.unref(region).length
      }, !common_vendor.unref(region).length ? {} : {
        f: common_vendor.t(common_vendor.unref(region).join(""))
      }, {
        g: common_vendor.unref(region),
        h: common_vendor.o(regionChange),
        i: common_vendor.p({
          title: "地址"
        }),
        j: common_vendor.unref(formInput).address,
        k: common_vendor.o(($event) => common_vendor.unref(formInput).address = $event.detail.value),
        l: common_vendor.o(switchChange),
        m: common_vendor.p({
          activeColor: "#ee0a24",
          checked: common_vendor.unref(checked)
        }),
        n: common_vendor.p({
          title: "设为默认收货地址"
        }),
        o: common_vendor.unref(id)
      }, common_vendor.unref(id) ? common_vendor.e({
        p: common_vendor.unref(id)
      }, common_vendor.unref(id) ? {
        q: common_vendor.o(onDelete),
        r: common_vendor.p({
          block: true
        })
      } : {}, {
        s: common_vendor.o(saveAddress),
        t: common_vendor.p({
          text: "保存"
        })
      }) : {
        v: common_vendor.o(saveAddress),
        w: common_vendor.p({
          text: "保存"
        })
      }, {
        x: common_vendor.p({
          title: true,
          avatar: true,
          row: "3",
          loading: common_vendor.unref(loading)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/add-address/add-address.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
