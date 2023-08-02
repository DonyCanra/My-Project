import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuRaw from "./MenuRaw";
import { fetchMenu } from "../store/actions/thunks";

export default function TableMenu() {
  const { menus } = useSelector((state) => {
    return state.menus;
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMenu());
    setLoading(false)
  }, [dispatch]);

  if (loading) {
    <div style={{
      fontSize:14,
      textAlign: "center"
    }}>Loading...</div>;
  } else {
    return (
      <>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">Products</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Author</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created</th>
                          <th className="text-secondary opacity-7">Action</th>
                        </tr>
                      </thead>
                      <tbody id="products-table">
                        {menus?.map((menu, index) => {
                          return <MenuRaw key={index} menu={menu} index={index} />;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
