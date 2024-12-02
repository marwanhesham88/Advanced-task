import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <>
      <div className="p-20 bg-[#F0F4FC] h-full rounded-tr-[100px] rounded-br-[100px] shadow-xl md:text-center lg:text-start">
        <div>
          <h1 className="font-bold text-5xl leading-normal">
            Welcome to <br />
            <span className="text-[#122D9C] text-[60px] leading-[90px]">
              Elevate
            </span>
          </h1>
        </div>
        <div className="mt-7">
          <p className="text-[18px] leading-10">
            Quidem autem voluptatibus qui quaerat aspernatur <br /> architecto
            natus
          </p>
        </div>
        <div className="mt-20 ">
         <Image width={408} height={434.59} className=" md:mx-auto lg:mx-0"  src={"/bro.png"} alt="sign" />

        </div>
      </div>
    </>
  );
}
