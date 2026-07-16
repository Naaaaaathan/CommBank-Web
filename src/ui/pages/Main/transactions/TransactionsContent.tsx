import React from 'react'
import { Transaction } from '../../../../api/types'
import { TransactionItem } from './TransactionItem'

type Props = { transactions: Transaction[] | null }

const MAX_TRANSACTIONS_TO_SHOW = 10

export default function TransactionsContent(props: Props) {
  if (!props.transactions) return null

  const sortedTransactions = [...props.transactions].sort(sortByDateDesc)
  const visibleTransactions = sortedTransactions.slice(0, MAX_TRANSACTIONS_TO_SHOW)

  return (
    <>
      {visibleTransactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </>
  )
}

function sortByDateDesc(a: Transaction, b: Transaction) {
  return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
}
