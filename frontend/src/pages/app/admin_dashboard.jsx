import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getUserInfo } from '../../api/get-user-info'
import { Logo } from '../../components/Logo'

function maskEmail(email) {
  const [username, domain] = email.split('@')
  return `${username.slice(0, 3)}***@${domain}`
}

export function AdminDashboard() {
  const navigate = useNavigate()

  const { data: usersWithTasks, isLoading } = useQuery({
    queryKey: ['usersWithTasks'],
    queryFn: getUserInfo,
    onError: () => {
      toast.error('Erro ao carregar dados dos usuários e tarefas')
    },
  })

  function handleLogout() {
    localStorage.clear()
    navigate('/signin', { replace: true })
  }

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <header className="row justify-content-between align-items-center mb-4 py-3">
        <div className="col">
          <Logo className="h3" />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => navigate('/dashboard')}
          >
            Voltar para Dashboard
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            title="Sair"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-left" />
          </button>
        </div>
      </header>

      <div className="row justify-content-center flex-grow-1">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="card-title mb-4 text-center">
                Painel Administrativo
              </h2>

              <div className="alert alert-info" role="alert">
                Este painel exibe informações limitadas dos usuários para fins
                de gerenciamento do sistema. Todos os acessos são registrados em
                conformidade com a LGPD.
              </div>

              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="accordion" id="usersAccordion">
                  {usersWithTasks?.map((user, index) => (
                    <div className="accordion-item" key={user._id}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          Usuário {index + 1} - {maskEmail(user.email)}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#usersAccordion"
                      >
                        <div className="accordion-body">
                          <h5>Resumo de Tarefas:</h5>
                          <p>Total de tarefas: {user.tasks.length}</p>
                          <p>
                            Tarefas concluídas:{' '}
                            {user.tasks.filter((task) => task.completed).length}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
