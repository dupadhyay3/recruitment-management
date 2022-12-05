import React from 'react'

const CreateAccount = () => {
  return (
  <>
   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-neutral-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-neutral-700 uppercase">
            Create Account
          </h1>
          <form  className="mt-6">
          <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="name"
                
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                
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
            <div className="mb-2">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-gray-800"
              >
                confirm password
              </label>
              <input
                type="pasconfirm_passwordsword"
                placeholder="confirm_password"
               
                className="block w-full px-4 py-2 mt-2 text-neutral-700 bg-white border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateAccount