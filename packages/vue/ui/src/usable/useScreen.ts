export default () => ({
  is: {
    mobile: () => {
      return window.innerWidth < 768
    }
  }
})