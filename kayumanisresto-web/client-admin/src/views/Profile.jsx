import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/actions/thunks";

export default function Profile() {
  const { users } = useSelector((state) => {
    console.log(state, "<<<users");
    return state.users;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid px-2 px-md-4">
        <div
          className="page-header min-height-300 border-radius-xl mt-4"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
          }}
        >
          <span className="mask bg-gradient-info opacity-6"></span>
        </div>
        <div className="card card-body mx-3 mx-md-4 mt-n6">
          <div className="row gx-4 mb-2">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                <img src={users.photoUser} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
              </div>
            </div>

            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1">{ users.username}</h5>
                <p className="mb-0 font-weight-normal text-sm">Senior Web Developer</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-12 col-xl-4">
                <div className="card card-plain h-100">
                  <div className="card-header pb-0 p-3">
                    <h6 className="mb-0">Platform Settings</h6>
                  </div>
                  <div className="card-body p-3">
                    <h6 className="text-uppercase text-body text-xs font-weight-bolder">Account</h6>
                    <ul className="list-group">
                      <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault" checked />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault">
                            Email me when someone follows me
                          </label>
                        </div>
                      </li>
                      <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault1" />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault1">
                            Email me when someone answers on my post
                          </label>
                        </div>
                      </li>
                      <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault2" checked />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault2">
                            Email me when someone mentions me
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">Application</h6>
                    <ul className="list-group">
                      <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault3" />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault3">
                            New launches and projects
                          </label>
                        </div>
                      </li>
                      <li className="list-group-item border-0 px-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault4" checked />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault4">
                            Monthly product updates
                          </label>
                        </div>
                      </li>
                      <li className="list-group-item border-0 px-0 pb-0">
                        <div className="form-check form-switch ps-0">
                          <input className="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault5" />
                          <label className="form-check-label text-body ms-3 text-truncate w-80 mb-0" htmlFor="flexSwitchCheckDefault5">
                            Subscribe to newsletter
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="card card-plain h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-md-8 d-flex align-items-center">
                        <h6 className="mb-0">Profile Information</h6>
                      </div>
                      <div className="col-md-4 text-end">
                        <a href="#">
                          <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <p className="text-sm">
                      Hi, I’m { users.username }, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                    </p>
                    <hr className="horizontal gray-light my-4" />
                    <ul className="list-group">
                      <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                        <strong className="text-dark">Username:</strong> &nbsp; { users.username}
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Mobile:</strong> &nbsp; (+62) 82224034729
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Email:</strong> &nbsp; { users.email}
                      </li>
                      <li className="list-group-item border-0 ps-0 text-sm">
                        <strong className="text-dark">Location:</strong> &nbsp; { users.address}
                      </li>
                      <li className="list-group-item border-0 ps-0 pb-0">
                        <strong className="text-dark text-sm">Social:</strong> &nbsp;
                        <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                          <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                          <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="#">
                          <i className="fab fa-instagram fa-lg"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
