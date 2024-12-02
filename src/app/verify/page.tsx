"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useRouter } from "next/navigation";

export default function Verify() {
  const [ApiError, setApiError] = useState("")
  const router = useRouter()

  function handleVerifyCode(values : any){
  axios.post(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, values)
  .then( (res) => {
    console.log(res);
    
    if(res.data.status == "Success"){
      
      router.push("/setPassword")
    }
  })
  .catch( (res) => {
    setApiError(res.response.data.message)
  })


 

  }

  let validationSchema = Yup.object().shape({ 
    resetCode: Yup.string(),
  })



let formik = useFormik({
  initialValues: {
    resetCode: "",
  },
  validationSchema,
  onSubmit : handleVerifyCode
})

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
                {ApiError ?  <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 mb-3'>
                   {ApiError}
                         </div> : null}

                  <div>
                    <h2 className="font-bold text-2xl leading-[30px]">
                    Verify code
                    </h2>
                  </div>


                  <form onSubmit={formik.handleSubmit} className="mt-7 w-4/5">
                  
                 
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type="text"
                        placeholder="Enter Code"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode"
                      />
                    </div>
                
                  
                    <div className="text-end">
                      <span>Didn’t receive a code? </span>
                      <Link
                        className="text-[#4461F2]"
                        href={"/verify"}
                      >
                        Resend
                      </Link>
                    </div>
                    <div className="mt-7">
                      <button
                        type="submit"
                        className="w-full bg-[#4461F2] py-4 rounded-2xl text-white shadow-lg"
                      >
                        Verify
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