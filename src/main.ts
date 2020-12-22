import fs from 'fs'
import path from 'path'

import {
  Unavailability,
  getAvailabilityInterval,
  getSortedUnavailabilities,
  groupUnavailabilitiesByDay,
} from './unavailability.ts'

fs.readFile(
  path.resolve(__dirname, '../data/input1.txt'),
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
    > = groupUnavailabilitiesByDay(availabilities)

    const result = getAvailabilityInterval(groupedAvailabilities)

    if (result) {
      console.log(result)
    }
  }
)
