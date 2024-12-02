import Link from "next/link";

export default function Home() {
  
  return (
    <>
      <nav className="bg-[#4461F2] text-xl flex justify-around py-6">
        <Link className="text-white hover:shadow-lg" href={"/"}>
          {" "}
          Home{" "}
        </Link>
       
        <Link className="text-white hover:shadow-lg" href={"/login"}>
          {" "}
          logout{" "}
        </Link>
      </nav>
      <section className="mt-10">
        <h2 className="text-center font-bold text-2xl text-red-950">Hello :)</h2>
      </section>
    </>
  );
}
