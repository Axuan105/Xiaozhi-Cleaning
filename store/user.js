// 用户pinia仓库
import {
	defineStore
} from "pinia"
import {
	reqUserGethy
} from '@/api/modules/login.js'
import {
	setScrollTop
} from "vant/lib/utils"

export const GetUserInfo = defineStore('GetUserInfo', {
	state: () => ({
		token: '',
		uid: ''
	}),
	// 函数
	actions: {
		// 保存token
		getInfo(token, uid) {
			this.token = token
			this.uid = uid
			uni.setStorageSync('TOKEN', this.token);
			this.getUserIofn()
		},
		// 获取用户信息
		async getUserIofn() {
			const {
				data
			} = await reqUserGethy({
				uid: this.uid
			})
			uni.setStorageSync('USERINFO', {
				phone: data.data.phone,
				uid: this.uid
			})
		},
		signOutLogin() {
			uni.removeStorage('TOKEN')
			uni.removeStorage('USERINFO')
		},
		//是否登录
		judgeLogin() {
			const token = uni.getStorageSync('TOKEN')
			if (!token) {
			    return uni.navigateTo({
					url: '/subpkg/login/login'
				}, 1000)
			}
		}
	},
	// 计算属性
	getters: {}
})
