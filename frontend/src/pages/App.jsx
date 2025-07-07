import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl m-2 font-bold underline">Hello world!</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
