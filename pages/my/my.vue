<template>
	<view>
		<view class="login">
			<view class="login-dl">
				<view class="dl-title" @click="clickLogin" v-if="!show">
					<view>立即登录</view>
					<text>登录优惠更多</text>
				</view>

				<view class="phone" v-else>{{ phone }}</view>
			</view>
			<view class="login-img"><image src="https://static.daojia.com/assets/project/user-center-v1.1/images/temp-head_c43dfad.png" mode=""></image></view>
		</view>
		<view class="content">
			<view class="content-item">
				<view class="icon"><image src="@/static/理财.png" mode=""></image></view>
				<view class="cell"><van-cell title="我的优惠价" is-link /></view>
			</view>
			<view class="content-item" @click="getAddress">
				<view class="icon"><image src="@/static/定位.png" mode=""></image></view>
				<view class="cell"><van-cell title="我的地址" is-link /></view>
			</view>
			<view class="content-item">
				<view class="icon"><image src="@/static/联系客服.png" mode=""></image></view>
				<view class="cell"><van-cell title="联系客服" is-link /></view>
			</view>
		</view>
		<view class="button" v-if="show"><van-button type="default" size="large" @click="deleteLogin">退出登录</van-button></view>
	</view>
</template>

<script setup>
// vue3小程序生命周期函数
import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app'
import { reactive, toRefs, computed } from 'vue'

const state = reactive({
	phone:  '',
	show: false
})

// 跳转登录页
const clickLogin = () => {
	uni.navigateTo({
		url: '/subpkg/login/login'
	})
}

// 跳转地址页
const getAddress = () => {
	uni.navigateTo({
		url: '/subpkg/address/address'
	})
}

const getUserInfo = () => {
	const userInfo = uni.getStorageSync('USERINFO')
	userInfo === '' ? state.show = false : state.show = true	
	if(!userInfo) return
	state.phone = userInfo.phone.slice(0, 3) + '****' + userInfo.phone.slice(7)
	
}

// 初始化
const info = () => {
	getUserInfo()
}

// 退出登录
const deleteLogin = () => {
	uni.clearStorageSync('USERINFO')
	uni.clearStorageSync('TOKEN')
	getUserInfo()
}

// 页面加载
onLoad(message => {
info()
})

// 页面显示
onShow(() => {
	info()
})

// 页面隐藏
onHide(() => {})

// 页面分享(不定义该函数 页面将无法分享)
onShareAppMessage(() => {})

const { phone, show } = toRefs(state)
</script>

<style lang="scss">
.login {
	width: 95%;
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
	padding-bottom: 50rpx;
	border-bottom: 1rpx solid #f5f5f5;
	.login-dl {
		.dl-title {
			margin-top: 30rpx;
			view {
				font-size: 50rpx;
				font-weight: 600;
			}
			text {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
	.phone {
		line-height: 200rpx;
		font-size: 28rpx;
		margin-left: 40rpx;
	}
	.login-img {
		margin-top: 30rpx;
		margin-right: 30rpx;
		image {
			width: 140rpx;
			height: 140rpx;
		}
	}
}
.content {
	padding: 0 20rpx;
	.content-item {
		padding: 20rpx 0;
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		.icon {
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.cell {
			width: 90%;
			.van-cell--hover {
				background-color: #fff;
			}
		}
	}
}
.button {
	width: 88%;
	margin-left: 20rpx;
}
</style>
