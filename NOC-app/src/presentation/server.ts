import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"

export class Server {
  public static start() {
    console.log("Starting server...")

    CronService.createJob("*/10 * * * * *", () => {
      new CheckService().execute("https://www.google.com")
    })
  }
}
