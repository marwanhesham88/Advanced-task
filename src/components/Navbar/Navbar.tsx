import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-end md:my-7 lg:my-0">
        <div className="flex gap-7 items-center">
          <Link
            className="text-xl leading-6 font-bold text-[#4461F2]"
            href={"/login"}
          >
            Sign in
          </Link>
          <Link
            className="text-xl leading-6 text-[#4461F2] py-3 px-5 shadow-md rounded-2xl border border-[#E0E0E9]"
            href={"/register"}
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  );
}
