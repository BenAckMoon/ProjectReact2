import { useEffect, useRef } from "react";
import uniqid from "uniqid";
import TextareaAutosize from "react-textarea-autosize";

const Form = (props) => {

  const { setdetailNotes, inputNote, setinputNote } = props;

  const inputValueRef = useRef();

  const handleChangeNote = (e) => {

    const date = new Date();

    const newUserInput = {
      id: uniqid(), status: e.target.value, date: date.toLocaleString("pt-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };

    setinputNote(newUserInput);
  };

  const handleSubmit = () => {
    setdetailNotes((prevState) => {
      return [inputNote, ...prevState];
    });

    inputValueRef.current.value = null;
  };

  useEffect(() => {
    if (inputNote) console.log(inputNote);
  }, [inputNote]);

  return (
    <div className="mainWrapper">
      <TextareaAutosize ref={inputValueRef} className="Notes" type="text" placeholder="Write Something Here" onChange={handleChangeNote} />
      <button className="AddButton" onClick={handleSubmit}> Add </button>
    </div>
  );
};
export default Form;
