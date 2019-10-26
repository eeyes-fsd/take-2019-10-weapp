import wepy from '@wepy/core';

const api_host = 'http://127.0.0.1:3000'

const POST = (url, param = {}, token = "") => {
    return new Promise((resolve, reject) => {
        wx.request({
            method: 'POST',
            header: {
                'Content-Type': token ? "" : 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            url: `${api_host}${url}`,
            data: param,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}
const refreshToken = async () => {
    let response;
    await wepy.wx.getStorage('access_token')
        .then(res => {
            console.log(res.data)
            return POST('/authorizations/current', {}, res.data)
        })
        .then(res => {
            if (res.data.access_token) {
                wepy.wx.setStorage({
                    key: "access_token",
                    data: res.data.access_token
                })
                response = res
            }
        })
    return response
}
const getToken = async () => {
    // 从缓存中取出 Token
    let accessToken, expires_in;
    await wepy.wx.getStorage('access_token')
        .then(res => {
            accessToken = res.data || ""
        });
    //取出有效期
    await wepy.wx.getStorage('expires_in')
        .then(res => {
            expires_in = res.data || ""
        });
    // 如果 token 过期了，则调用刷新方法
    if (new Date().getTime() > expires_in) {
        let refreshResponse = await refreshToken()
        console.log("reset token")
        // 刷新成功
        if (refreshResponse.statusCode === 200) {
            accessToken = refreshResponse.data.access_token
        } else {
            // 刷新失败了，重新调用登录方法，设置 Token
            let authResponse = await login()
            if (authResponse.statusCode === 201) {
                accessToken = authResponse.data.access_token
            }
        }
    }
    return accessToken
}
const login = () => {
    //promise化login
    wepy.promisify(wx.login)()
        .then(res => {
            //发送登录请求
            return POST('/weapp/authorizations', { code: res })
        })
        .catch(err => {
            console.log(err)
            wx.showToast({
                title: '似乎出了什么问题',
                duration: 2000
            })
        })
        .then(res => {
            //写入token
            wepy.wx.setStorage({
                key: "access_token",
                data: res.data.access_token
            })
            //写入过期日期
            wepy.wx.setStorage({
                key: 'expires_in',
                data: new Date().getTime() + res.data.expires_in
            })
        })
}
export default {
    login,
    refreshToken,
    getToken
}