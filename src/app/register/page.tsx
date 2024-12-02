"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from 'yup'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ApiError, setApiError] = useState("")
  const router = useRouter()

 function handleRegister(values : any){
  axios.post(`https://exam.elevateegy.com/api/v1/auth/signup`, values)
  .then( (res) => {
    console.log(res)
    
     
      if(res.data.message == "success"){
        router.push("/login")
      }
      
    
  })
  .catch( (res) => {
    setApiError(res.response.data.message)
  })


 

  }

  let validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "min length is 3").max(10, "max lenght is 10").required("name is required"),
    firstName: Yup.string().matches(/^[a-zA-Z]+$/, "firstName should be with capital char").required("firstName is required"),    
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password should be more difficult").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword and password not the same").required("rePassword is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("phone is required"),
  })



let formik = useFormik({
  initialValues: {
    username: "",
    firstName: "",
    lastName : "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  },
  validationSchema,
  onSubmit : handleRegister
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
                      Sign up
                    </h2>
                  </div>

                  <form onSubmit={formik.handleSubmit} className="mt-7 w-4/5">

                  <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2] invalid:outline-red-500"
                        type="text"
                        placeholder="Username"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} name="username"
                      />
                       {formik.errors.username && formik.touched.username ? (<span className='text-red-500'>{formik.errors.username}</span>) : null}
                    </div>
                  
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2] invalid:outline-red-500"
                        type="text"
                        placeholder="First Name"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} name="firstName"
                      />
                    </div>
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type="text"
                        placeholder="Last Name"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} name="lastName"
                      />
                    </div>
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type="email"
                        placeholder="Email"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email"
                      />
                      {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>) : null}
                    </div>
                    <div className="relative mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password"
                      />
                      {formik.errors.password && formik.touched.password ? (<span className='text-red-500'>{formik.errors.password}</span>) : null}
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
                    <div className="relative mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2]"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword"
                      />
                      {formik.errors.rePassword && formik.touched.rePassword ? (<span className='text-red-500'>{formik.errors.rePassword}</span>) : null}
                      {showConfirmPassword ? (
                        <VscEyeClosed
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          color="#949BA5"
                          size={20}
                          className="absolute top-5 right-4"
                        />
                      ) : (
                        <VscEye
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          color="#949BA5"
                          size={20}
                          className="absolute top-5 right-4"
                        />
                      )}
                    </div>
                    <div className="mb-7">
                      <input
                        className="block w-full p-4 rounded-[10px] bg-[#F9F9F9] shadow-lg border focus:outline-[#4461F2] invalid:outline-red-500"
                        type="tel"
                        placeholder="Phone"
                         onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone"
                      />
                      {formik.errors.phone && formik.touched.phone ? (<span className='text-red-500'>{formik.errors.phone}</span>) : null}
                    </div>
                    <div className="text-center">
                      <span>Already have an account? </span>
                      <Link
                        className="text-[#4461F2]"
                        href={"/login"}
                      >
                        Login
                      </Link>
                    </div>
                    <div className="mt-7">
                      <button
                        type="submit"
                        className="w-full bg-[#4461F2] py-4 rounded-2xl text-white shadow-lg"
                      >
                        Create Account
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