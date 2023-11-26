import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth, UserButton } from "@clerk/nextjs";

const TopMenu: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <div
      style={{ backgroundColor: "#11151C" }}
      className=" fixed inset-x-0 top-0 flex items-center justify-between bg-gray-800 p-4"
    >
      <div className="flex items-center">
        <Link href="/" className="text-lg font-bold text-white">
          Logo
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!isSignedIn && (
          <div className="flex items-center justify-center">
            <Link
              href="/sign-in"
              className="flex flex-col items-center justify-center text-3xl text-white"
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ width: "2rem", height: "2rem", color: "#fafaff" }}
              />
            </Link>
          </div>
        )}
        {isSignedIn && (
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "2rem",
                    height: "2rem",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMenu;
