import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

//FONTS
import "@fontsource/dm-sans"; // Defaults to weight 400
import "@fontsource/dm-sans/700.css"; // Bold
import "@fontsource/dm-sans/900.css"; // Black

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
