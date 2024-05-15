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
  const currentDate = new Date()
  const ninetyDaysAgo = new Date(currentDate)
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  if (start_range_begin && start_range_end) {
    if (!isValidDate(start_range_begin) || !isValidDate(start_range_end)) {
      throw new Error("Invalid date format provided for start_range_begin or start_range_end.")
    }
    const startBeginDate = new Date(start_range_begin)
    const startEndDate = new Date(start_range_end)
    if (startBeginDate >= startEndDate) {
      throw new Error("start_range_end must be greater than start_range_begin.")
    }
  }

  if (start_range_begin && !start_range_end) {
    const startBeginDate = new Date(start_range_begin)
    if (startBeginDate < ninetyDaysAgo) {
      throw new Error("start_range_begin must be within the last 90 days if start_range_end is omitted.")
    }
  }

  if (finish_range_begin && finish_range_end) {
    if (!isValidDate(finish_range_begin) || !isValidDate(finish_range_end)) {
      throw new Error("Invalid date format provided for finish_range_begin or finish_range_end.")
    }
    const finishBeginDate = new Date(finish_range_begin)
    const finishEndDate = new Date(finish_range_end)
    if (finishBeginDate >= finishEndDate) {
      throw new Error("finish_range_end must be greater than finish_range_begin.")
    }
  }

  if (finish_range_begin && !finish_range_end) {
    const finishBeginDate = new Date(finish_range_begin)
    if (finishBeginDate < ninetyDaysAgo) {
      throw new Error("finish_range_begin must be within the last 90 days if finish_range_end is omitted.")
    }
  }

  return "PASS"
}

const isValidDate = (dateString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/ // ISO 8601 format without milliseconds and UTC timezone
  return regex.test(dateString) && !isNaN(Date.parse(dateString))
}
