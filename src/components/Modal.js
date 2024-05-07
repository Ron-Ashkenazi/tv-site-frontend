import { forwardRef, useImperativeHandle, useRef } from "react";
import "./Modal.css";

const Modal = forwardRef(({ children }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return (
    <dialog className="modal-dialog" ref={dialog}>
      {children}
      <form className="form-dialog" method="dialog">
        <button
          className="dialog-close-button"
          onClick={() => dialog.current.close()}
        >
          Close
        </button>
      </form>
    </dialog>
  );
});

export default Modal;
