import dayjs from 'dayjs'

const weekDayMap = {
  Monday: '星期一',
  Tuesday: '星期二',
  Wednesday: '星期三',
  Thursday: '星期四',
  Friday: '星期五',
  Saturday: '星期六',
  Sunday: '星期日',
}

export function formatDate(date: string | Date | undefined | null, template = 'YYYY/MM/DD') {
  if (!date) {
    return ''
  }

  const formattedDate = dayjs(date).format(template)

  if (template.includes('dddd')) {
    const weekDay = dayjs(date).format('dddd') as keyof typeof weekDayMap
    const twWeekDay = weekDayMap[weekDay]
    return formattedDate.replace(weekDay, twWeekDay)
  }

  return formattedDate
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
