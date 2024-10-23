import fs from "node:fs"
import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverity } from "../../domain/entities/log.entity"

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/"
  private readonly allLogsPath = "logs/logs-all.log"
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

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJson)
    if (log.level === LogSeverity.low) return
    if (log.level === LogSeverity.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson)
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson)
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8")
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log))
    return logs
  }

  async getLogs(severityLevel: LogSeverity): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverity.low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverity.medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverity.high:
        return this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error("Invalid log severity level")
    }
  }
}
