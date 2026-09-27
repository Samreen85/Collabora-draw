import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { IoIosShareAlt } from "react-icons/io";

import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { DEFAULT_EASE } from "@/common/constants/easings";
import { useMediaQuery } from "@/common/hooks/useMediaQuery";
import { useModal } from "@/common/recoil/modal";

import { useRefs } from "../../hooks/useRefs";
import ShareModal from "../../modals/ShareModal";
import BackgroundPicker from "./BackgoundPicker";
import ColorPicker from "./ColorPicker";
import HistoryBtns from "./HistoryBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
import ModePicker from "./ModePicker";
import ShapeSelector from "./ShapeSelector";

const ToolBar = () => {
  const { canvasRef, bgRef } = useRefs();
  const { openModal } = useModal();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [opened, setOpened] = useState(false);

  const router = useRouter();

  useEffect(() => setOpened(isDesktop), [isDesktop]);

  const handleExit = () => router.push("/");

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");

    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canvas.png";
    link.click();
  };

  const handleShare = () => openModal(<ShareModal />);

  return (
    <>
      <motion.button
        type="button"
        aria-label={opened ? "Hide tools" : "Show tools"}
        aria-controls="room-toolbar"
        aria-expanded={opened}
        className="btn-icon absolute -left-2 bottom-1/2 z-50 h-10 w-10 rounded-full bg-[#8b3dff] text-2xl transition-none lg:hidden"
        animate={{ rotate: opened ? 0 : 180 }}
        transition={{ duration: 0.2, ease: DEFAULT_EASE }}
        onClick={() => setOpened(!opened)}
      >
        <FiChevronRight />
      </motion.button>
      <motion.div
        id="room-toolbar"
        className="absolute left-10 top-[50%] z-50 grid grid-cols-2 items-center gap-5 rounded-lg bg-[#8b3dff] p-5 text-white 
        xl:left-[35%] xl:top-[10%] 	xl:grid-cols-12"
        animate={{
          x: opened ? 0 : -160,
          y: "-50%",
        }}
        transition={{
          duration: 0.2,
          ease: DEFAULT_EASE,
        }}
      >
        <HistoryBtns />

        {/* <div className="h-px w-full bg-white 2xl:hidden" /> */}
        {/* <div className="h-px w-full bg-white" /> */}

        <ShapeSelector />
        <ColorPicker />
        <LineWidthPicker />
        <ModePicker />
        <ImagePicker />

        {/* <div className="2xl:hidden"></div> */}
        {/* <div className="h-px w-full bg-white 2xl:hidden" /> */}
        {/* <div className="h-px w-full bg-white" /> */}

        {/* <BackgroundPicker /> */}
        <button
          type="button"
          className="btn-icon text-2xl"
          aria-label="Invite people"
          title="Invite people"
          onClick={handleShare}
        >
          <IoIosShareAlt />
        </button>
        <button
          type="button"
          className="btn-icon text-2xl"
          aria-label="Download drawing"
          title="Download drawing"
          onClick={handleDownload}
        >
          <HiOutlineDownload />
        </button>
        <button
          type="button"
          className="btn-icon text-xl"
          aria-label="Leave room"
          title="Leave room"
          onClick={handleExit}
        >
          <ImExit />
        </button>
      </motion.div>
    </>
  );
};

export default ToolBar;
