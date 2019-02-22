// pages/history/history.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		history: []
	},
	onShow(){
		this.setData({ history: wx.getStorageSync('history') })
	},
	onTapItem(e){
		wx.reLaunch({
			url: `../index/index?query=${e.currentTarget.dataset.query}`
		})
	}
})