
## vue-line-login

### Installation

With npm:

    npm install @team-decorate/vue-line-login
    
### Replace

    cp .env.sample .env
    
    
### Usage

```vue

<template>
    <line-login-button 
    client-id="11111"
    callback-uri="http://localhost:8080"
    @result="result" 
    add-friend 
    friend-required></line-login-button>
</template>

<script>
import '@team-decorate/dist/vue-line-login.css'
import VueLineLogin from '@team-decorate/vue-line-login'

export default {
    components: {
        VueLineLogin
    },
    
    methods: {
        result(res) {
            console.log(res)
        }
    }
}
</script>

```
