import { dateParamErrorChecking } from "../src/utils/errorChecking"

describe("Util Functions (dateParamErrorChecking)", () => {
  const currentDate = new Date("2024-05-15T00:00:00Z")

  it("should throw an error if start_range_end is less than start_range_begin", () => {
    const params = {
      start_range_begin: "2024-05-13T00:00:00Z",
      start_range_end: "2024-05-12T00:00:00Z", // One day before start_range_begin
    }
    expect(() => dateParamErrorChecking(params)).toThrow("start_range_end must be greater than start_range_begin.")
  })

  it("should throw an error if start_range_begin is more than 90 days ago and start_range_end is omitted", () => {
    const ninetyOneDaysAgo = new Date(currentDate)
    ninetyOneDaysAgo.setDate(ninetyOneDaysAgo.getDate() - 91) // Adjusted to 91 days ago
    const params = {
      start_range_begin: ninetyOneDaysAgo.toISOString(),
    }

    expect(() => dateParamErrorChecking(params)).toThrow(
      "start_range_begin must be within the last 90 days if start_range_end is omitted."
    )
  })

  it("should throw an error if finish_range_end is less than finish_range_begin", () => {
    const params = {
      finish_range_begin: "2024-05-13T00:00:00Z",
      finish_range_end: "2024-05-12T00:00:00Z", // One day before finish_range_begin
    }
    expect(() => dateParamErrorChecking(params)).toThrow("finish_range_end must be greater than finish_range_begin.")
  })

  it("should throw an error if finish_range_begin is more than 90 days ago and finish_range_end is omitted", () => {
    const ninetyOneDaysAgo = new Date(currentDate)
    ninetyOneDaysAgo.setDate(ninetyOneDaysAgo.getDate() - 91) // Adjusted to 91 days ago
    const params = {
      finish_range_begin: ninetyOneDaysAgo.toISOString(),
    }
    expect(() => dateParamErrorChecking(params)).toThrow(
      "finish_range_begin must be within the last 90 days if finish_range_end is omitted."
    )
  })

  it("should return 'PASS' if all error checks pass", () => {
    const params = {
      start_range_begin: "2024-05-01T00:00:00Z",
      start_range_end: "2024-05-14T00:00:00Z", // One day after currentDate
      finish_range_begin: "2024-05-01T00:00:00Z",
      finish_range_end: "2024-05-14T00:00:00Z", // One day after currentDate
    }
    expect(dateParamErrorChecking(params)).toBe("PASS")
  })
})
