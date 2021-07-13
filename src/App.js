import "./App.css";
import { BrowserRouter } from "react-router-dom";

import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
