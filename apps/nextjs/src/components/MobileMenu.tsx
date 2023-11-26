// components/AppMobileMenu.tsx
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClone,
  faServer,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";

const MobileMenu: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: "#11151C" }}
      className="container fixed inset-x-0 bottom-0 flex items-center justify-center gap-20 p-4 text-lg md:hidden"
    >
      <Link
        href="/"
        className=" flex flex-col items-center justify-center  text-white"
      >
        <FontAwesomeIcon icon={faHome} style={{ color: "#fafaff" }} />
      </Link>
      <Link
        href="/flashcards"
        className=" flex flex-col items-center justify-center  text-white"
      >
        <FontAwesomeIcon icon={faClone} style={{ color: "#fafaff" }} />
      </Link>
      <Link
        href="/stats"
        className=" flex flex-col items-center justify-center  text-white"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlassChart}
          style={{ color: "#fafaff" }}
        />
      </Link>
      <Link
        href="/database"
        className=" flex flex-col items-center justify-center  text-white"
      >
        <FontAwesomeIcon icon={faServer} style={{ color: "#fafaff" }} />
      </Link>
    </div>
  );
};

export default MobileMenu;
