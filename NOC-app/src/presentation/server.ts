import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cron-service"

const logFileSystemRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

export class Server {
  public static start() {
    console.log("Starting server...")

    CronService.createJob("*/10 * * * * *", () => {
      const url = "http://localhost:3000"
      // new CheckService().execute("http://localhost:3000")
      new CheckService(
        logFileSystemRepository,
        () => console.log(url, "have succeded!"),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}
