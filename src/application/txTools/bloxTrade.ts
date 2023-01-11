import { Keypair, Transaction } from '@solana/web3.js'

export function txFromBase64(base64EncodedTx: string): Transaction {
  const buff = Buffer.from(base64EncodedTx, 'base64')
  return Transaction.from(buff)
}

export function txToBase64(transaction: Transaction): string {
  const buff = transaction.serialize()
  return buff.toString('base64')
}
