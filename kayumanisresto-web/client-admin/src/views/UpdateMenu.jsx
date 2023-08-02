import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailMenu, updateMenu, fetchCategory } from "../store/actions/thunks";

export default function FormMenu() {
  const { menu } = useSelector((state) => {
    console.log(state, "<<<update menu");
    return state.menu;
  });

  const { categories } = useSelector((state) => {
    return state.categories;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    CategoryId: "",
  });

  console.log(menu, "<<<menu");
  useEffect(() => {
    if (menu) {
      setInput({
        name: menu.name,
        description: menu.description,
        price: menu.price,
        imgUrl: menu.imgUrl,
        CategoryId: menu.CategoryId,
      });
    }
  }, [menu]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  console.log(input, "<<<input");

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(detailMenu(id));
  }, [dispatch]);

  const handleUpdateMenu = (event) => {
    event.preventDefault();
    dispatch(updateMenu(input, id));
    navigate("/product");
  };

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-product-section">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-6">Form Edit Menu</h1>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <form onSubmit={handleUpdateMenu} id="product-form">
              <div className="mb-3">
                <label htmlFor="product-name">
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" id="product-name" />
              </div>

              <div className="mb-3">
                <label htmlFor="product-desc">
                  Description <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.description} onChange={handleChange} name="description" type="text" className="form-control" id="product-desc" />
              </div>

              <div className="mb-3">
                <label htmlFor="product-price">
                  Price <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.price} onChange={handleChange} name="price" type="number" className="form-control" id="product-price" />
              </div>

              <div className="mb-3">
                <label htmlFor="product-image">
                  Image <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.imgUrl} onChange={handleChange} name="imgUrl" type="text" className="form-control" id="product-image" />
              </div>

              <div className="mb-3">
                <label htmlFor="product-category">
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select value={input.CategoryId} onChange={handleChange} name="CategoryId" id="product-category" className="form-select">
                  <option value={""} disabled>
                    -- Select Category --
                  </option>
                  {categories?.map((category, index) => {
                    return (
                      <option key={index} category={category} index={index} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <a className="btn btn-lg btn-outline-dark rounded-pill w-100 p-2" href="">
                    Cancel
                  </a>
                </div>
                <div className="col-6">
                  <button className="btn btn-lg btn-info rounded-pill w-100 p-2" type="submit" href="">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
