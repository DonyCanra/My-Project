import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashbaord } from "../store/actions/thunks";

export default function Dashboard() {
  const { dashboard } = useSelector((state) => {
    return state.dashboard;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashbaord());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">weekend</i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Today's Items</p>
                  <h4 className="mb-0">{ dashboard.countItem }</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0">
                  <span className="text-success text-sm font-weight-bolder">+55% </span>than last week
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Today's Categories</p>
                  <h4 className="mb-0">{ dashboard.countCategory }</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0">
                  <span className="text-success text-sm font-weight-bolder">+3% </span>than last month
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Today's Users</p>
                  <h4 className="mb-0">{ dashboard.countUser }</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-3">
                <p className="mb-0">
                  <span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
