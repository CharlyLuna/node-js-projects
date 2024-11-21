export enum LogSeverity {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverity
  message: string
  createdAt?: Date
  origin: string
}

export class LogEntity {
  public level: LogSeverity
  public message: string
  public createdAt: Date
  public origin: string

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options
    this.level = level
    this.message = message
    this.createdAt = createdAt
    this.origin = origin
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json)
    if (!level || !message || !createdAt) throw new Error("Invalid log entity")
    const log = new LogEntity({ level, message, createdAt, origin })
    return log
  }
}
