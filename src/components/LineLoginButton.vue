<template>
    <div>
        <button class="btn btn-block btn-social btn-line" @click="login">
            <span class="fa fa-line"></span>
            LINEでログイン
        </button>
        <span v-if="error" style="color: #dc3545; font-size: 80%;">{{error}}</span>
    </div>
</template>

<script>
    import queryString from 'querystring'
    import axios from 'axios'
    import OAuthRequest from '../Entities/OAuthRequest'
    import linq from 'linq'
    import OAuthResult from '../Entities/OAuthResult'

    export default {
        name: 'line-login-button',

        data() {
            return {
                error: ''
            }
        },

        props: {
            clientId: {
                type: String,
                require: true
            },

            clientSecret: {
                type: String,
                require: true
            },

            callbackUri: {
                type: String,
                require: true
            },

            addFriend: {
                type: Boolean,
                require: false
            },

            friendRequired: {
                type: Boolean,
                require: false
            },

            friendErrorTest: {
                type: String,
                require: false,
                default: '友達に追加してください。'
            }
        },

        async created() {
            const { code } = queryString.parse(window.location.search.replace('?', ''))

            if(!code) return

            const result = await this.getToken(code)

            const { data } = await this.getProfile(result.token)

            if(this.friendRequired) {
                const flag = await this.checkFriend(result.token)

                if(!flag) {
                    this.error = this.friendErrorTest
                }
            }

            if(!this.error) {
                const response = Object.assign(data, result.getPostable())
                this.$emit('result', response)
            }
        },

        methods: {
            login() {
                const url = 'https://access.line.me/oauth2/v2.1/authorize'
                let params = {
                    response_type: 'code',
                    client_id: this.clientId,
                    redirect_uri: this.callbackUri,
                    state: Math.random().toString(32).substring(2),
                    scope: 'openid profile',
                }

                if(this.addFriend) {
                    params = Object.assign(params, {
                        prompt: 'consent',
                        bot_prompt: 'aggressive'
                    })
                }

                window.location.href = `${url}?${queryString.stringify(params)}`
            },

            async getToken(code) {
                const result = new OAuthRequest({
                    code: code,
                    clientId: this.clientId,
                    clientSecret: this.clientSecret,
                    redirectUri: this.callbackUri
                })
                const params = new URLSearchParams()
                linq.from(result.getPostable()).select(x => params.append(x.key, x.value)).toArray()

                const { data } = await axios.post('https://api.line.me/oauth2/v2.1/token', params)
                return new OAuthResult(data)
            },

            async getProfile(token) {
                return await axios.get('https://api.line.me/v2/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            },

            async checkFriend(token) {
                const { data } = await axios.get('https://api.line.me/friendship/v1/status', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                return data.friendFlag
            }
        }
    }
</script>

<style lang="scss">
    .btn-block + .btn-block {
        margin-top: 5px;
    }
    .btn-social {
        position: relative;
        padding-left: 44px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .btn-block {
        display: block;
        width: 100%;
    }
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .btn-line {
        color: #fff;
        background-color: #00b900;
        border-color: rgba(0,0,0,0.2);
    }
    .btn-social>:first-child {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0,0,0,0.2);
    }
    .fa-line {
        background: url(https://d.line-scdn.net/r/web/social-plugin/img/common/line_v3.png) 2px 3px no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        height: 100%;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0,0,0,0.2);
        background-size: 28px 26px;
    }
</style>