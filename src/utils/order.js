import wepy from '@wepy/core';
import { getToken } from '../utils/auth';

const api_host = 'http://127.0.0.1:3000';
const getpayment = async () => {
    wx.showLoading({ title: '获取订单状态中' });
    let token = await getToken()
    let res = await wepy.promisify(wx.request)({
        url: `${api_host}`,
        method: 'POST',
        header: { 'Authorization': `Bearer ${token}` }
    }).catch(err => {
        wx.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 1000
        })
    })
    wx.hideLoading()
    return res
}
const pay = async () => {
    let payment = await getpayment().data
    if (!payment) {
        return
    }
    wx.requestPayment(
        {
            'timeStamp': payment.timeStamp,
            'nonceStr': payment.nonceStr,
            'package': payment.package,
            'signType': 'MD5',
            'paySign': payment.paySign,
            'success': function (res) {
                console.log(res)
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateTo({
                    url: '/pages/paysuccess'
                });
            },
            'fail': function (res) {
                console.log(res)
                wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 1200
                })
            },
            'complete': function (res) { }
        })
}
export default {
    pay
}