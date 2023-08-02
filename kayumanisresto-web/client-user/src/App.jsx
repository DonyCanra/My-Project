import { RouterProvider } from "react-router-dom";
import router from "../src/routes";
import { Provider } from "react-redux";
import store from "../src/store/index";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
