import fs from 'fs'
import path from 'path'

import {
  Unavailability,
  getAvailabilityInterval,
  getSortedUnavailabilities,
  groupUnavailabilitiesByDay,
} from './unavailability.ts'

export const readDirectoryAndPrintIntervalls = (directoryPath: string) => {
  fs.readdir(path.resolve(__dirname, directoryPath), (err, filenames) => {
    if (err) {
      throw err
    }
    filenames.forEach((filename: string) => {
      fs.readFile(
        path.resolve(__dirname, `${directoryPath}/${filename}`),
        'utf-8',
        (err, data) => {
          if (err) {
            throw err
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
            fs.writeFile(
              path.resolve(
                __dirname,
                `${directoryPath}/output${filename.substring(
                  5,
                  filename.length
                )}`
              ),
              result,
              err => {
                if (err) {
                  throw err
                }
              }
            )
          }
        }
      )
    })
  })
}

readDirectoryAndPrintIntervalls('../data')
