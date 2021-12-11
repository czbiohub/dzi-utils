import {Command} from '@oclif/command'
import * as sharp from 'sharp'
import * as path from 'path'
import * as fs from 'fs'
import createFolder from '../utils/createFolder'
import * as cliProgress from 'cli-progress'

export default class Single extends Command {
  static description = 'run multi command for multiple directories'

  static examples = ['$ dzi-utils multidir test_folder test_out_folder']

  static args = [
    {
      name: 'folder',
      required: true,
      description: 'input folder of directories of images',
    },
    {
      name: 'out',
      required: true,
      description: 'output path (folders of .dzi files)',
    },
  ]

  async run() {
    const {args} = this.parse(Single)

    const inputFolder = args.folder
    const outputPath = args.out

    await createFolder(outputPath)

    const loadingBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    )

    const foldersInFolder = await fs.promises.readdir(inputFolder)

    loadingBar.start(foldersInFolder.length, 0)

    for (let i = 0; i < foldersInFolder.length; i++) {
      const folder = foldersInFolder[i]
      if (folder == '.DS_Store') {
        loadingBar.increment()
        continue
      }
      try {
        const folderPath = path.join(inputFolder, folder)
        const filesInFolder = await fs.promises.readdir(folderPath)

        for (let i = 0; i < filesInFolder.length; i++) {
          const file = filesInFolder[i]
          if (file == '.DS_Store') {
            continue
          }
          const fileWithPath = path.join(folderPath, file)
          const fileName = path.parse(file).name
          const outputFolderPath = path.join(outputPath, folder)
          await createFolder(outputFolderPath)
          const dziPath = path.join(outputFolderPath, `${fileName}.dzi`)
          await sharp(fileWithPath, {limitInputPixels: false}).toFile(dziPath)
        }
      } catch (e) {
        loadingBar.stop()
        throw e
      }
      loadingBar.increment()
    }

    loadingBar.stop()
  }
}
