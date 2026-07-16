import React from 'react'
import styled from 'styled-components'
import { media } from '../../../utils/media'
import GoalCard from './GoalCard'

type Props = { ids: string[] | null }

const MAX_GOALS_TO_SHOW = 5

export default function GoalsContent(props: Props) {
  if (!props.ids) return null

  const visibleIds = props.ids.slice(0, MAX_GOALS_TO_SHOW)

  return (
    <Container>
      {visibleIds.map((id) => (
        <GoalCard key={id} id={id} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 400px;
  padding: 4rem;
  overflow-x: auto;

  ${media('<tablet')} {
    width: 100%;

    padding-left: 0;
    padding-right: 0;
  }
`
