import { doubleDigit, formatInterval, includedInInterval } from './utils'

describe('utils', () => {
  const doubleDigitCase = 12
  const firstInterval = [2, 3]
  const segondInterval = [1, 6]
  const formatedResult = '00:02-00:03'

  describe('includedInInterval', () => {
    test('includedInInterval should return a boolean', () => {
      const result = includedInInterval(firstInterval, segondInterval)

      expect(typeof result === 'boolean').toBeTruthy()
    })

    test('includedInInterval should return true', () => {
      const result = includedInInterval(firstInterval, segondInterval)

      expect(result).toBeTruthy()
    })

    test('includedInInterval should return false', () => {
      const result = includedInInterval(segondInterval, firstInterval)

      expect(result).toBeFalsy()
    })
  })

  describe('doubleDigit', () => {
    test('doubleDigit should return a string', () => {
      const result = doubleDigit(firstInterval[0])

      expect(typeof result === 'string').toBeTruthy()
    })

    test('doubleDigit should return 12', () => {
      const result = doubleDigit(doubleDigitCase)

      expect(result).toEqual(`${doubleDigitCase}`)
    })

    test('doubleDigit should return 02', () => {
      const result = doubleDigit(firstInterval[0])

      expect(result).toEqual(`0${firstInterval[0]}`)
    })
  })

  describe('formatInterval', () => {
    test('formatInterval should return a string', () => {
      const result = formatInterval(firstInterval)

      expect(typeof result === 'string').toBeTruthy()
    })

    test(`formatInterval should return ${formatedResult}`, () => {
      const result = formatInterval(firstInterval)

      expect(result).toEqual(formatedResult)
    })
  })
})
