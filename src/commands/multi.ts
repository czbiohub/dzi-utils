import {Command} from '@oclif/command'
import * as sharp from 'sharp'
import * as path from 'path'
import * as fs from 'fs'
import createFolder from '../utils/createFolder'
import * as cliProgress from 'cli-progress'

export default class Single extends Command {
  static description = 'convert multiple images in a folder to dzi'

  static examples = ['$ dzi-utils multi test.tiff']

  static args = [
    {name: 'folder', required: true, description: 'input folder of images'},
    {
      name: 'out',
      required: true,
      description:
        'output path (.dzi files with folders corresponding to them)',
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

    const filesInFolder = await fs.promises.readdir(inputFolder)

    loadingBar.start(filesInFolder.length, 0)

    for (let i = 0; i < filesInFolder.length; i++) {
      const file = filesInFolder[i]
      try {
        const fileWithPath = path.join(inputFolder, file)
        const fileName = path.parse(file).name
        const dziPath = path.join(outputPath, `${fileName}.dzi`)
        await sharp(fileWithPath, {limitInputPixels: false}).toFile(dziPath)
        loadingBar.increment()
      } catch (e) {
        loadingBar.stop()
        throw e
      }
    }

    loadingBar.stop()
  }
}
