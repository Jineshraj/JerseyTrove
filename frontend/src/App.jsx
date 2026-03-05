//FONTS
import "@fontsource/dm-sans"; // Defaults to weight 400
import "@fontsource/dm-sans/700.css"; // Bold
import "@fontsource/dm-sans/900.css"; // Black

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </Router>
  );
};

export default App;
