import Nullstack from 'nullstack';
import './tailwind.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Success from './pages/Success';

class Application extends Nullstack {

  prepare(context) {
    context.page.locale = 'pt-BR';
    context.user = null
  }

  renderHead() {
    return (
      <head>
        <link 
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head> 
    )
  }

  render({ user }) {
    return (
      <main class="flex min-h-screen">
        <Head />
        <Login route="/login" />
        <Home route="/" />
      </main>
    )
  }

}

export default Application;