import { useEffect, useRef } from "react";
import { toBangla } from "@/lib/format";

type Props = {
  unanswered: number;
  flagged: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function SubmitDialog({ unanswered, flagged, onCancel, onConfirm }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  // showModal keeps the keyboard inside the dialog and closes on Esc.
  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog ref={dialog} className="dialog" onClose={onCancel}>
      <h2>উত্তরপত্র জমা দেবে?</h2>

      {unanswered > 0 ? (
        <p>এখনো {toBangla(unanswered)}টি প্রশ্নের উত্তর বাকি আছে।</p>
      ) : (
        <p>সবগুলো প্রশ্নের উত্তর দেওয়া হয়েছে।</p>
      )}

      {flagged > 0 && <p>{toBangla(flagged)}টি প্রশ্ন পরে দেখার জন্য চিহ্নিত আছে।</p>}

      <p>জমা দেওয়ার পর আর উত্তর বদলানো যাবে না।</p>

      <div className="dialog-actions">
        <button className="button" onClick={onCancel}>
          ফিরে যাও
        </button>
        <button className="button button-primary" onClick={onConfirm}>
          জমা দাও
        </button>
      </div>
    </dialog>
  );
}
