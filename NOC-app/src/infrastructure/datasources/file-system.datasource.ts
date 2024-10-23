import fs from "node:fs"
import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverity } from "../../domain/entities/log.entity"

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/"
  private readonly allLogsPath = "logs/logs-low.log"
  private readonly mediumLogsPath = "logs/logs-medium.log"
  private readonly highLogsPath = "logs/logs-high.log"

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    ;[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) fs.writeFileSync(path, "")
      }
    )
  }

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.")
  }
  getLogs(severityLevel: LogSeverity): Promise<LogEntity[]> {
    throw new Error("Method not implemented.")
  }
}
