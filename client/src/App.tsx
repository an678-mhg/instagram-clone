import { RouterProvider } from "react-router-dom";
import routers from "./routers";

function App() {
  return (
    <div className="bg-white dark:bg-[#111] transition-colors">
      <RouterProvider router={routers} />
    </div>
  );
}
export default App;
