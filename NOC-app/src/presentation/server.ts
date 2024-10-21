import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"

export class Server {
  public static start() {
    console.log("Starting server...")

    CronService.createJob("*/10 * * * * *", () => {
      const url = "https://www.google.com"
      // new CheckService().execute("http://localhost:3000")
      new CheckService(
        () => console.log(url, "have succeded!"),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}
