import { Route, Routes } from "react-router-dom";
import AllContact from "./components/AllContact.jsx";
import Index from "./components/Index.jsx";
import Menu from "./components/Menu.jsx";
import Problem1 from "./components/Problem-1.jsx";
import Problem2 from "./components/Problem-2.jsx";
import USContact from "./components/USContact.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />}>
            <Route path="modal-A" element={<AllContact />} />
            <Route path="modal-B" element={<USContact />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
