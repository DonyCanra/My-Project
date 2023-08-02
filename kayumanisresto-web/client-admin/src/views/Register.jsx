import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../store/actions/thunks";

export default function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    photoUser: "",
    address: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(registerAdmin(input));
    navigate("/");
  };

  return (
    <>
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-info h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1583354608715-177553a4035e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')`,
                      backgroundSize: `cover`,
                    }}
                  ></div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div className="card card-plain">
                    <div className="card-header">
                      <h4 className="font-weight-bolder">Register Admin</h4>
                      <p className="mb-0">Enter your email and password to register</p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleRegister} role="form">
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label">Username</label>
                          <input value={input.username} onChange={handleChange} name="username" type="text" className="form-control" />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label">Email</label>
                          <input value={input.email} onChange={handleChange} name="email" type="email" className="form-control" />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label">Password</label>
                          <input value={input.password} onChange={handleChange} name="password" type="password" className="form-control" />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label">photoUser</label>
                          <input value={input.photoUser} onChange={handleChange} name="photoUser" type="text" className="form-control" />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <label className="form-label">Address</label>
                          <input value={input.address} onChange={handleChange} name="address" type="text" className="form-control" />
                        </div>
                        <div className="form-check form-check-info text-start ps-0">
                          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            {" "}
                            I agree the{" "}
                            <a href="#" className="text-dark font-weight-bolder">
                              Terms and Conditions
                            </a>{" "}
                          </label>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0">
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
