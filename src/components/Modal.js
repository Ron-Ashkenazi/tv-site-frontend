import { forwardRef, useImperativeHandle, useRef } from "react";
import "./Modal.css";

const Modal = forwardRef(({ children }, ref) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return (
    <dialog className="modal-dialog" ref={dialog}>
      {children}
      <form className="form-dialog" method="dialog">
        <button className="dialog-close-button">Close</button>
      </form>
    </dialog>
  );
});

export default Modal;
