import dayjs from 'dayjs'

export function formatDate(date: string | Date | undefined | null, template = 'YYYY/MM/DD') {
  if (!date) {
    return ''
  }
  return dayjs(date).format(template)
}

export function diffDays(date1: string | Date | undefined | null, date2: string | Date | undefined | null, absolute: boolean = true) {
  if (!date1 || !date2) {
    return 0
  }
  const diff = dayjs(date1).diff(dayjs(date2), 'day')
  return absolute ? Math.abs(diff) : diff
}

export function addDays(date: string | Date, days: number) {
  return dayjs(date).add(days, 'day').toDate()
}

export function addYears(date: string | Date, years: number) {
  return dayjs(date).add(years, 'year').toDate()
}
