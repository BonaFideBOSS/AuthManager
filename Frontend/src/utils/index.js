export function debounce(func, delay = 500) {
  let timer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(context, args), delay)
  }
}

export function canTakeActions(actions = []) {
  var allowed = false
  if (actions.some((action) => action)) allowed = true
  return allowed
}

function convertUTCToLocal(date) {
  const utcDate = new Date(date)
  const localOffset = utcDate.getTimezoneOffset() * 60 * 1000
  const localDate = new Date(utcDate.getTime() - localOffset)
  return localDate
}

export function timelapse(to, from = null) {
  from = from ? new Date(from) : new Date()
  to = convertUTCToLocal(to)

  var timelapse = Math.abs(from - to)

  var mm = timelapse
  var sec = Math.floor(timelapse / 1000)
  var min = Math.floor(timelapse / (1000 * 60))
  var hour = Math.floor(timelapse / (1000 * 60 * 60))
  var day = Math.floor(timelapse / (1000 * 60 * 60 * 24))
  var month = Math.floor(timelapse / (1000 * 60 * 60 * 24 * 30))
  var year = Math.floor(timelapse / (1000 * 60 * 60 * 24 * 30 * 12))

  timelapse = 'just now'
  if (sec >= 1 && sec < 60) {
    let text = sec > 1 ? ' seconds ago' : ' second ago'
    timelapse = sec + text
  } else if (min >= 1 && min < 60) {
    let text = min > 1 ? ' minutes ago' : ' minute ago'
    timelapse = min + text
  } else if (hour >= 1 && hour < 24) {
    let text = hour > 1 ? ' hours ago' : ' hour ago'
    timelapse = hour + text
  } else if (day >= 1 && day < 30) {
    let text = day > 1 ? ' days ago' : ' day ago'
    timelapse = day + text
  } else if (month >= 1 && month < 12) {
    let text = month > 1 ? ' months ago' : ' month ago'
    timelapse = month + text
  } else if (year >= 1) {
    let text = year > 1 ? ' years ago' : ' year ago'
    timelapse = year + text
  }
  return timelapse
}
