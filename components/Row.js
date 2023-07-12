import { motion } from "framer-motion";
import Image from "next/image";

function Row({ title, entries, big }) {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <h1 className="font-bold text-xl sm:text-3xl p-3">{title}</h1>
      <div className="p-3 sm:p-5 flex gap-5 overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {entries?.map((entry) => (
          <div
            tabIndex="0"
            key={entry.id}
            className="group hover:sm:mx-5 hover:scale-105 relative transition-all duration-500"
            onClick={() => {
              if (entry.providers.length > 0) {
                window.open(entry.providers[0].url, 'watch')
              }
            }}
          >
            <Image
              layout="fixed"
              className="object-cover transition-all duration-500 group-hover:opacity-50 rounded-lg"
              width={big ? 400 : 300}
              height={big ? 300 : 200}
              src={entry.imageUrl}
              alt={entry.title}
            />
            <div className="group-hover:flex group-hover:animation-fadeUp flex-col duration-1000  hidden absolute bottom-3  left-3">
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
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Row;
