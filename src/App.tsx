import { useState, useEffect } from "react";
import Header from "./header";
import Timer from "./Timer";

function App() {
  return (
    <div className="md:h-screen">
      <Header />
      <div className="mt-12 md:flex">
        <div className="w-3/4 mx-auto md:w-1/2">
        </div>
        <div className="w-3/4 mx-auto md:w-1/2">
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App
