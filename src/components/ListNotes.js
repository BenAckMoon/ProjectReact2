import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import TextareaAutosize from "react-textarea-autosize";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const modalDesign = {
  content: { top: "50%", left: "50%", right: "auto", bottom: "auto", marginRight: "-50%", transform: "translate(-50%, -50%)", }
};

Modal.setAppElement("#root");

const List = (props) => {
  const [updatedNote, setUpdatedNote] = useState();

  const [showAlert, setShowAlert] = useState(false);

  const { detailNotes, setdetailNotes } = props;


  const pushDelete = (item) => {

    const result = window.confirm("Are you sure to delete this note?");

    if (result) {
      let newList = detailNotes.filter((note) => {

        return note.id !== item.id;
      });

      console.log(newList);

      setdetailNotes(newList);
    }
  };


  useEffect(() => { console.log(detailNotes); }, [detailNotes]);



  const [note, setNote] = useState();

  const [id, setId] = useState();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState();


  function openModal(e) {
    setIsOpen(true); setDate(e.date); setNote(e.status); setId(e.id);
  }

  const pushUpdateNote = (e) => {
    const date = new Date();
    const UserNoteUpdated = {
      id: id, title: e.target.value, date: date.toLocaleString("pt-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    console.log(UserNoteUpdated); setUpdatedNote(UserNoteUpdated);
  };

  const FinalNoteUpdated = () => {
    const index = detailNotes.findIndex((element) =>
      element.id === id),
      setUpdatedNote = [...detailNotes];
    setUpdatedNote[index] = updatedNote;

    setdetailNotes(setUpdatedNote); setShowAlert(true); setIsOpen(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {detailNotes.map((item) => {
        return (
          <div key={item.id} className="Note-Wrapper">
            <div className="Date-Note">{item.date}</div>
            <div className="Status-Note">{item.status}</div>
            <div className="Delete-Wrapper">
              <button className="Delete-Button" onClick={() => pushDelete(item)} >
                <FaTrashAlt />
              </button>
            </div>
            <div className="Edit-Wrapper">
              <button className="Edit-Button" value={item.id} onClick={() => openModal(item)} >
                <FaEdit />
              </button>
              <Modal
                isOpen={modalIsOpen} onRequestClose={closeModal} style={modalDesign} contentLabel="Example Modal" >
                <div className="modalWrapper">
                  <div className="Date-Note">{date}</div>
                  <TextareaAutosize
                    className="statuNote"
                    onChange={pushUpdateNote} >
                    {note}
                  </TextareaAutosize>
                  <button className="Update-Button" onClick={() => FinalNoteUpdated(item)} >
                    <FaCheckCircle />
                    {showAlert && <div className="saved">Saved!</div>}
                  </button>
                  <button className="Close-Button" onClick={closeModal}>
                    <FaWindowClose />
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
