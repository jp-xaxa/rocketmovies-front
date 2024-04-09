import { Container } from "./styles"
import { FaRegStar, FaStar } from "react-icons/fa"

import { Assessment } from "../../components/Assessment"
import { Tags } from "../Tags"

export function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>

      <Assessment value={data.rating} />

      <p>{data.description}</p>

      {data.tags && (
        <footer>
          {data.tags.map((tag) => (
            <Tags key={String(tag.id)} title={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  )
}
