import { promises as fsPromises } from 'fs'
import path from 'path'

import {
  Unavailability,
  getAvailabilityInterval,
  getSortedUnavailabilities,
  groupUnavailabilitiesByDay,
} from './unavailability.ts'

const inputRegex = /input[1-9]+.txt/

export const readDirectoryAndPrintIntervalls = async (
  directoryPath: string
) => {
  const filesToCreate: Array<Promise<void>> = []
  const fileNames = await fsPromises.readdir(
    path.resolve(__dirname, directoryPath),
    'utf-8'
  )
  fileNames.forEach(async (filename: string) => {
    if (!filename.match(inputRegex)) {
      return
    }

    const data = await fsPromises.readFile(
      path.resolve(__dirname, `${directoryPath}/${filename}`),
      'utf-8'
    )
    const availabilities: Array<Unavailability> = getSortedUnavailabilities(
      data
    )

    const groupedAvailabilities: Record<
      string,
      Array<Unavailability>
    > = groupUnavailabilitiesByDay(availabilities)

    const result = getAvailabilityInterval(groupedAvailabilities)

    if (result) {
      filesToCreate.push(
        fsPromises.writeFile(
          path.resolve(
            __dirname,
            `${directoryPath}/output${filename.substring(5)}`
          ),
          result,
          { flag: 'w', encoding: 'utf-8' }
        )
      )
    }
  })

  await Promise.all(filesToCreate)
}

readDirectoryAndPrintIntervalls('../data')
