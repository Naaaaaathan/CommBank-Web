import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { API_ROOT } from '../../../../api/lib'
import { Tag, Transaction } from '../../../../api/types'
import Chip from '../../../components/Chip'

type Props = { transaction: Transaction }

export const TransactionItem = React.memo(function TransactionItem(props: Props) {
  const [tags, setTags] = useState<Tag[] | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchAll() {
      if (!props.transaction.tagIds.length) {
        if (isMounted) {
          setTags([])
        }
        return
      }

      try {
        const fetchedTags = await Promise.all(
          props.transaction.tagIds.map(async (tagId) => {
            const response = await axios.get(`${API_ROOT}/api/Tag/${tagId}`)
            return response.data as Tag
          }),
        )

        if (isMounted) {
          setTags(fetchedTags)
        }
      } catch (error) {
        if (isMounted) {
          setTags([])
        }
      }
    }

    fetchAll()

    return () => {
      isMounted = false
    }
  }, [props.transaction.tagIds])

  return (
    <Container>
      <Content>
        <Description>{props.transaction.description}</Description>

        <Tags>{tags ? tags.map((tag) => <Chip key={tag.id} label={tag.name} />) : null}</Tags>

        <DateText>{`${new Date(props.transaction.dateTime).toLocaleDateString()}`}</DateText>

        <Price>{`${
          props.transaction.transactionType === 'Credit'
            ? `$${props.transaction.amount}`
            : `-$${props.transaction.amount}`
        }`}</Price>
      </Content>
      <Divider />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Divider = styled.div`
  width: 100%;
  height: 0.2px;
  background-color: rgba(174, 174, 174, 0.6);
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 0;
`

const Description = styled.h6`
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex: 1;
`

const DateText = styled.h6`
  font-size: 1.2rem;
  color: rgba(174, 174, 174, 1);
  font-weight: bold;
  margin: 0;
`

const Price = styled.h6`
  font-size: 1.2rem;
  margin: 0;
`
