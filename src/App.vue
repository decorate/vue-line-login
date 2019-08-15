<template>
  <div id="app">
      <line-login-button
              :client-id="clientId"
              :client-secret="clientSecret"
              :callback-uri="callbackUri"
              login-text="<span class='ok'>OK LINE</span>"
              @result="result"
              add-friend
              friend-required></line-login-button>
  </div>
</template>

<script>
    import LineLoginButton from './components/LineLoginButton'

    export default {
        data() {
            return {
                clientId: '',
                clientSecret: '',
                callbackUri: ''
            }
        },

        created() {
            this.clientId = process.env.VUE_APP_LINE_CLIENT_ID
            this.clientSecret = process.env.VUE_APP_LINE_CLIENT_SECRET
            this.callbackUri = process.env.VUE_APP_LINE_CALLBACK_URL
        },

        components: {
            LineLoginButton
        },

        methods: {
            result(res) {
                console.log(res)
            }
        }
    }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
