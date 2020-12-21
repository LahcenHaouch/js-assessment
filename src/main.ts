import fs from 'fs'
import path from 'path'

import {
  groupByDay,
  formatInterval,
  Unavailability,
  getAvailabilityInterval,
  getSortedUnavailabilities,
} from './utils'

fs.readFile(
  path.resolve(__dirname, '../data/input5.txt'),
  'utf8',
  (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const availabilities: Array<Unavailability> = getSortedUnavailabilities(
      data
    )

    const groupedAvailabilities: Record<
      string,
      Array<Unavailability>
    > = groupByDay(availabilities)

    for (const key in groupedAvailabilities) {
      const result = getAvailabilityInterval(groupedAvailabilities[key])
      if (result) {
        console.log(`${key} ${formatInterval(result)}`)
        break
      }
    }
  }
)
