// 用户pinia仓库
import { defineStore } from "pinia"

export const GetOrder = defineStore('GetOrder', {
	state: () => ({
		order: {},
		title: ''
	}),
	// 函数
	actions: {	
		addordder(obj) {
			this.order = obj
			console.log(this.order);
		},
		getTitle(item) {
			this.title = item
		}
	},
	// 计算属性
	getters: {}
})