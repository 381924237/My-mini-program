//logs.js
const app = getApp()

Page({
  data: {
		fromLang: {},
		toLang: {},
		langList: app.globalData.langList,
		refer: '',
		chooseIndex: 0
  },
	onLoad(options){
		this.setData({
			refer: options.refer,
			chooseIndex: options.query
		})
	},
	onTapItem(e){
		let langObj = e.currentTarget.dataset
		if(this.data.refer === 'from'){
			this.setData({ 'fromLang': langObj })
			app.globalData.fromLang = langObj
		}else if(this.data.refer === 'to'){
			this.setData({ 'toLang': langObj })
			app.globalData.toLang = langObj
		}

		wx.switchTab({
			url: './../index/index'
		})
	}
})
