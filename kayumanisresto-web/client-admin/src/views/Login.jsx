import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/thunks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [ input, setInput ] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    const { value, name } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(event) => {
    event.preventDefault()
    await dispatch(login(input))
    navigate("/")
  }


  return (
    <>
      <main className="main-content mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')` }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="#">
                            <i className="fa fa-facebook text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="#">
                            <i className="fa fa-github text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="#">
                            <i className="fa fa-google text-white text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleLogin} role="form" className="text-start">
                      <div className="input-group input-group-outline my-3">
                        <label className="form-label">Email</label>
                        <input value={input.email}
                        onChange={handleChange} 
                        name="email"
                        type="email" className="form-control" />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input value={input.password}
                        onChange={handleChange}
                        name="password"
                        type="password" className="form-control" />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" checked />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn bg-gradient-info w-100 my-4 mb-2">
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
