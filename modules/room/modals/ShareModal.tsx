import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import { useModal } from "@/common/recoil/modal";
import { useRoom } from "@/common/recoil/room";

const ShareModal = () => {
  const { id } = useRoom();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => setUrl(window.location.href), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div className="relative flex w-[calc(100vw-2rem)] flex-col items-center rounded-md bg-white p-6 pt-10 sm:w-auto sm:p-10 sm:pt-5">
      <button
        type="button"
        onClick={closeModal}
        aria-label="Close invite dialog"
        className="absolute top-5 right-5"
      >
        <AiOutlineClose />
      </button>
      <h2 className="text-2xl font-bold">Invite</h2>
      <h3>
        Room id: <p className="inline font-bold">{id}</p>
      </h3>
      <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={url}
          readOnly
          aria-label="Invitation link"
          onFocus={(event) => event.target.select()}
          className="input min-w-0 flex-1 sm:w-96"
        />
        <button className="btn" type="button" onClick={handleCopy} disabled={!url}>
          {copyStatus === "copied" ? "Copied!" : "Copy link"}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 text-sm">
        {copyStatus === "copied" && "Invitation link copied to clipboard."}
        {copyStatus === "error" && "Could not copy the link. Select it and copy it manually."}
      </p>
    </div>
  );
};

export default ShareModal;
