import React, { useRef } from 'react'
import IMG from '../src/assets/images.png'

export const Login = ({ user }) => {
  const myUname = useRef(null)

  const handle = (e) => {
    e.preventDefault();
    console.log(myUname.current.value); // logs the email
    user(myUname.current.value)          // sends value back to parent
  }

  return (
    <div className='container '>
      <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100">
        <main className="form-signin w-100 my-2 mx-5 m-auto">
          <form onSubmit={handle} >
            <img
              className="mb-4"
              src={IMG}
              alt="Bootstrap Logo"
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                ref={myUname}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            

            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
            <p className="mt-2 mb-1 text-body-secondary">© 2017–2025</p>
          </form>
        </main>
      </div>
    </div>
  )
}
