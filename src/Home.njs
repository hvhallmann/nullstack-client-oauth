import Nullstack from 'nullstack';

class Home extends Nullstack {

  prepare({ project, page }) {
    page.title = `${project.name} - Nulla-chan te dá as boas vindas!`;
    page.description = `${project.name} foi feito com Nullstack`;
  }

  render({ project }) {
    return (
      <section>
        <h1> {project.name} </h1>
        <p>
          Fizemos alguns exemplos para te ajudar a começar! Dê uma olhada na
          <Link href="vscode://file//home/jay/www/henrique-oauth-client/src">
            pasta src
          </Link>.
        </p>
      </section>
    )
  }

}

export default Home;