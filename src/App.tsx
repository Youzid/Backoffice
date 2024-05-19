import { RouterProvider, } from "react-router-dom";

import RouterComponent from "./Routing/Router";
import RTLComponent from "./rtl/RTLComponent";


const AppRouting = () => {
  return (
    <div className="App animate-slowfade2 overflow-x-hidden font-hind-madurai" >
      <RouterProvider router={RouterComponent()} />
    </div>
  );
};


const App = () => {
  return (
    <div className="App">
      <RTLComponent
        supportedLanguages={["ar"]}
        app={<AppRouting />}
      />
    </div>
  );
};
export default App;
