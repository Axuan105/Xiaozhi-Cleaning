<template>
	<view class="home">
		<view class="location">
			<view class="img" @click="clickAnchor">
				<image class="image" src="@/static/位置.png" mode="scaleToFill"></image>
				<view style="width: 100rpx; height: 50rpx; margin-right: 20rpx;" class="an-ellipsis">{{ city }}</view>
			</view>
			<view class="location-wz">
				<view class="input" @click="clickSearch">
					<van-icon size="40rpx" name="search" />
					<text>日常保洁</text>
				</view>
			</view>
		</view>

		<view class="swiper">
			<swiper autoplay="true" interval="3000" @change="changeSwiper" current="{{current}}">
				<swiper-item v-for="item in swiperList" :key="item.id"><image :src="item.logos" mode=""></image></swiper-item>
			</swiper>
			<view class="dots">
				<view class="dots-a" v-for="item in swiperList.length" :key="item"><view class="dots-b" :class="{ active: current === item - 1 }"></view></view>
			</view>
		</view>

		<view class="hot">
			<view class="title">热门服务</view>
			<view class="hot-img">
				<view class="left">
					<view class="left-title">
						<view class="item-a">日常保洁</view>
						<view class="item-b">新客首单立减</view>
					</view>
					<image src="https://images.daojia.com/jz/clean/homepage/71896a56ea58dd72b7d9f8a82f52b758.jpeg" mode=""></image>
				</view>
				<view class="right">
					<view class="right-a">
						<view class="left-title">
							<view class="item-a">油烟机清洗</view>
							<view class="item-b">专业拆洗</view>
						</view>
						<image src="https://images.daojia.com/jz/clean/homepage/6c8efb49420cd768a3603a2db2abcacd.jpeg" mode=""></image>
					</view>
					<view class="right-a right-b">
						<view class="left-title">
							<view class="item-a">洗家电套餐</view>
							<view class="item-b">家电清洗套餐</view>
						</view>
						<image src="https://images.daojia.com/jz/clean/homepage/b60ebcd1fce8e5357de9c2d6e9b00e9e.jpeg" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<view class="sort">
			<view class="title">家电家居清洗</view>
			<swiper @change="changeSwiper2" current="{{current2}}">
				<swiper-item >
					<view class="sort-item" @click="clickFl(item.id, item.label)" v-for="item in list1" :key="item.id">
						<image :src="item.img" mode=""></image>
						<view class="item-content">{{item.label}}</view>
					</view>
				</swiper-item>
				<swiper-item >
					<view class="sort-item" @click="clickFl(item.id, item.label)" v-for="item in list2" :key="item.id">
						<image :src="item.img" mode=""></image>
						<view class="item-content">{{item.label}}</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="sort-item" @click="clickFl(item.id, item.label)" v-for="item in list3" :key="item.id">
						<image :src="item.img" mode=""></image>
						<view class="item-content">{{item.label}}</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view class="dots-a" v-for="item in swiperList.length" :key="item"><view class="dots-b" :class="{ active: current2 === item - 1 }"></view></view>
			</view>
		</view>

		<view class="footer">
			<view class="footer-title">推荐服务</view>
			<view class="footer-list">
				<view class="footer-item" @click="getDetails(item.id)" v-for="item in sellList" :key="item.id">
					<view class="item-img"><image :src="item.img" mode=""></image></view>
					<view class="item-content">
						<view class="item-a">{{ item.h1 }}</view>
						<view class="item-b van-multi-ellipsis--l3">{{ item.category }}</view>
						<view class="item-c">
							<view class="left">
								<text>{{ item.jg }}</text>
								起起
							</view>
							<view class="right">好评率95%</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
// vue3小程序生命周期函数
import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app'
import { reqGetSwiper, reqGetDate2, reqGetgetlm } from '@/api/modules/home.js'
import { reactive, toRefs } from 'vue'
import { UserCity } from '@/store/city.js'
import { GetUserInfo } from '@/store/user.js'
import { storeToRefs } from 'pinia'

const getUserInfo = GetUserInfo()
const userCity = UserCity()

const state = reactive({
	current: 0,
	current2: 0,
	swiperList: [],
	sum: 0,
	hotList: [],
	sellList: [],
	list1: [],
	list2: [],
	list3: []
})

// 初始化
const init = () => {
	getSwiper()
	getDate()
	getSort()
}

// 详情
const getDetails = id => {
	getUserInfo.judgeLogin()
	uni.navigateTo({
		url: `/subpkg/details/details?id=${id}`
	})
}

const clickFl = (id, title) => {
	console.log(title);
	getUserInfo.judgeLogin()
	uni.navigateTo({
		url: `/subpkg/service/service?id=${id}&title=${title}`
	})
}

// 获取分类
const getSort = async () => {
	const { data } = await reqGetgetlm()
	state.list1 = data.data.slice(0,8)
	state.list2 = data.data.slice(9,18)
	state.list3 = data.data.slice(19,data.length)
}

// 获取列表
const getDate = async () => {
	const cid = ''
	const { data } = await reqGetDate2(cid)
	state.list = data.data.list
	// 推荐
	state.sellList = data.data.list.filter(item =>{ return item.oonsale === 2}).slice(0,3)
	//热门
	state.hotList = data.data.list.filter(item =>{ return item.oonsale === 3})
}

// 获取轮播图
const getSwiper = async () => {
	const { data } = await reqGetSwiper()
	state.swiperList = data.data
	state.sum = state.swiperList.length
}

// 跳转定位页
const clickAnchor = () => {
	uni.navigateTo({
		url: '/subpkg/anchor/anchor'
	})
}

//跳转搜索页
const clickSearch = () => {
	uni.navigateTo({
		url: '/subpkg/search/search'
	})
}

const changeSwiper = e => {
	state.current = e.detail.current
}

const changeSwiper2 = e => {
	state.current2 = e.detail.current
}
// 页面加载
onLoad(message => {
	init()
})

// 页面显示
onShow(() => {})

// 页面隐藏
onHide(() => {})

// 页面分享(不定义该函数 页面将无法分享)
onShareAppMessage(() => {})
const { current, current2, swiperList, hotList, sellList,list1, list2,list3, } = toRefs(state)
const { city } = storeToRefs(userCity)
</script>

<style lang="scss">
.home {
	width: 95%;
	.location {
		width: 95%;
		height: 70rpx;
		margin: 30rpx 0;
		font-size: 28rpx;
		line-height: 50rpx;
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 40rpx;
		.img {
			display: flex;
			margin-left: 10rpx;
			image {
				width: 50rpx;
				height: 50rpx;
				padding-right: 10rpx;
			}
		}
		.location-wz {
			color: #bdbdbd;
			.input {
				width: 550rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				text {
					margin-left: 10rpx;
				}
			}
		}
	}
	.swiper {
		position: relative;
		swiper {
			width: 100%;
			height: 320rpx;
			swiper-item {
				margin-right: 20rpx;
				image {
					width: 708rpx;
					height: 320rpx;
					border-radius: 8rpx;
				}
			}
		}
		.dots {
			position: absolute;
			bottom: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			.dots-b {
				width: 10rpx;
				height: 6rpx;
				margin: 0 6rpx;
				border-radius: 10rpx;
				background-color: #f5f5f5;
			}
			.active {
				background-color: #d2d2d2;
			}
		}
	}

	.title {
		font-size: 36rpx;
		line-height: 80rpx;
		font-weight: 600;
	}
	.hot {
		margin-top: 40rpx;

		.hot-img {
			display: flex;
			justify-content: space-between;
			.left {
				width: 320rpx;
				height: 320rpx;
				padding: 30rpx 0 0 24rpx;
				background-color: #f8f8f9;
				.left-title {
					.item-a {
						font-weight: 600;
					}
					.item-b {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #949ea3;
					}
				}
				image {
					width: 200rpx;
					height: 200rpx;
					margin-left: 67rpx;
				}
			}
			.right {
				width: 320rpx;
				.right-a {
					height: 130rpx;
					padding: 30rpx 0 0 24rpx;
					background-color: #f8f8f9;

					display: flex;
					.left-title {
						.item-a {
							font-weight: 600;
						}
						.item-b {
							margin-top: 10rpx;
							font-size: 24rpx;
							color: #949ea3;
						}
					}
					image {
						width: 120rpx;
						height: 120rpx;
					}
				}
				.right-b {
					margin-top: 30rpx;
				}
			}
		}
	}
	.sort {
		swiper {
			height: 370rpx;
			swiper-item {
				height: 370rpx;
				display: flex;
				// justify-content: space-between;
				flex-flow: row wrap;
				.sort-item {
					width: 170rpx;
					font-size: 24rpx;
					margin-top: 20rpx;
					image {
						padding: 0 24rpx;
						width: 120rpx;
						height: 120rpx;
					}
					.item-content {
						text-align: center;
					}
				}
			}
		}
		.dots {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin-top: 20rpx;
			.dots-b {
				width: 10rpx;
				height: 6rpx;
				margin: 0 6rpx;
				border-radius: 10rpx;
				background-color: #f5f5f5;
			}
			.active {
				background-color: #333;
			}
		}
	}
	.footer {
		// height: 100rpx;
		margin-bottom: 100rpx;
		margin-top: 60rpx;
		.footer-title {
			font-size: 34rpx;
		}
		.footer-list {
			.footer-item {
				display: flex;
				padding: 20rpx 0;
				.item-img {
					image {
						width: 300rpx;
						height: 200rpx;
						border-radius: 10rpx;
					}
				}
				.item-content {
					flex: 1;
					margin-left: 30rpx;
					.item-a {
						font-size: 30rpx;
					}
					.item-b {
						font-size: 24rpx;
						margin: 10rpx 0;
						color: #a1a1a1;
						height: 100rpx;
					}
					.item-c {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left {
							font-size: 24rpx;
							color: #dd524f;
							text {
								font-size: 30rpx;
							}
						}
						.right {
							font-size: 24rpx;
							color: #a1a1a1;
						}
					}
				}
			}
		}
	}
}
</style>
