import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Slash from "./components/Slash";
import { AuthContext } from "./context/AuthContext";
import routers from "./routers";
import { getMe } from "./services/auth";

function App() {
  const { setUser, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMe();
        if (response.success) {
          return setUser(response.user);
        }
        return setUser(null);
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  if (typeof user === "undefined") {
    return <Slash />;
  }

  return <RouterProvider router={routers} />;
}
export default App;
