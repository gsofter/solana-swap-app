export const formatDecimal = ({
  val,
  decimals,
  maxLength = 8
}: {
  val: number | string
  decimals: number
  maxLength?: number
}): number => {
  const valStr = String(val)
  const valArr = valStr.split('.')
  const [intDigit, decimalLength] = [valArr[0]?.length || 1, valArr[1]?.length || 0]
  const totalLength = intDigit + decimalLength
  if (totalLength <= maxLength) return Number(val)
  return Number(Number(val).toFixed(Math.max(maxLength - intDigit, 0)))
}
