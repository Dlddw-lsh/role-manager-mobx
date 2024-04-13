import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "../component/PrivateRoute";

export default function App() {
  return (
    <Router>
      <PrivateRoute />
    </Router>
  );
}
