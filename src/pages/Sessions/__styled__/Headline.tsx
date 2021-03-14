import styled from 'styled-components/macro'

const Headline = styled('h2')`
  margin: 0 0 16px;
  font-size: 1.125rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text.main};
`

export default Headline