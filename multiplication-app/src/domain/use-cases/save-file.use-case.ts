import fs from "node:fs"

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

interface SaveFileOptions {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: SaveFileOptions) {
    try {
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
      return true
    } catch (error) {
      // console.log(error)
      return false
    }
  }
}
