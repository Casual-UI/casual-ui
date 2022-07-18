export default (func: (...params: any) => any, timeout = 300) => {
  let timer: any
  return (...params: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...params)
    }, timeout)
  }
}
