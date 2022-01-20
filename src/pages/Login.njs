import Nullstack from 'nullstack';
import oauthConfig from '../config/oauth'

class Login extends Nullstack {
  
  error = ''
  statusMessage = ''
  redirectUri = 'http://localhost:4000/login'
  client = {
    id: 'MarketPlace',
    secret: 'MySecretKey'
  }

  prepare() {
    // your code goes here
  }

  static async getAccessToken({ data }) {

    const response = await fetch(`${oauthConfig.baseURI}/token`, {
      method: 'POST',
      body: `code=${data.code}&client_secret=${data.secret}&client_id=${data.id}&grant_type=authorization_code&redirect_uri=${data.redirectUri}`, // this is how we send that data up
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  // This is REALLY important
      },
    })
    return await response.json()

  }
  
  async hydrate(context) {
    const { params: { code }, router } = context
    
    this.statusMessage = 'Getting Access Token...'
    this.error = ''

    const response = await this.getAccessToken({ data: {
      code,
      secret: this.client.secret,
      id: this.client.id,
      redirectUri: this.redirectUri
    } })


    if(response.error) {
      this.error = response.error_description
      this.statusMessage = 'Failed!'
      return
    }

    this.statusMessage = `Token received ${response.access_token}...`

    localStorage.setItem('OAuthToken', response.access_token)
    localStorage.setItem('OAuthRefreshToken', response.refresh_token)

    router.path = '/'
  }
  
  render() {
    return (
      <section class="flex flex-col w-full items-center justify-center">
        { this.statusMessage && <h1 class="text-xl bold mb-4">{this.statusMessage}</h1> }
        { this.error && <p class="text-xl bold mb-4 text-red-500">{this.error}</p> }
      </section>
    )
  }

}

export default Login;