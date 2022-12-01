import React from 'react'

const ResetPassword = () => {
  return (
   <>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Reset Password
          </h1>
          <form  className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="Password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="Password"
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2 flex items-center justify-start">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 text-neutral-600 focus:ring-neutral-500
                  border-gray-300 rounded"
               
              ></input>
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm font-semibold text-gray-800"
              >
                Remember me
              </label>
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-5">
            <div className="text-sm">
              <a
                href="http://localhost:3000/CreateAccount"
                className="font-medium text-neutral-600 hover:underline"
              >
                Create an Account?
              </a>
            </div>
            <div className="text-sm">
              <a
                href="http://localhost:3001/ForgetPassword"
                className="font-medium text-neutral-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
   <label>Password</label>
   <input type="password"></input>
   <label>confirm password</label>
   <input type="password"></input>

   <button type='submit'> submit</button>
   </>
  )
}

export default ResetPassword