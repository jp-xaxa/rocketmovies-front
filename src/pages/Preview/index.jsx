import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { FiArrowLeft, FiClock, FiEdit3 } from "react-icons/fi"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { ButtonText } from "../../components/ButtonText"
import { Title } from "../../components/Title"
import { Assessment } from "../../components/Assessment"
import { Tags } from "../../components/Tags"

import { Container, Nav, Content } from "./styles"

export function Preview() {
  const { user } = useAuth()
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder

  function handleBack() {
    navigate(-1)
  }

  function handleToEdit(id) {
    navigate(`/to-edit-movie/${id}`)
  }

  useEffect(() => {
    async function fetchMovie() {
      const response = await api.get(`/movies/${params.id}`)
      setData(response.data)
    }

    fetchMovie()
  }, [])

  return (
    <Container>
      <Header>
        <Input placeholder="Pesquisar pelo título" type="text" />
      </Header>

      <Nav>
        <ButtonText title="Voltar" icon={FiArrowLeft} onClick={handleBack} />

        <ButtonText
          title="Editar Nota"
          icon={FiEdit3}
          onClick={() => handleToEdit(params.id)}
        />
      </Nav>

      {data && (
        <Content>
          <section>
            <Title title={data.title} />

            <Assessment value={data.rating} />
          </section>

          <section>
            <div>
              <img src={avatarUrl} alt="Foto do usuário" />

              <p>{user.name}</p>
            </div>

            <div>
              <FiClock />

              <p>{data.updated_at}</p>
            </div>
          </section>

          {data.tags && (
            <section className="tags">
              {data.tags.map((tag) => (
                <Tags key={String(tag.id)} title={tag.name} />
              ))}
            </section>
          )}

          <p>{data.description}</p>
        </Content>
      )}
    </Container>
  )
}
