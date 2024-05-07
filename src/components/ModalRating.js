import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./Modal.css";
import RatingEditorModal from "./RatingEditorModal";

const ModalRating = forwardRef((props, ref) => {
  const dialog = useRef();
  const [key, setKey] = useState(0);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
      setKey((prevKey) => prevKey + 1);
    },
  }));

  return (
    <dialog className="modal-dialog" ref={dialog}>
      <RatingEditorModal
        key={key}
        handleRateButton={props.handleRateButton}
        handleRemoveRateButton={props.handleRemoveRateButton}
        receivedRating={props.receivedRating}
      />
      <form className="form-dialog" method="dialog">
        <button
          className="dialog-close-button"
          onClick={() => ref.current.close()}
        >
          Close
        </button>
      </form>
    </dialog>
  );
});

export default ModalRating;
