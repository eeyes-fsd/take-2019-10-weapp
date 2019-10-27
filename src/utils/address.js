import wepy from '@wepy/core';
import auth from './auth.js'

const api_host = 'http://127.0.0.1:3000'
//获取地址列表，默认全部
const getAddresses = async (i) => {
    let token = await auth.getToken()
    let res = await wepy.promisify(wx.request)({
        url: i ? `${api_host}/addresses/${i}` : `${api_host}/addresses`,
        method: 'GET',
        header: { 'Authorization': `Bearer ${token}` }
    })
    return res.data.data
}
//删除地址
const deleteAddress = async (i) => {
    let token = await auth.getToken()
    let res = await wepy.promisify(wx.request)({
        url: `/addresses/${i}`,
        method: 'DELETE',
        header: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return res
}
//修改地址
const updateAddress = async (i, param) => {
    let token = await auth.getToken()
    let res = await wepy.promisify(wx.request)({
        url: `${api_host}/addresses/${i}`,
        method: 'PUT',
        data: param,
        header: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return res
}
// const 

export default {
    getAddresses,
    deleteAddress,
    updateAddress
}