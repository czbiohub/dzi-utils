import {Command} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'

async function searchForExt(
  inputFolder: string,
  extension: string,
  finalList: Array<string>
): Promise<Array<string>> {
  const filesInFolder = await fs.promises.readdir(inputFolder)

  for (let i = 0; i < filesInFolder.length; i++) {
    const file = filesInFolder[i]
    const location = path.join(inputFolder, file)

    // Check if the current file we are looking at
    // is a file or a folder
    const stat = await fs.promises.lstat(location)
    const isFile = stat.isFile()

    if (isFile) {
      if (path.extname(file) == '.jpg') {
        finalList.push(file)
      }
    } else {
      searchForExt(location, extension, finalList)
    }
  }

  return finalList
}

export default class Single extends Command {
  static description =
    'export csvs to list all dzi files found in a folder, recursively'

  static examples = ['$ dzi-utils list test_folder out.csv']

  static args = [
    {name: 'folder', required: true, description: 'input folder'},
    {
      name: 'out',
      required: true,
      description: 'output path (.csv file)',
    },
  ]

  async run() {
    const {args} = this.parse(Single)

    const inputFolder = args.folder
    const outputPath = args.out

    const finalList: Array<string> = []

    await searchForExt(inputFolder, '.dzi', finalList)

    // Check if CSV file exists
    fs.stat(outputPath, (err) => {
      if (!err) {
        // It exists
        fs.unlinkSync(outputPath)
      }
    })

    const csvFile = fs.createWriteStream(outputPath)

    finalList.forEach((line) => {
      csvFile.write(line)
      csvFile.write('\n')
    })

    csvFile.close()
  }
}
