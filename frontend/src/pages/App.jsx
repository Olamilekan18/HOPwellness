// import { useState, useEffect } from "react";
// import axios from "axios";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("/api")
  //     .then((response) => setMessage(response.data.message))
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <div>
      <h1 className="text-3xl m-2 font-bold underline">Hello world!</h1>
      <p>Backend says: Hello</p>
    </div>
  );
}

export default App;
