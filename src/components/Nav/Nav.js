"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Nav() {
  const pathname = usePathname();

  const getLinkClassName = (path) => {
    return pathname === path
      ? "block py-2 px-4 text-purple-700 font-bold bg-gray-200 rounded-md shadow"
      : "block py-2 px-4 text-gray-600 hover:bg-purple-100 hover:text-purple-700 font-bold rounded-md transition-colors duration-200";
  };

  return (
    <nav className="bg-white shadow-sm p-4 rounded-md">
      <ul className="flex justify-center list-none m-0">
        <li className="mx-2">
          <Link href="/class">
            <button className={getLinkClassName("/class")}>화면공유</button>
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/job">
            <button className={getLinkClassName("/job")}>자격증/취업</button>
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/note">
            <button className={getLinkClassName("/note")}>필기공유</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
