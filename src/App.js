import "normalize.css";
import { FormOverview } from "./components/Form";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "24px",
        padding: "24px",
        margin: "16px 0px",
      }}
    >
      <FormOverview />
    </div>
  );
};

export default App;
