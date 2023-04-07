<template>
	<view>
		<view v-if="isToken">
			<view v-if="orderList.length" class="tabs">
				<van-tabs>
					<van-tab title="全部订单">
						<view class="order-list">
							<view class="order-item" v-for="item in orderList" :key="item.id">
								<view class="" @click="clickOrderState(item.id)">
									<view class="order-tab">
										<view class="tab-img">
											<image :src="item.img" mode=""></image>

											<view>{{ item.category }}</view>
										</view>
										<view class="cancel" v-if="item.onsale === 1">待支付</view>
										<view class="cancel" v-else-if="item.onsale === 2">已支付</view>
										<view class="cancel" v-else-if="item.onsale === 3">待派单</view>
										<view class="cancel" v-else-if="item.onsale === 4">已接单</view>
										<view class="cancel" v-else-if="item.onsale === 5">服务完成</view>
										<view class="cancel" v-else-if="item.onsale === 7">已取消</view>
									</view>
									<view class="time margins flexCss-b">
										<van-icon size="16" name="clock-o" />
										<view class="">{{ item.time }}</view>
									</view>
									<view class="time margins flexCss-b">
										<van-icon size="16" name="location-o" />
										<view class="">{{ item.address }}</view>
									</view>
								</view>
								<view class="order-button">
									<view class="button-a" v-if="item.onsale === 1">
										<view class="left-a" @click="cancelOrder(item.cid)">取消订单</view>
										<view class="left active" @click="getReviseZt(2,item.cid)">去支付</view>
									</view>
									<view class="button-b" @click="cancelOrder(item.cid)" v-if="item.onsale === 2 || item.onsale === 3 || item.onsale === 4">取消订单</view>
									<view class="button-c active" @click="getRevise(item.id)" v-if="item.oonsale == 0">评价</view>
									<view class="button-c active" v-if="item.oonsale == 1">已评价</view>
								</view>
							</view>
						</view>
					</van-tab>
					<van-tab title="周期服务">
						<view class="empty">
							<image src="https://static.daojia.com/pt/project/h5-order-list/img/no-data.202566e.png" mode=""></image>
							<view class="empty-a" style="color:#848C99 ;">你还有订单</view>
						</view>
					</van-tab>
				</van-tabs>
			</view>

			<view v-else class="empty">
				<image src="https://static.daojia.com/pt/project/h5-order-list/img/no-data.202566e.png" mode=""></image>
				<view class="empty-a">暂无订单</view>
			</view>
		</view>
		<view v-else class="empty">
			<image src="https://static.daojia.com/pt/project/h5-order-list/img/no-data.202566e.png" mode=""></image>
			<view class="empty-a">请登录后查看订单</view>
			<view class="empty-b" @click="getLogin">登录</view>
		</view>
	</view>
</template>

<script setup>
// vue3小程序生命周期函数
import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app'
import { ApiShopOrder, reqZfjk } from '@/api/modules/order.js'
import { reqGetComment } from '@/api/modules/comment .js'
import { GetOrder } from '@/store/order.js'
import { reactive, toRefs } from 'vue'

const getOrder1 = GetOrder()
const state = reactive({
	orderList: [],
	isToken: true
})

// 跳转支付页
const getReviseZt = (i, id) => {
	const index = state.orderList.findIndex(item => item.cid == id)
	getOrder1.addordder(state.orderList[index])
	console.log(index);
	console.log(i, id);
	uni.navigateTo({
		url: `/subpkg/place-order/place-order?cid=${id}`
	})
}

// 取消订单页
const cancelOrder = (id) => {
	uni.navigateTo({
		url: `/subpkg/cancelOrder/cancelOrder?cid=${id}`
	})
}

// 发表评论
const getRevise = async (id) => {
	uni.navigateTo({
		url: `/subpkg/refer-remark/refer-remark?id=${id}`
	})
}

// 获取订单列表
const getOrder = async () => {
	const { data } = await ApiShopOrder()
	state.orderList = data.data.reverse()
	console.log(data.data);
}

const init = () => {
	const token = uni.getStorageSync('TOKEN')
	if (!token) {
		return (state.isToken = false)
	} else {
		state.isToken = true
	}
	getOrder()
}

const getLogin = () => {
	uni.navigateTo({
		url: '/subpkg/login/login'
	})
}

const clickOrderState = id => {
	uni.navigateTo({
		url: `/subpkg/order-state/order-state?id=${id}`
	})
}
// 页面加载
onLoad(message => {
	init()
})

// 页面显示
onShow(() => {
	init()
})

// 页面隐藏
onHide(() => {})

// 页面分享(不定义该函数 页面将无法分享)
onShareAppMessage(() => {})
const { orderList, isToken } = toRefs(state)
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
	padding: 0;
}

.margins {
	padding: 0 20rpx;
}

.tabs {
	border-top: 1px solid #e2e4e8;

	.order-list {
		margin-top: 20rpx;
		.order-item {
			// height: 230rpx;
			background-color: #fff;
			margin-top: 20rpx;
			.order-button {
				display: flex;
				text-align: right;
				padding: 10rpx 0;
				margin-left: 490rpx;
				.active {
					color: #fff;
					background-color: #e6454a;
					border: 1rpx solid #e6454a;
					border-radius: 4rpx;
					padding: 0 10rpx;
				}
				.button-a {
					display: flex;
					.left {
						margin-left: 10rpx;
						font-size: 24rpx;
						padding: 10rpx;
					}
					.left-a {
						margin-left: 10rpx;
						font-size: 24rpx;
						padding: 10rpx;
						border: 1rpx solid #ccc;
					}
				}
				.button-b {
					margin-left: 118rpx;
					font-size: 24rpx;
					padding: 10rpx;
					border: 1rpx solid #ccc;
				}
				.button-c {
					margin-left: 130rpx;
					font-size: 24rpx;
					padding: 10rpx 20rpx;
				}
			}
			.order-tab {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				border-bottom: 1px solid #f5f5f5;
				padding: 0 20rpx;
				.tab-img {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					image {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
					}
					view {
						margin-left: 20rpx;
						color: #52585a;
					}
					.cancel {
						font-size: 28rpx;
						color: #292d6e;
					}
				}
			}
			.time {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #52585a;
				view {
					margin-right: 15rpx;
				}
			}
		}
	}
}
.empty {
	height: 100%;
	text-align: center;
	image {
		margin-top: 220rpx;
		width: 300rpx;
		height: 300rpx;
	}
	.empty-a {
		margin-top: 30rpx;
	}
	.empty-b {
		margin: 30rpx auto;
		width: 400rpx;
		border-radius: 6rpx;
		padding: 25rpx 0;
		color: #e6454a;
		border: 1rpx solid #e6454a;
	}
}
</style>
