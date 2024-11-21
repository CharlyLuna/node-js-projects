import { LogEntity, LogSeverity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccesCallback = () => void
type ErrorCallback = (err: string) => void
export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service: ${url}`)

      const log = new LogEntity({
        level: LogSeverity.low,
        message: `Service ${url} is up`,
        origin: "check-service.ts",
      })

      this.logRepository.saveLog(log)
      this.successCallback()
      return true
    } catch (err: any) {
      const message = `Error: ${err.message} on url: ${url}`
      const log = new LogEntity({
        level: LogSeverity.high,
        message,
        origin: "check-service.ts",
      })

      this.logRepository.saveLog(log)

      this.errorCallback(message)
      return false
    }
  }
}
