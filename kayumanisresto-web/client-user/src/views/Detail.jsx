import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailMenu } from "../store/actions/thunks";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { menu } = useSelector((state) => {
    console.log(state, "<<stat");
    return state.detail;
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(detailMenu(id));
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
      <section className="detail" id="detail">
        <div className="row">
          <div className="image">
            <img src={menu.imgUrl} alt="" />
          </div>
          <div className="content">
            <h4>Category: {menu.Category?.name}</h4>
            <h3>{menu.name}</h3>
            <p>by: {menu.User?.username}</p>
            <p>{menu.description}</p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium perspiciatis veritatis ducimus eius explicabo natus enim quasi accusamus consequatur molestiae est, minima ad odio, sed animi laboriosam. Veritatis
              asperiores fugit voluptatum accusamus tempora tenetur, autem distinctio, quo maiores, ipsum nulla ea corrupti eos unde! Harum porro sunt culpa aliquid earum?
            </p>
            <a href="#" className="btn">
              Ingredients: {menu.Ingredients}
            </a>
          </div>
        </div>
      </section>
    );
  }
}
