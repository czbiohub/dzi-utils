import {Command} from '@oclif/command'
import * as sharp from 'sharp'
import * as path from 'path'
import createFolder from '../utils/createFolder'
import * as ora from 'ora'

export default class Single extends Command {
  static description = 'convert a single image to dzi'

  static examples = ['$ dzi-utils single test.tiff']

  static args = [
    {name: 'file', required: true, description: 'input file'},
    {
      name: 'out',
      required: true,
      description: 'output path (.dzi file with a folder)',
    },
  ]

  async run() {
    const {args} = this.parse(Single)

    const inputFile = args.file
    const outputPath = args.out
    const fileName = path.parse(inputFile).name

    await createFolder(outputPath)

    const spinner = ora(`Converting ${inputFile}`).start()

    const dziPath = path.join(outputPath, `${fileName}.dzi`)

    try {
      await sharp(args.file, {limitInputPixels: false}).toFile(dziPath)
    } catch (e) {
      spinner.stop()
      console.error(e)
    }

    spinner.stop()
  }
}
