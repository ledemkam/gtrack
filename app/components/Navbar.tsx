"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {

 const { isLoaded, isSignedIn} = useUser();

  return (
    <div className="bg-base-200/30 px-5 md:px-[10%] py-4">
       {isLoaded && (
          (isSignedIn ? (
            <>
              <div className="flex justify-between items-center">
                <div className="flex text-2xl items-center font-bold">
                    g<span className="text-accent">.track</span>
                </div>
                <div className="md:flex hidden">
                    <Link href={""} className="btn">meine Budgets</Link>
                    <Link href={""} className="btn">dashboard</Link>
                    <Link href={""} className="btn">meine Transaktionen</Link>
                </div>
                <UserButton />
              </div>

              <div className="md:hidden flex gap-4 mt-2 justify-center">
                    <Link href={""} className="btn btn-sm">meine Budgets</Link>
                    <Link href={""} className="btn btn-sm">dashboard</Link>
                    <Link href={""} className="btn btn-sm">meine Transaktionen</Link>
                </div>
            </>
          ): (
             <div className="flex justify-between items-center">
                 <div className="flex text-2xl items-center font-bold">
                    g<span className="text-accent">.track</span>
                </div>
                <div className="flex mt-2 justify-center">
                    <Link href={"/sign-in"} className="btn btn-sm">sich einlogen</Link>
                    <Link href={"/sign-up"} className="btn btn-sm">sich registrieren</Link>
                </div>
             </div>
          ))
       )}
    </div>
  )
}

export default Navbar