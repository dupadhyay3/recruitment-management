import React from 'react'
import { removeToken } from '../Services/LocalStorageService'
const Logout = () => {
  removeToken('token')
  return (
   <>
   alert("logout successfully")
   </>
  )
}

export default Logout