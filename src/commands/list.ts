import {Command} from '@oclif/command'
import * as fs from 'fs'

interface Category {
  name: string
  prefixUrl: string
  tileSources: Array<string>
}

export default class Single extends Command {
  static description =
    'export a csv with a list of dzi file names, from a json exported from the "mutli" command'

  static examples = ['$ dzi-utils list test.json out.csv']

  static args = [
    {name: 'jsonFile', required: true, description: 'json file'},
    {
      name: 'out',
      required: true,
      description: 'output path (.csv file)',
    },
  ]

  async run() {
    const {args} = this.parse(Single)

    const jsonFile = args.jsonFile
    const outputPath = args.out

    const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))

    // Check if CSV file exists
    fs.stat(outputPath, (err) => {
      if (!err) {
        // It exists
        fs.unlinkSync(outputPath)
      }
    })

    const csvFile = fs.createWriteStream(outputPath)

    jsonData.forEach((category: Category) => {
      category.tileSources.forEach((tileSource) => {
        const fileName = tileSource.split('/')[tileSource.split('/').length - 1]
        csvFile.write(fileName)
        csvFile.write('\n')
      })
    })

    csvFile.close()
  }
}
