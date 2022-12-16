import React from 'react'
import logo from "./../assets/images/atharva-brand-logo-dark.png";
const CreateAccount = () => {
  return (
  <>
   <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[450px]">
        <div className="text-center pb-6">
          <img className="mx-auto" src={logo} alt="Atharva System" />
        </div>
          <div className='card'>
            <div className='card-header text-center'>
              <h3 className='font-[600] text-[26px] text-black'>Create Account</h3>
            </div>
            <div className='card-body'>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                  
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirm_password"
                    className="form-label"
                  >
                    Confirm password
                  </label>
                  <input
                    type="pasconfirm_passwordsword"
                    placeholder="Confirm Password"
                  
                    className="form-control"
                  />
                </div>
                <div className="mt-6">
                  <button className="w-full btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="m-0 text-center pt-3">Already have an account? <a className="text-blue-600 hover:text-blue-700" href="/">Login</a></p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default CreateAccount