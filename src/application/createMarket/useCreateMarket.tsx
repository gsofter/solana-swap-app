import { PublicKeyish } from '@raydium-io/raydium-sdk'

import create from 'zustand'

import toPubString from '@/functions/format/toMintString'
import { Numberish } from '@/types/constants'

import { SplToken } from '../token/type'
import { getCreateNewMarketProgramId } from '../token/wellknownProgram.config'

export type CreateMarket = {
  programId: string
  baseToken?: SplToken
  quoteToken?: SplToken
  minimumOrderSize: Numberish
  tickSize: Numberish

  newCreatedMarketId?: PublicKeyish
}

export const useCreateMarket = create<CreateMarket>((set) => ({
  programId: toPubString(getCreateNewMarketProgramId()),
  minimumOrderSize: 1,
  tickSize: 0.01
}))
