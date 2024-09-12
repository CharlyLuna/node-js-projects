import fs from "node:fs"
import { yarg } from "./config/plugins/args.plugin"

const { b: base, l: limit, s: showTable } = yarg

const message = `la multiplicacion`
let outputMessage = ""

const header = `
==============================
====   TABLA DEL ${base}  ====
============================== \n
`

for (let i = 0; i <= limit; i++) {
  outputMessage += `${message} ${base}x${i} = ${base * i}\n`
}

outputMessage = header + outputMessage
if (showTable) console.log(outputMessage)

const outputPath = `outputs/test-folder`

try {
  fs.mkdirSync(outputPath, { recursive: true })
  fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage)
  console.log("File created")
} catch (error) {
  console.log(error)
}
