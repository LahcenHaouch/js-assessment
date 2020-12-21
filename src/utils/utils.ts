export const SHIFT_DURATION = [8 * 60, 17 * 60 + 59] // 08:00-17:59 in minutes
export const MEETING_DURATION = 59

export interface Unavailability {
  day: string
  min: number
  max: number
}

export const getSortedUnavailabilities = function(
  data: string
): Array<Unavailability> {
  return data
    .split('\n')
    .map(element => {
      const [day, rest] = element.split(' ')
      const [minUnavailability, maxUnavailability] = rest.split('-')
      const [minHour, minMinute] = minUnavailability.split(':')
      const [maxHour, maxMinute] = maxUnavailability.split(':')

      const min = Number(minHour) * 60 + Number(minMinute)
      const max = Number(maxHour) * 60 + Number(maxMinute)

      return {
        day,
        min,
        max,
      }
    })
    .sort((prev, next) => Number(prev.day) - Number(next.day))
}

export const groupByDay = function(
  unavailabilities: Array<Unavailability>
): Record<string, Array<Unavailability>> {
  return unavailabilities.reduce(
    (acc: Record<string, Array<Unavailability>>, next: Unavailability) => {
      ;(acc[next.day] = acc[next.day] ?? []).push(next)
      return acc
    },
    {}
  )
}

export const includedIn = (
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

export const getAvailabilityInterval = (
  unvailabilities: Array<Unavailability>
) => {
  const [shiftMin, shiftMax] = SHIFT_DURATION

  const intervals = unvailabilities.map(unavalaibility => [
    unavalaibility.min,
    unavalaibility.max,
  ])

  for (let i = shiftMin; i + MEETING_DURATION <= shiftMax; i++) {
    const intervalToTest = [i, i + MEETING_DURATION]
    const isIntervalAvailable = intervals.every(
      element => !includedIn(intervalToTest, element)
    )

    if (isIntervalAvailable) {
      return intervalToTest
    }
  }

  return undefined
}

export const formatInterval = (interval: number[]): string => {
  const [min, max] = interval

  return `${Math.floor(min / 60)}:${min % 60}-${Math.floor(max / 60)}:${max %
    60}`
}
