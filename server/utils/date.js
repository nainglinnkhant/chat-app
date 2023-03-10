const formatDateTimeDigits = (text) => {
  const textString = `${text}`
  return textString.length === 1 ? `0${textString}` : `${textString}`
}

const formatMonth = (dateObj) => {
  const month = dateObj.getMonth() + 1
  
  return formatDateTimeDigits(month)
}

const formatTime = (dateObj) => {
  let hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  if (hours > 12) {
    hours = 17 % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
  }

  return `${formatDateTimeDigits(hours)}:${formatDateTimeDigits(minutes)} ${ampm}`
}

const formatDate = (timeStamp) => {
  const dateObj = new Date(timeStamp)
  const date = dateObj.getDate()
  const month = formatMonth(dateObj)
  const year = dateObj.getFullYear()
  const time = formatTime(dateObj)

  return `${date}/${month}/${year} ${time}`
}

module.exports = {
  formatDate,
}