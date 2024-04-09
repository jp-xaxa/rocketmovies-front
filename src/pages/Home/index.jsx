import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

import { FiPlus } from "react-icons/fi"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

import { Note } from "../../components/Note"

import { Container, Subheader, Section, New } from "./styles"

export function Home() {
  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])

  const navigate = useNavigate()

  function handlePreview(id) {
    navigate(`/preview/${id}`)
  }

  useEffect(() => {
    async function fetchMovies() {
      const response = await api.get(`/movies?title=${search}`)
      setMovies(response.data)
    }

    fetchMovies()
  }, [search])

  return (
    <Container>
      <Header>
        <Input
          placeholder="Pesquisar pelo título"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Header>

      <Subheader>
        <h1>Meus filmes</h1>

        <New to="/new-movie">
          <FiPlus />
          Adicionar filme
        </New>
      </Subheader>

      <Section>
        {movies &&
          movies.map((movie) => (
            <Note
              key={String(movie.id)}
              data={movie}
              onClick={() => handlePreview(movie.id)}
            />
          ))}
      </Section>
    </Container>
  )
}
