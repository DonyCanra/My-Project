import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../store/actions/thunks";

export default function CategoryRaw({ category }) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCategory = async (event, id) => {
    event.preventDefault();
    dispatch(deleteCategory(id));
    navigate("/category");
  };

  const handleDetailCategory = async (event, id) => {
    event.preventDefault();
    navigate(`/edit-category/${id}`);
  };

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <p className="text-xs text-secondary mb-0">#{category.id}</p>
            </div>
            <div>
              <img
                src="https://photo2.foodgawker.com/wp-content/uploads/2020/12/3673283.jpg"
                alt="user6"
                style={{
                  height: "100%",
                  width: "20%",
                }}
              />
            </div>
          </div>
        </td>
        <td>
          <p className="text-xs font-weight-bold mb-0">{category.name}</p>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">12</span>
        </td>
        <td className="align-middle text-center text-sm">
          <a onClick={(e) => handleDetailCategory(e, category.id)} href="#" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
            <i className="fa fa-edit me-sm-1"></i>
          </a>
          <a onClick={(e) => handleDeleteCategory(e, category.id)} href="#">
            <span className="badge badge-sm bg-gradient-danger">Delete</span>
          </a>
        </td>
      </tr>
    </>
  );
}
