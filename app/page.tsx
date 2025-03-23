import Link from "next/link";

import  {bugdets}  from "./data";
import BudgetsItem from "./components/shared/BudgetsItem";
import Navbar from "./components/layout/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <div>
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Übernehmen Sie die Kontrolle
              <br /> über Ihre Finanzen
            </h1>
            <p className="py-6 text-gray text-center">
                          Verfolgen Sie Ihr Budget und Ihre Ausgaben <br/>ganz einfach mit unserer intuitiven Anwendung!

            </p>
            <div className="flex justify-center gap-2 items-center">
              <Link
                href={"/sign-in"}
                className="btn btn-sm md:btn-md btn-accent"
              >
                sich einlogen
              </Link>

              <Link
                href={"/sign-up"}
                className="btn btn-sm md:btn-md btn-accent"
              >
                sich registrieren
              </Link>
            </div>
            <ul className="grid md:grid-cols-3 gap-4 md:min-w-[1200px] mt-6">
              {bugdets.map((budget) => (
                <Link href={""} key={budget.id}>
                  <BudgetsItem budget={budget} enableHover={1} />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
