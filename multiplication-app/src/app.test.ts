import { ServerApp } from "./presentation/server-app"

describe("Test on App", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn()
    ServerApp.run = serverRunMock
    process.argv = ["node", "app.ts", "-b", "5", "-l", "5", "-n", "test-table"]

    await import("./app")

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 5,
      showTable: false,
      fileDestination: "outputs",
      fileName: "test-table",
    })
  })
})
