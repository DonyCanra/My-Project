import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailCategory, updateCategory } from "../store/actions/thunks";

export default function FormCategory() {
  const { category } = useSelector((state) => {
    console.log(state, "<<<update category");
    return state.category
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  console.log(category, "<<<category");

  const [input, setInput] = useState({
    imgUrl: "",
    name: "",
  });
  
    useEffect(() => {
      if (category) {
          setInput({ 
             imgUrl: category.imgUrl,
             name: category.name
          })
       }
     }, [category])

  console.log(input, "<<<input");


  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(detailCategory(id))
  }, [dispatch])
  
  const handleUpdateCategory = (event) => {
    event.preventDefault();
    dispatch(updateCategory(input, id));
    navigate("/category");
  };

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="new-category-section">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-6">Form Edit Category</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <form onSubmit={handleUpdateCategory} id="category-form">
              <div className="mb-3">
                <label htmlFor="category-name">
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" id="category-name" placeholder="Enter category name" />
              </div>
              <div className="mb-3">
                <label htmlFor="category-name">
                  imgUrl <span className="text-danger fw-bold">*</span>
                </label>
                <input value={input.imgUrl} onChange={handleChange}  name="imgUrl" type="text" className="form-control" id="category-name" placeholder="Enter category image" />
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
