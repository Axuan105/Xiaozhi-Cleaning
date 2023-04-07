"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_modules_login = require("../../api/modules/login.js");
const store_user = require("../../store/user.js");
require("../../api/index.js");
require("../../utils/request.js");
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_checkbox = common_vendor.resolveComponent("van-checkbox");
  (_component_van_button + _component_van_checkbox)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const getUserInfo = store_user.GetUserInfo();
    const state = common_vendor.reactive({
      user: {
        phone: "",
        password: ""
      },
      checked: true,
      loginState: "登录",
      loginState2: "注册",
      loginShow: true
    });
    const register = async () => {
      const phone = state.user.phone;
      const password = state.user.password;
      if (state.loginState === "登录") {
        const { data } = await api_modules_login.reqUserLogin({ phone, password });
        if (!phone.length) {
          common_vendor.index.showToast({
            title: data.msg,
            icon: "none"
          });
        } else {
          if (data.code !== 200) {
            common_vendor.index.showToast({
              title: "密码错误！！",
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录成功！！",
              icon: "none"
            });
            getUserInfo.getInfo(data.data.Token, data.data.data2[0].uid);
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 500);
          }
        }
      } else {
        const { data } = await api_modules_login.reqUserRegister({ phone, password });
        if (data.code !== 200) {
          common_vendor.index.showToast({
            title: data.msg,
            icon: "none"
          });
        } else {
          common_vendor.index.showToast({
            title: "注册成功，请登录",
            icon: "none"
          });
          state.loginState = "登录";
        }
      }
    };
    const checkRadio = (e) => {
      state.checked = e.detail;
    };
    const modifyLoginState = () => {
      state.loginState2 = state.loginState === "注册" ? state.loginState2 = "登录" : state.loginState2 = "登录";
      state.loginState = state.loginState !== "注册" ? state.loginState = "注册" : state.loginState = "登录";
    };
    common_vendor.onLoad((message) => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { user, errorMessage, checked, loginState, loginShow, show, loginState2 } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.unref(user).phone,
        c: common_vendor.o(($event) => common_vendor.unref(user).phone = $event.detail.value),
        d: common_assets._imports_1$1,
        e: common_vendor.unref(user).password,
        f: common_vendor.o(($event) => common_vendor.unref(user).password = $event.detail.value),
        g: common_vendor.t(common_vendor.unref(loginState2)),
        h: common_vendor.o(modifyLoginState),
        i: common_vendor.t(common_vendor.unref(loginState)),
        j: common_vendor.o(register),
        k: common_vendor.p({
          round: true,
          size: "large",
          disabled: !common_vendor.unref(user).phone.length && !common_vendor.unref(user).password.length,
          color: !common_vendor.unref(user).phone.length || !common_vendor.unref(user).password.length ? "#F08F92" : "#ee0a24"
        }),
        l: common_vendor.unref(loginShow)
      }, common_vendor.unref(loginShow) ? {
        m: common_vendor.o(checkRadio),
        n: common_vendor.p({
          value: common_vendor.unref(checked),
          iconSize: "30rpx"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HZJC2005/代码/小程序/xiaozhi/subpkg/login/login.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
