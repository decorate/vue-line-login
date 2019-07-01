
## vue-line-login

### Installation

With npm:

    npm install @team-decorate/vue-line-login
    
    
### Usage

```vue

<template>
    <line-login-button 
    client-id="11111"
    callback-uri="http://localhost:8080"
    client-secret="secret"
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

## Available props

| Prop                          | Type            | Default     | Description            |
|-------------------------------|-----------------|-------------|------------------------|
| client-id                     | String          |             | line client id         |
| client-secret                 | String          |             | line client secret     |
| callback-uri                  | String          |             | line redirect uri      |
| add-friend                    | Boolean         | false       | Show Add Friend        |
| friend-required               | Boolean         | false       | Fail if you do not add friends|
| login-text                    | String          | LINEでログイン|                       |
|friend-error-text              | String          | 友達に追加してください| Error text when not added to a friend |

## Events

| Event                       | Output            | Description                          |
|-----------------------------|-------------------|--------------------------------------|
| result                      | result            | Object such as line access token     |