import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../store/actions/thunks";
import Card from "./Card";

export default function Home() {
  const { menus } = useSelector((state) => {
    // console.log(state, "homeeee");
    return state.menus;
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMenu());
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    <div
      style={{
        fontSize: 14,
        textAlign: "center",
      }}
    >
      Loading...
    </div>;
  } else {
    return (
      <>
        <section className="home" id="home"></section>

        <section className="about" id="about">
          <div className="row">
            <div className="image">
              <img src="https://kayumanisresto.com/wp-content/uploads/2022/10/gallery-venue-1.jpg" alt="" />
            </div>
            <div className="content">
              <h4>About</h4>
              <h3>Kayumanis Resto</h3>
              <p>
                Kayumanis Resto celebrates authentic Indonesian cuisine in the best possible way with a menu that takes guests on a flavourful journey across the archipelago. The venue itself is a customized Javanese joglo designed to
                recreate the cultural nuance of a bygone era. Nestled within a tropical garden, Kayumanis Resto is the perfect spot for an intimate or to dine socially with family and friends.
              </p>
              <a href="#" className="btn">
                More Details
              </a>
            </div>
          </div>
        </section>

        <section className="product" id="product">
          <h1 className="heading">Kayumanis Signature</h1>

          <div className="box-container">
            {menus?.map((menu, index) => {
              return <Card key={index} menu={menu} index={index} />;
            })}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="row">
            <div className="social">
              <img
                src="https://kayumanisresto.com/wp-content/uploads/2022/10/Logo-Kayumanis-Resto_Black.png"
                style={{
                  width: "60%",
                }}
                alt=""
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aperiam consequuntur esse fugiat molestiae nisi dolorum sit sint sunt modi!</p>
            </div>
            <div className="address">
              <p>Jln. Arteri Pondok Indah Hacktiv8, Jakarta Selatan</p>
              <p>0823-2403-4729</p>
              <p>donicanrarofikar@gmail.com</p>
            </div>
            <div style={{ position: "absolute", bottom: 40, right: 90, height: 200, width: "50%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0231985780247!2d106.77912957525982!3d-6.260674361294586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a8713ce207%3A0x2c3ea1f4a28bfac5!2sHacktiv8!5e0!3m2!1sid!2sid!4v1689049243549!5m2!1sid!2sid"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map"
              ></iframe>
            </div>
          </div>
        </section>
      </>
    );
  }
}
