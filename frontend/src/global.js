import Vue from 'vue'

export const userKey = '__knowledge_users'

export const baseApiUrl = process.env.PORT
// export const baseApiUrl = 'http://192.168.0.100:3000'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }