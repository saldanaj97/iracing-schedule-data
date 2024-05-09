import IRacingSDK from "./sdk/iracing-sdk"

async function main() {
  console.log("Testing SDK")
  const sdk = new IRacingSDK("saldanaj97@gmail.com", "JuaSal97!")
  sdk.authenticate()
  //const data = await sdk.getMemberChartData({ chart_type: 2, category_id: 1 })
}
main()
// export * from "./member/member"
// export * from "./results/results"
// export * from "./series/series"
// export * from "./stats/stats"
// export * from "./team/team"
// export * from "./time_attack/timeAttack"
// export * from "./track/track"
