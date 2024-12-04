"use client";
import React, { FormEvent, useState } from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      email: userName,
      password: password,
      callbackUrl: "/",
    });
  };
  

  return (
    <>
      <section className="grid md:grid-cols-1 lg:grid-cols-2 h-screen">
        <div>
          <Header />
        </div>
        <div className="w-3/4 mx-auto pt-10 ">
          <div className="h-full flex flex-col">
            <Navbar />

            <div className="flex-grow">
              <div className="flex items-center h-full">
                <div className="w-full">
                  <div>
                    <h2 className="font-bold text-2xl leading-[30px]">
                      Sign in
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-7 w-4/5">
                  
                 
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type="email"
                        placeholder="Enter Email"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="relative mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <VscEyeClosed
                          onClick={() => setShowPassword(!showPassword)}
                          color="#949BA5"
                          size={20}
                          className="absolute top-5 right-4"
                        />
                      ) : (
                        <VscEye
                          onClick={() => setShowPassword(!showPassword)}
                          color="#949BA5"
                          size={20}
                          className="absolute top-5 right-4"
                        />
                      )}
                    </div>
                  
                    <div className="text-end">
                      <Link
                        className="text-[#4461F2] font-normal text-[16px] leading-6"
                        href={"/forgotPassword"}
                      >
                        Recover Password ?
                      </Link>
                    </div>
                    <div className="mt-7">
                      <button
                        type="submit"
                        className="w-full bg-[#4461F2] py-4 rounded-2xl text-white shadow-lg"
                      >
                       Sign in  
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-7">
                      <div className="w-1/3 h-[1px] bg-[#E0E0E9]"></div>
                      <div>
                        <p className="text-[#6C737F]">Or Continue with</p>
                      </div>
                      <div className="w-1/3 h-[1px] bg-[#E0E0E9]"></div>
                    </div>
                    <div className="social-login flex  justify-center gap-8 mt-8 md:mb-7 lg:mb-0">
        <div className="login-item flex justify-center hover:shadow-lg items-center border  shadow-md rounded-[15.38px] cursor-pointer gap-[10.25px] p-[19.48px]">
          <Image width={20} height={20} alt="facebook" src={"/Vector.png"} />
        </div>
        <div onClick={() => signIn("google", { callbackUrl: "/" })} className="login-item flex justify-center hover:shadow-lg items-center border  shadow-md rounded-[15.38px] cursor-pointer gap-[10.25px] p-[19.48px]">
          <Image width={20} height={20} alt="google" src={"/Logo Google.png"} />
        </div>
        <div onClick={() => signIn("twitter", { callbackUrl: "/" })} className="login-item flex justify-center hover:shadow-lg items-center border  shadow-md rounded-[15.38px] cursor-pointer gap-[10.25px] p-[19.48px]">
          <Image width={20} height={20} alt="twitter" src={"/Logo.png"} />
        </div>
        <div
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="login-item flex justify-center hover:shadow-lg items-center border  shadow-md rounded-[15.38px] cursor-pointer gap-[10.25px] p-[19.48px]"
        >
          <Image width={20} height={20} alt="apple" src={"/Logo (1).png"} />
        </div>
      </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}