/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { promises as fsPromises } from 'fs'
import path from 'path'

import { readDirectoryAndPrintIntervalls } from '../src/main'

const directoryPath = '../data'

const data: {
  [index: string]: string
} = {
  'output1.txt': '1 13:00-13:59',
  'output2.txt': '2 08:00-08:59',
  'output3.txt': '2 08:00-08:59',
  'output4.txt': '2 12:29-13:28',
  'output5.txt': '3 13:18-14:17',
}

beforeAll(async () => {
  for (const key in data) {
    await fsPromises.unlink(path.resolve(__dirname, `${directoryPath}/${key}`))
  }
})

describe('main-e2e', () => {
  test('readDirectoryAndPrintIntervalls should create files with correct value', async () => {
    await readDirectoryAndPrintIntervalls(directoryPath)

    for (const key in data) {
      const result = await fsPromises.readFile(
        path.resolve(__dirname, `${directoryPath}/${key}`),
        'utf-8'
      )

      expect(data[key]).toEqual(result)
    }
  })
})
