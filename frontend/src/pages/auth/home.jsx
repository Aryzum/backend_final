import './home.css'

import { Link, useLocation } from 'react-router-dom'

import { Logo } from '../../components/Logo'

export function Home() {
  return (
    <section className="wrapper d-flex vh-100 text-center">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="">
          <div>
            <Logo className="h3 float-md-start mb-0" />

            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link
                className="nav-link fw-bold py-1 px-0 active text-dark"
                to="/"
              >
                Home
              </Link>

              <Link
                className="nav-link fw-bold py-1 px-0 text-dark"
                to="/signin"
              >
                Entrar
              </Link>

              <Link
                className="nav-link fw-bold py-1 px-0 text-dark"
                to="/signup"
              >
                Cadastre-se
              </Link>
            </nav>
          </div>
        </header>

        <main className="mt-auto mb-auto">
          <h1>Minhas Tarefas</h1>

          <p className="lead">
            Organize sua vida com facilidade: cadastre, conclua e remova tarefas
            pessoais em nossa aplicação, tudo é salvo e sincronizado na nuvem.
          </p>
        </main>
      </div>
    </section>
  )
}
