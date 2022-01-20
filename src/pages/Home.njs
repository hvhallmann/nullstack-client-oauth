import Nullstack from 'nullstack';
import oauthConfig from '../config/oauth'



class Home extends Nullstack {

  user = null
  statusMessage = ''
  token = ''
  refreshToken = ''

  prepare({ project, page }) {
    page.title = `${project.name} - Nulla-chan te dá as boas vindas!`;
    page.description = `${project.name} foi feito com Nullstack`;
  }

  async hydrate() {
    const token = localStorage.getItem('OAuthToken')
    const refreshToken = localStorage.getItem('OAuthRefreshToken')
    if(token) {
      this.token = token
      this.refreshToken = refreshToken
      this.user = {
        name: 'Example User',
        email: 'test@teste.com.br'
      }
    }
  }

  static async fetchRefreshToken({ data }) {
    const response = await fetch(`${oauthConfig.baseURI}/token`, {
      method: 'POST',
      body: `refresh_token=${data.refreshToken}&client_secret=${data.clientSecret}&client_id=${data.clientId}&grant_type=refresh_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return await response.json()
  }

  async getRefreshToken() {
    this.statusMessage = 'Getting new token...'

    const response = await this.fetchRefreshToken({
      data: {
        refreshToken: this.refreshToken,
        clientId: oauthConfig.clientId,
        clientSecret: oauthConfig.clientSecret,
      }
    })

    console.log(response)

    if(response.error_description) {
      this.statusMessage = response.error_description
      return
    }

    localStorage.setItem('OAuthToken', response.access_token)
    localStorage.setItem('OAuthRefreshToken', response.refresh_token)
    this.statusMessage = 'Token updated with success'

  }

  logoutUser() {
    localStorage.removeItem('OAuthToken')
    localStorage.removeItem('OAuthRefreshToken')
    this.user = null
  }

  renderLoginButton() {
    return (
      <a class="px-3 py-2 border-1 rounded-md bg-sky-500 text-white" href={`${oauthConfig.baseURI}?grant_type=authorization_code&response_type=code&client_id=${oauthConfig.clientId}&redirect_uri=http://localhost:4000/login&state=myState`}>
        Login
      </a>
    )
  }
  renderLogoutButton() {
    return (
      <>
        <p class="mb-4">Cool, we are logged now as { this.user.name }</p>
        <a onclick={this.logoutUser} class="px-3 py-2 border-1 rounded-md bg-sky-500 text-white" href="#">
          Logout
        </a>
        <a onclick={this.getRefreshToken} class="px-3 py-2 ml-1 border-1 rounded-md bg-green-500 text-white" href="#">
          Refresh Token
        </a>
      </>
    )
  }

  render({ project, user }) {
    return (
      <section class="flex w-full items-center justify-center">
        <div class="text-center">
          <h1 class="text-xl bold mb-4"> {project.name}</h1>
          { this.statusMessage && <p>{this.statusMessage}</p>}
          { !this.user 
          ? <LoginButton />
          : <LogoutButton />
        }
        </div>
      </section>
    )
  }

}

export default Home;