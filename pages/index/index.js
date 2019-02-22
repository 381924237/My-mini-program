//index.js
//获取应用实例
const app = getApp()
import {translate} from '../../utils/api.js'

Page({
	data: {
		query: '',
		hideClearIcon: true,
		result: [],
		fromLang: {},
		toLang: {},
		isConfirm: false
	},
	onLoad(options){
		if(options.query){
			this.setData({query:options.query})
		}
	},
	onShow(){
		this.setData({
			fromLang: app.globalData.fromLang,
			toLang: app.globalData.toLang
		})

		this.onConfirm()
	},
	onInput(e){
		this.setData({ query: e.detail.value})
		if(this.data.query.length > 0){
			this.setData({ hideClearIcon: false})
		}else{
			this.setData({ hideClearIcon: true})
		}
	},
	onTapClose(){
		this.setData({ query: '', hideClearIcon: true})
	},
	onConfirm(){
		if(this.data.isConfirm) return
		if(!this.data.query) return

		this.setData({isConfirm: true})
		translate(this.data.query, {from: this.data.fromLang.lang , to: this.data.toLang.lang})
		.then(res => {
			this.setData({ result: res.trans_result[0]})

			let history = wx.getStorageSync('history') || []
			history.unshift({ query: this.data.query, result: this.data.result.dst })
			history.length = history.length > 10 ? 10 : history.length
			wx.setStorageSync('history', history)

			this.setData({isConfirm: false})
		})
	},
	onChooseFrom(){
		wx.navigateTo({
			url: `./../change/change?query=${this.data.fromLang.index}&refer=from`
		})
	},
	onChooseTo() {
		wx.navigateTo({
			url: `./../change/change?query=${this.data.toLang.index}&refer=to`
		})
	},
	onExchange(){
		if(this.data.fromLang.lang == 'auto') return
		[app.globalData.fromLang, app.globalData.toLang] = [app.globalData.toLang, app.globalData.fromLang]

		this.setData({
			fromLang: app.globalData.fromLang,
			toLang: app.globalData.toLang
		})
	}
})
