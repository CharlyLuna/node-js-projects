import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"
import { ServerApp } from "./server-app"

describe("Tests on server app", () => {
  const options = {
    base: 5,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-file",
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("should create server app instance", () => {
    const serverApp = new ServerApp()

    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe("function")
  })

  // test("should run ServerApp with options", () => {
  //   const logSpy = jest.spyOn(console, "log")
  //   const createTableSpy = jest.spyOn(CreateTable.prototype, "execute")
  //   const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute")

  //   ServerApp.run(options)

  //   expect(logSpy).toHaveBeenCalledTimes(2)
  //   expect(logSpy).toHaveBeenCalledWith("Server running")
  //   expect(logSpy).toHaveBeenLastCalledWith("File created")
  //   expect(createTableSpy).toHaveBeenCalledTimes(1)
  //   expect(createTableSpy).toHaveBeenCalledWith({
  //     base: options.base,
  //     limit: options.limit,
  //   })
  //   expect(saveFileSpy).toHaveBeenCalledTimes(1)
  //   expect(saveFileSpy).toHaveBeenCalledWith({
  //     fileContent: expect.any(String),
  //     fileDestination: options.fileDestination,
  //     fileName: options.fileName,
  //   })
  // })
  test("should run with custom values mocked", () => {
    const logMock = jest.fn()
    const createMock = jest.fn().mockReturnValue("1 x 1 = 1")
    const saveFileMock = jest.fn().mockReturnValue(false)

    console.log = logMock
    CreateTable.prototype.execute = createMock
    SaveFile.prototype.execute = saveFileMock

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledWith("Server running")
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    })
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 1 = 1",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    })
    expect(logMock).toHaveBeenCalledWith("File created")
  })
})
