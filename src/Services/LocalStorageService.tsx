
const storeToken = (value:any) => {
    localStorage.setItem('token', value)
  }
  
  const getToken = () => {
    let token = localStorage.getItem('token')
    return token
  }
  
  const removeToken = (value:any) => {
    localStorage.removeItem(value)
  }
  
  export { storeToken, getToken, removeToken }
  