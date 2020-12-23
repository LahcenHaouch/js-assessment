import {
  Unavailability,
  getAvailabilityInterval,
  getSortedUnavailabilities,
  groupUnavailabilitiesByDay,
} from './unavailability'

describe('unavailability', () => {
  const data =
    '1 08:45-12:59\n2 08:24-10:54\n1 14:45-14:47\n3 09:56-16:25\n5 15:16-16:28'

  const sortedData: Array<Unavailability> = [
    { day: '1', interval: [525, 779] },
    { day: '1', interval: [885, 887] },
    { day: '2', interval: [504, 654] },
    { day: '3', interval: [596, 985] },
    { day: '5', interval: [916, 988] },
  ]

  const groupedData: Record<string, Array<Unavailability>> = {
    '1': [
      { day: '1', interval: [525, 779] },
      { day: '1', interval: [885, 887] },
    ],
    '2': [{ day: '2', interval: [504, 654] }],
    '3': [{ day: '3', interval: [596, 985] }],
    '5': [{ day: '5', interval: [916, 988] }],
  }

  const falsyGroupedData: Record<string, Array<Unavailability>> = {
    '2': [{ day: '2', interval: [480, 1079] }],
  }

  const availability = '1 13:00-13:59'

  describe('getSortedUnavailabilities', () => {
    test('getSortedUnavailabilities should return a sorted array on day', () => {
      const result = getSortedUnavailabilities(data)

      expect(JSON.stringify(result)).toEqual(JSON.stringify(sortedData))
    })
  })

  describe('groupUnavailabilitiesByDay', () => {
    test('groupUnavailabilitiesByDay should group unavailabilities by day', () => {
      const result = groupUnavailabilitiesByDay(sortedData)

      expect(JSON.stringify(result)).toEqual(JSON.stringify(groupedData))
    })
  })

  describe('getAvailabilityInterval', () => {
    test(`getAvailabilityInterval should return ${availability}`, () => {
      const result = getAvailabilityInterval(groupedData)

      expect(result).toEqual(availability)
    })

    test('getAvailabilityInterval should return undefined', () => {
      const result = getAvailabilityInterval(falsyGroupedData)

      expect(result).toBeUndefined()
    })
  })
})
