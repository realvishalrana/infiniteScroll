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

  const renderItem = useCallback(({title}, key, ref) => <div ref={ref} key={key}>{title}</div>)

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
      <input type="text" value={state} onChange={handleChange} />
      <InfintieScorll query={state} listData={data} renderListItem={renderItem} getData={getData} />
    </>
  );
}

export default App;
