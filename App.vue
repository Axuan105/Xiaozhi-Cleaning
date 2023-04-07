<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
@import 'wxcomponents/vant/common/index.wxss';
page {
	padding: 0 20rpx;
}
.flexCss-a {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.margins {
	padding: 0 20rpx;
}
.flexCss-b {
	display: flex;
	align-items: center;
}
.flexCss-c {
	display: flex;
	justify-content: space-between;
}
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
	color: transparent;
}
</style>
