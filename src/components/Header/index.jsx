import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { ButtonText } from "../ButtonText"

import { Container, Profile } from "./styles"

export function Header({ children }) {
  const { user, signOut } = useAuth()

  const navigate = useNavigate()

  function handleSignOut() {
    navigate("/")
    signOut()
  }

  function handleProfile() {
    navigate("/profile")
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder

  return (
    <Container>
      <h1>RocketMovies</h1>

      {children}

      <Profile>
        <div>
          <ButtonText title={user.name} onClick={handleProfile} />
          <ButtonText title="sair" onClick={handleSignOut} />
        </div>

        <img src={avatarUrl} alt="Foto do usuário" onClick={handleProfile} />
      </Profile>
    </Container>
  )
}
