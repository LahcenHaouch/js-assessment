import { formatInterval, includedInInterval } from '../utils'

const SHIFT_DURATION = [8 * 60, 17 * 60 + 59] // 08:00-17:59 in minutes
const MEETING_DURATION = 59

export interface Unavailability {
  day: string
  interval: number[]
}

export const getSortedUnavailabilities = function(
  data: string
): Array<Unavailability> {
  return data
    .split('\n')
    .map(element => {
      const [day, rest] = element.split(' ')
      const [minUnavailability, maxUnavailability] = rest.split('-')
      const [minHour, minMinutes] = minUnavailability.split(':')
      const [maxHour, maxMinutes] = maxUnavailability.split(':')

      const min = Number(minHour) * 60 + Number(minMinutes)
      const max = Number(maxHour) * 60 + Number(maxMinutes)

      return {
        day,
        interval: [min, max],
      }
    })
    .sort((prev, next) => Number(prev.day) - Number(next.day))
}

export const groupUnavailabilitiesByDay = function(
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

export const getAvailabilityInterval = (
  record: Record<string, Array<Unavailability>>
): string | undefined => {
  const [shiftMin, shiftMax] = SHIFT_DURATION

  // eslint-disable-next-line guard-for-in
  for (const key in record) {
    const unvailabilities = record[key]
    for (let i = shiftMin; i + MEETING_DURATION <= shiftMax; i++) {
      const intervalToTest = [i, i + MEETING_DURATION]
      const isIntervalAvailable = unvailabilities.every(
        element => !includedInInterval(intervalToTest, element.interval)
      )

      if (isIntervalAvailable) {
        return `${key} ${formatInterval(intervalToTest)}`
      }
    }
  }

  return undefined
}
