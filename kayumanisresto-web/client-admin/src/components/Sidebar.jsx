import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Logout Success",
    });
  };

  return (
    <>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <a className="navbar-brand m-0" href="# " target="_blank">
            <img src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" className="navbar-brand-img h-100" alt="main_logo" style={{ mixBlendMode: "color-dodge" }} />
            <span className="ms-1 font-weight-bold text-white">Challenge-Part-One</span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Products</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">Categories</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-product" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">view_in_ar</i>
                </div>
                <span className="nav-link-text ms-1">Add Product</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-category" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                </div>
                <span className="nav-link-text ms-1">Add Category</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register-admin" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">notifications</i>
                </div>
                <span className="nav-link-text ms-1">Register Admin</span>
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-link text-white active bg-gradient-info" : "nav-link text-white")}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <span className="nav-link-text ms-1">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">login</i>
                </div>
                <span className="nav-link-text ms-1">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
