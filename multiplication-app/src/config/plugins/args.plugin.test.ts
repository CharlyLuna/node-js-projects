// import { yarg } from "./args.plugin"

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]
  const { yarg } = await import("./args.plugin")
  return yarg
}

describe("Tests on args plugin", () => {
  beforeEach(() => {
    process.argv = process.argv.slice(0, 2)
    jest.resetModules()
  })

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    )
  })
  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "10",
      "-s",
      "-l",
      "12",
      "-n",
      "table-10",
      "-d",
      "outputs/tables",
    ])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 12,
        s: true,
        n: "table-10",
        d: "outputs/tables",
      })
    )
  })
})
