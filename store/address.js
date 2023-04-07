// 用户pinia仓库
import { defineStore } from "pinia"

export const GetAddress = defineStore('GetAddress', {
	state: () => ({
		addressObj: {},
		aid: ''
	}),
	// 函数
	actions: {	
		// 保存地址
		address(address) {
			this.addressObj = address
		},
		addsserId(id) {
			this.aid = id
		}
	},
	// 计算属性
	getters: {}
})