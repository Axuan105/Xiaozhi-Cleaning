// 用户pinia仓库
import { defineStore } from "pinia"

export const UserCity = defineStore('UserCity', {
	state: () => ({
		city: '长沙'
	}),
	// 函数
	actions: {	
		reviseCity(city) {
			this.city = city
		}
	},
	// 计算属性
	getters: {}
})