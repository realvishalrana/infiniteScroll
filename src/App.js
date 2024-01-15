import { useCallback, useRef, useState } from "react";
import "./App.css";
import InfintieScorll from "./components/InfintieScorll";

function App() {
  const [state, setState] = useState("");
 
  const [data, setData] = useState([]);
  const controllerRef = useRef(null);

  const handleChange = useCallback((e) => {
    setState(e.target.value);
  }, []);

  const getData = useCallback(async (query, pageNumber) => {
    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();
      const response = await fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({ q: query, page: pageNumber }),{
            signal:controllerRef.current.signal
          }
      );
      const data = await response.json();
      setData((prev) => [...prev, ...data.docs]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <>
      <input type="text" value={state} onChange={(e) => handleChange(e)} />
      <InfintieScorll query={state} getData={getData} />
    </>
  );
}

export default App;
