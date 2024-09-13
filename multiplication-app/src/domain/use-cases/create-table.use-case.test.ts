import { CreateTable } from "./create-table.use-case"
describe("Tests on CreateTable use case", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable()

    const table = createTable.execute({ base: 2 })
    const rows = table.split("\n").length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain("2x1 = 2")
    expect(table).toContain("2x10 = 20")
    expect(rows).toBe(10)
  })
  test("should create the table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    }

    const createTable = new CreateTable()

    const table = createTable.execute(options)
    const rows = table.split("\n").length

    expect(table).toContain("3x1 = 3")
    expect(table).toContain("3x10 = 30")
    expect(table).toContain("3x20 = 60")
    expect(rows).toBe(options.limit)
  })
})
