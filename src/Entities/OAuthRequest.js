import Model from '@team-decorate/alcjs'

const FILLABLE = [
    'grantType', 'clientId', 'clientSecret', 'redirectUri', 'code'
]

export default class OAuthRequest extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABLE

        this.grantType = 'authorization_code'
        this.clientId = process.env.VUE_APP_LINE_CLIENT_ID
        this.clientSecret = process.env.VUE_APP_LINE_CLIENT_SECRET
        this.redirectUri = process.env.VUE_APP_LINE_CALLBACK_URL
        this.code = ''

        this.data = data
    }

    get _model () {
        return 'OAuthRequest'
    }

}
