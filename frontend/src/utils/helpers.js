import moment from 'moment'

export const formatDate = (date, format) => {
    return moment(date).format(format)
}

export const getMonth = (date) => {
    return moment(date).format('MMMM') // Full month name
}

export const getDay = (date) => {
    return moment(date).format('dddd') // Full day name
}

export const getDate = (date) => {
    return moment(date).format('DD') // Day of the month
}

export const getYear = (date) => {
    return moment(date).format('YYYY') // Full year
}

export const formatTime12Hour = (date) => {
    return moment(date).format('hh:mm A') // 12-hour format with AM/PM
}

export const formatTime24Hour = (date) => {
    return moment(date).format('HH:mm') // 24-hour format
}

export const formatTime = (timeString) => {
    const time = moment(timeString, 'HH:mm:ss')

    const time12Hour = time.format('hh:mm A') // 12-hour format with AM/PM
    const time24Hour = time.format('HH:mm') // 24-hour format

    return {
        time12Hour,
        time24Hour,
    }
}
