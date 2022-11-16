import "./App.css";
import { useEffect, useState } from "react";
import Form from "./components/FormNote";
import Title from "./components/Title";
import List from "./components/ListNotes";


function App() {
  const [inputNote, setinputNote] = useState();
  const [detailNotes, setdetailNotes] = useState([]);

  useEffect(() => {
    console.log(detailNotes);
  }, [detailNotes]);
  return (
    <>
      <div className="App">
        <Title />
        <Form setdetailNotes={setdetailNotes} inputNote={inputNote} setinputNote={setinputNote} />
      </div>
      <List detailNotes={detailNotes} setdetailNotes={setdetailNotes} />
    </>
  );
}

export default App;
