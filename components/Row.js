import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

function Row({ id, title, entries, big }) {
  return (
    <motion.div id={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <h1 className="font-bold text-xl sm:text-3xl p-3">{title}</h1>
      <div className="p-3 sm:p-5 flex gap-5 overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {entries?.map((entry) => (
          <button
            id={`show${entry.id}`}
            tabIndex="0"
            style={{outline: "none"}}
            key={entry.id}
            className="showEntry group hover:sm:mx-5 hover:scale-105 focus:sm:mx-5 focus:scale-110 relative transition-all duration-500"
            onFocus={(e)=> e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })}
            //onMouseEnter={(e) => e.target.focus({ focusVisible: true })}
            onClick={() => {
              if (entry.providers.length > 0) {
                window.open(entry.providers[0].url, 'watch')
              }
            }}
          >
            <Image
              layout="fixed"
              className="object-cover transition-all duration-500 group-hover:opacity-50 group-focus:opacity-50 rounded-lg"
              width={big ? 400 : 300}
              height={big ? 300 : 200}
              src={entry.imageUrl}
              alt={entry.title}
            />
            <div className="group-hover:flex group-hover:animation-fadeUp group-focus:flex group-focus:animation-fadeUp flex-col duration-1000  hidden absolute bottom-3  left-3">
              <div>
                <p
                  className={`text-white ${
                    big ? "sm:text-3xl text-lg" : "text-md sm:text-lg"
                  } font-semibold`}
                >
                  {entry.title || entry.originalTitle}
                </p>
                <p className="line-clamp-2 sm:text-base text-xs">
                  {entry.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default Row;
