import * as fs from 'fs'

export default async function createFolder(path: string): Promise<void> {
  fs.mkdir(path, (err) => {
    if (err && err.code != 'EEXIST') {
      return Promise.reject(err)
    }
  })
  return Promise.resolve()
}
