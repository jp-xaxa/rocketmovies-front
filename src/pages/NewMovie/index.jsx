import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"

import { FiArrowLeft } from "react-icons/fi"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { ButtonText } from "../../components/ButtonText"
import { Title } from "../../components/Title"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Button } from "../../components/Button"

import { Container, Nav, Content, Form, Section, ButtonDelete } from "./styles"

export function NewMovie() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const params = useParams()

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewMovie() {
    const ratingConversion = Number(rating)

    if (!title) {
      return alert("O campo de título ficou vazio!")
    }

    if (!description) {
      return alert("O campo de descrição ficou vazio!")
    }

    if (!ratingConversion) {
      return alert("O campo de nota ficou vazio!")
    }

    if (ratingConversion < 0 || ratingConversion > 5) {
      return alert("Informe uma nota entre 0 e 5!")
    }

    if (newTag) {
      return alert(
        "Você deixei um tag no campo para adicionar, mas não clicou em adicionar. Clique em adicionar ou caso seja um engano, retire o dado."
      )
    }

    await api.post("/movies", {
      title,
      description,
      rating: ratingConversion,
      tags,
    })

    alert("Nota cadastrada com sucesso!")
    navigate(-1)
  }

  async function handleRemoveMovie() {
    try {
      const userConfirmation = confirm("Deseja excluir a nota mesmo?")

      if (userConfirmation) {
        await api.delete(`/movies/${params.id}`)
        navigate("/")
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível deletar essa nota.")
      }
    }
  }

  async function handleEditMovie() {
    try {
      const ratingConversion = Number(rating)

      const update = {
        title,
        description,
        rating: ratingConversion,
        tags,
      }

      if (!title) {
        return alert("O campo de título ficou vazio!")
      }

      if (!description) {
        return alert("O campo de descrição ficou vazio!")
      }

      if (!ratingConversion) {
        return alert("O campo de nota ficou vazio!")
      }

      if (ratingConversion < 0 || ratingConversion > 5) {
        return alert("Informe uma nota entre 0 e 5!")
      }

      if (newTag) {
        return alert(
          "Você deixei um tag no campo para adicionar, mas não clicou em adicionar. Clique em adicionar ou caso seja um engano, retire o dado."
        )
      }

      await api.put(`/movies/${params.id}`, update)

      alert("Os dados foram atualizados!")
      navigate(-1)
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar dados da nota.")
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/movies/${params.id}`)
        const { data } = response

        setTitle(data.title)
        setRating(data.rating)
        setDescription(data.description)

        const onlyTagsNames = data.tags.map((tag) => tag.name)
        setTags(onlyTagsNames)
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message)
        } else {
          alert("Não foi possível carregar os dados")
          console.log(error)
          navigate("/")
        }
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Header>
        <Input placeholder="Pesquisar pelo título" type="text" />
      </Header>

      <Nav>
        <ButtonText title="Voltar" icon={FiArrowLeft} onClick={handleBack} />
      </Nav>

      {!params.id ? (
        <Content>
          <Title title="Novo Filme" />

          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                placeholder="Título"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                placeholder="Sua nota (de 0 a 5)"
                type="number"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <Textarea
              placeholder="Observações"
              onChange={(e) => setDescription(e.target.value)}
            />

            <Section>
              <h1>Marcadores</h1>

              <div className="tags">
                {tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))}

                <NoteItem
                  $isNew
                  placeholder="Nova tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onClick={handleAddTag}
                />
              </div>
            </Section>

            <div>
              <ButtonDelete>Excluir</ButtonDelete>
              <Button title="Salvar" onClick={handleNewMovie} />
            </div>
          </Form>
        </Content>
      ) : (
        <Content>
          <Title title="Editar Filme salvo" />

          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                value={rating}
                type="number"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Section>
              <h1>Marcadores</h1>

              <div className="tags">
                {tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))}

                <NoteItem
                  $isNew
                  placeholder="Nova tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onClick={handleAddTag}
                />
              </div>
            </Section>

            <div>
              <ButtonDelete onClick={handleRemoveMovie}>Excluir</ButtonDelete>
              <Button title="Salvar" onClick={handleEditMovie} />
            </div>
          </Form>
        </Content>
      )}
    </Container>
  )
}
