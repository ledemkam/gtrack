import Link from "next/link";

export default function Home() {
  return (
      <div>
        <div className="flex items-center justify-center flex-col py-10 w-full">
           <div>
             <div className="flex flex-col">
               <h1 className="text-4xl tablet:text-5xl font-bold text-center">Übernehmen Sie die Kontrolle<br/> über Ihre Finanzen</h1>
               <p className="py-6 text-gray text-center">
                suiver z vos bugget et depenseda <br/> en toute simplicite avec notre application intuitive !</p>
                <div className="flex justify-center gap-2 items-center">
                   <Link
                     href={""}
                     className="btn btn-sm tablet:btn-md btn-outline btn-accent"
                   >sich einlogen</Link>
                  
                   <Link 
                     href={""}
                     className="btn btn-sm tablet:btn-md btn-accent"
                   >sich registrieren</Link>
                </div>
             </div>
           </div>
        </div>
      </div>
  );
}
