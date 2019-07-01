import Model from '@team-decorate/alcjs'

const FILLABLE = [
    'grantType', 'clientId', 'clientSecret', 'redirectUri', 'code'
]

export default class OAuthRequest extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABLE

        this.grantType = 'authorization_code'
        this.clientId = ''
        this.clientSecret = ''
        this.redirectUri = ''
        this.code = ''

        this.data = data
    }

    get _model () {
        return 'OAuthRequest'
    }

}
