import { SplToken } from '../token/type'
import { Connection } from '@solana/web3.js'
import { Numberish } from '@/types/constants'
import { BaseProvider, HttpProvider, MAINNET_API_HTTP, loadFromEnv } from '@bloxroute/solana-trader-client-ts'

export const getBxProvider = () => {
  return new HttpProvider(process.env.NEXT_PUBLIC_TRADE_API_AUTH_HEADER || '')
}
export const getQuotes = async ({
  connection,
  input,
  output,
  inputAmount,
  slippageTolerance
}: {
  connection: Connection
  input: SplToken
  output: SplToken
  inputAmount: Numberish
  slippageTolerance: Numberish
}) => {
  const bxProvider = getBxProvider()
  return await bxProvider.getQuotes({
    inToken: input.symbol || '',
    outToken: output.symbol || '',
    inAmount: Number(inputAmount),
    slippage: Number(slippageTolerance),
    limit: 5,
    projects: ['P_RAYDIUM']
  })
}
