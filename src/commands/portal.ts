import {Command} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'

interface Category {
  name: string
  prefixUrl: string
  tileSources: Array<string>
}

export default class Single extends Command {
  static description = 'create a .json file for tabula portals'

  static examples = [
    '$ dzi-utils portal test_folder https://example.com/crops/1 out.json',
  ]

  static args = [
    {name: 'folder', required: true, description: 'input folder'},
    {
      name: 'prefixUrl',
      required: true,
      description: 'prefix url',
    },
    {
      name: 'out',
      required: true,
      description: 'output path (.json file)',
    },
  ]

  async run() {
    const {args} = this.parse(Single)

    const inputFolder = args.folder
    let prefixUrl = args.prefixUrl

    if (prefixUrl.substr(-1) == '/') {
      prefixUrl = prefixUrl.substring(0, prefixUrl.length - 1)
    }

    const outputPath = args.out

    let finalJson: Array<Category> = []

    const folders = await fs.promises.readdir(inputFolder)

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i]

      if (folder == '.DS_Store') {
        continue
      }

      const categoryPrefixUrl = prefixUrl + '/' + folder

      let tempCategory: Category = {
        name: folder,
        prefixUrl: categoryPrefixUrl,
        tileSources: [],
      }

      const folderPath = path.join(inputFolder, folder)
      const filesInFolder = await fs.promises.readdir(folderPath)

      filesInFolder.forEach((file) => {
        const fileExtension = file.split('.').pop()
        if (fileExtension == 'dzi') {
          tempCategory.tileSources.push(categoryPrefixUrl + '/' + file)
        }
      })

      finalJson.push(tempCategory)
    }

    await fs.promises.writeFile(outputPath, JSON.stringify(finalJson))
  }
}
