import { Link } from "react-router-dom";

export default function Headers() {
  return (
    <>
      <header className="header">
        <img
          src="https://kayumanisresto.com/wp-content/uploads/2022/10/Logo-Kayumanis-Resto-white.png"
          style={{
            width: "20%",
          }}
          alt=""
        />
        <nav className="navbar">
          <Link to="/">home</Link>
          <a href="#about">About</a>
          <a href="#product">Signature</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <div className="fas fa-message" id="cart-btn"></div>
        </div>
      </header>
    </>
  );
}
