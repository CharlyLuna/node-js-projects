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
}
