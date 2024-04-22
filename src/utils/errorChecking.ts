export const dateParamErrorChecking = ({
  start_range_begin,
  start_range_end,
  finish_range_begin,
  finish_range_end,
}: {
  start_range_begin?: string
  start_range_end?: string
  finish_range_begin?: string
  finish_range_end?: string
}) => {
  // Error checking for start_range_begin and start_range_end
  if (start_range_begin && start_range_end) {
    const startBeginDate = new Date(start_range_begin)
    const startEndDate = new Date(start_range_end)
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    if (startBeginDate >= startEndDate) {
      throw new Error("start_range_end must be greater than start_range_begin.")
    }
    if (startBeginDate < ninetyDaysAgo) {
      throw new Error("start_range_begin must be within the last 90 days if start_range_end is omitted.")
    }
  }

  // Error checking for finish_range_begin and finish_range_end
  if (finish_range_begin && finish_range_end) {
    const finishBeginDate = new Date(finish_range_begin)
    const finishEndDate = new Date(finish_range_end)
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    if (finishBeginDate >= finishEndDate) {
      throw new Error("finish_range_end must be greater than finish_range_begin.")
    }
    if (finishBeginDate < ninetyDaysAgo) {
      throw new Error("finish_range_begin must be within the last 90 days if finish_range_end is omitted.")
    }
  }

  return "PASS"
}
