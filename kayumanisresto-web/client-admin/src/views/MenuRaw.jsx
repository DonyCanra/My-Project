import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMenu } from "../store/actions/thunks";
import formatDate from "../../helpers/formatDate";

export default function MenuRaw({ menu }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteMenu = async(event, id) => {
    console.log(event, "<<<<");
    event.preventDefault()
    dispatch(deleteMenu(id))
    navigate("/product")
  }

  const handleDetailMenu = async (event, id) => {
    console.log(event, "<<<<");
    event.preventDefault();
    navigate(`/edit-product/${id}`);
  };

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img src={menu.User.photoUser} className="avatar avatar-sm me-3 border-radius-lg" alt="user6" />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">{menu.User.username}</h6>
              <p className="text-xs text-secondary mb-0">{menu.User.email}</p>
            </div>
          </div>
        </td>
        <td
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <img
            src={menu.imgUrl}
            alt=""
            style={{
              height: "10%",
              width: "10%",
            }}
          />
          <div>
            <p className="text-xs font-weight-bold mb-0">{menu.name}</p>
            <p className="text-xs text-secondary mb-0">Rp. {menu.price}</p>
          </div>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">{menu.status}</span>
        </td>
        <td className="align-middle text-center text-sm">
          <span className="text-secondary text-xs font-weight-bold">{formatDate(menu.createdAt)}</span>
        </td>
        <td className="align-middle text-center">
          <a onClick={(e) => handleDetailMenu(e, menu.id)}  href="#" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
            <i className="fa fa-edit me-sm-1"></i>
          </a>
          <a onClick={e => handleDeleteMenu(e, menu.id) } href="#" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
            <i className="fa fa-trash me-sm-1"></i>
          </a>
        </td>
      </tr>
    </>
  );
}
