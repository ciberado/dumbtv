import { motion } from "framer-motion";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";

function HLSRow({ title, entries, big }) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <Modal show={show} setShow={setShow} id={id} />
      <h1 className="font-bold text-xl sm:text-3xl p-3">{title}</h1>
      <div className="p-3 sm:p-5 flex gap-5 overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {entries?.map((a) => (
          <div
            key={a.id}
            className="group hover:sm:mx-5 hover:scale-105 relative transition-all duration-500"
          >
            <Image
              layout="fixed"
              className="object-cover transition-all duration-500 group-hover:opacity-50 rounded-lg bg-white"
              width={big ? 400 : 300}
              height={big ? 300 : 200}
              src={a.imageUrl}
              alt={a.title}
            />
            <div className="group-hover:flex group-hover:animation-fadeUp flex-col duration-1000  hidden absolute bottom-3  left-3">
              <div className="flex space-x-3 items-center">
                <motion.div
                  onClick={() => {
                    document.location.href = a.url;
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white w-12 h-12 flex rounded-full items-center justify-center"
                >
                  <BsFillPlayFill className="text-black text-3xl" />
                </motion.div>
                <div>
                  <AiOutlinePlusCircle className="text-4xl" />
                </div>
              </div>

              <div>
                <p
                  className={`text-white ${
                    big ? "sm:text-3xl text-lg" : "text-md sm:text-lg"
                  } font-semibold`}
                >
                  { a.title}
                </p>
                <p className="line-clamp-2 sm:text-base text-xs">
                  {a.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HLSRow;
