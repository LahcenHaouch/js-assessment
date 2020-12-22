export const includedInInterval = (
  firstInterval: number[],
  segondInterval: number[]
): boolean => {
  const [firstMin, firstMax] = firstInterval
  const [segondMin, segondMax] = segondInterval

  return (
    (firstMin >= segondMin && firstMin <= segondMax) ||
    (firstMax >= segondMin && firstMax <= segondMax)
  )
}

export const doubleDigit = (num: number): string => {
  if (num >= 10) {
    return `${num}`
  }

  return `0${num}`
}

export const formatInterval = (interval: number[]): string => {
  const [min, max] = interval

  const minHour = doubleDigit(Math.floor(min / 60))
  const maxHour = doubleDigit(Math.floor(max / 60))
  const minMinutes = doubleDigit(min % 60)
  const maxMinutes = doubleDigit(max % 60)

  return `${minHour}:${minMinutes}-${maxHour}:${maxMinutes}`
}
