import { useDispatch } from "react-redux";
import { detailMenu } from "../store/actions/thunks";
import { useNavigate } from "react-router-dom";

export default function Card({ menu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailMenu = async (event, id) => {
    console.log(event, "<<<<");
    event.preventDefault();
    dispatch(detailMenu(id));
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="box">
        <div className="image">
          <img src={menu.imgUrl} alt="" />
        </div>
        <div className="content">
          <h3>{menu.name}</h3>
          <div className="desc">
            <p>{menu.description}</p>
            <a onClick={(e) => handleDetailMenu(e, menu.id)}>detail</a>
          </div>
        </div>
      </div>
    </>
  );
}
