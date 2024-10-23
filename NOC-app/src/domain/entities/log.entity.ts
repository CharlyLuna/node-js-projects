export enum LogSeverity {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverity
  public message: string
  public createdAt: Date

  constructor(level: LogSeverity, message: string) {
    this.level = level
    this.message = message
    this.createdAt = new Date()
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json)
    if (!level || !message || !createdAt) throw new Error("Invalid log entity")
    const log = new LogEntity(level, message)
    log.createdAt = new Date(createdAt)
    return log
  }
}
