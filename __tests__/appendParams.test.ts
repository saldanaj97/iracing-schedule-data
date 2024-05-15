import { appendParams } from "../src/utils/appendParams"

describe("Util Functions (appendParams)", () => {
  it("should append parameters to the URL", () => {
    const URL = "https://example.com"
    const params = {
      param1: "value1",
      param2: 123,
      param3: true,
      param4: undefined,
    }
    const expectedURL = "https://example.com&param1=value1&param2=123&param3=1"
    const result = appendParams(URL, params)
    expect(result).toBe(expectedURL)
  })

  it("should handle boolean parameters correctly", () => {
    const URL = "https://example.com"
    const params = {
      param1: true,
      param2: false,
    }
    const expectedURL = "https://example.com&param1=1&param2=0"
    const result = appendParams(URL, params)
    expect(result).toBe(expectedURL)
  })

  it("should handle undefined parameters correctly", () => {
    const URL = "https://example.com"
    const params = {
      param1: "value1",
      param2: undefined,
    }
    const expectedURL = "https://example.com&param1=value1"
    const result = appendParams(URL, params)
    expect(result).toBe(expectedURL)
  })
})
