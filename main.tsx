import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{padding:40,color:"white",fontSize:24}}>
      EV Charging Optimization Dashboard Running ⚡
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);