import nock from "nock"
export const nockHelper = () => {
  nock.disableNetConnect()
  return nock("https://members-ng.iracing.com")
}
