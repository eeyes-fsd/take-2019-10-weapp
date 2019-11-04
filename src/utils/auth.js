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
//刷新token
const refreshToken = async () => {
    let access_token = await wepy.wx.getStorage('access_token')
    let response = await POST('/authorizations/current', {}, access_token.data)
    await wepy.wx.setStorage({
        key: "access_token",
        data: response.data.access_token
    })
    await wepy.wx.setStorage({
        key: "expires_in",
        data: new Date().getTime() + response.data.expires_in
    })
    return response
}
const getToken = async () => {
    // 从缓存中取出 Token
    let accessToken, expires_in;
    accessToken = await wepy.wx.getStorage('access_token')
    //取出有效期
    expires_in = await wepy.wx.getStorage('expires_in')
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
            accessToken = authResponse.data.access_token
        }
    }
    return accessToken
}
const login = async () => {
    //promise化login
    let code = (await wepy.promisify(wx.login)()).code
    let authResponse = await POST('/weapp/authorizations', { code: code }).catch(err => {
        console.log(err)
        wx.showToast({
            title: '似乎网络不通',
            duration: 2000
        })
    })
    await wepy.wx.setStorage({
        key: "access_token",
        data: authResponse.data.access_token
    })
    await wepy.wx.setStorage({
        key: "expires_in",
        data: new Date().getTime() + authResponse.data.expires_in
    })
    return authResponse
}
export default {
    login,
    refreshToken,
    getToken
}
