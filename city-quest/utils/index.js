const convertTime = (timems) => {
  const convert = {
    minute: 60000
  }
  let minutes = ''
if (timems >= convert.minute) {
    minutes = Math.floor(timems / convert.minute) > 1 ? `${Math.floor(timems / convert.minute)} minutes` : `${Math.floor(timems / convert.minute)} minute`
    return `${minutes}`
  }
}

export default convertTime;