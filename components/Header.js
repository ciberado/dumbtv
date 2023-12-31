import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCollectionPlay } from "react-icons/bs";

function Header() {
  const [show, setShow] = useState(false);

  const [loginShow,setLoginShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div
      style={{ backgroundColor: `${show ? "black" : "transparent"}` }}
      className="transition-all duration-1000 flex fixed z-50 top-0 w-full  items-center px-3"
    >

    </div>
  );
}

export default Header;
