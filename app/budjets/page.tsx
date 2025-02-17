"use client";

import { useUser } from "@clerk/nextjs";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { addBugets, getBudgetsByUser } from "./actions";
import Notifications from "../components/Notifications";
import { Budget } from "@prisma/client";
import Link from "next/link";


const Page = () => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [notification, setNotification] = useState('');
  const [bugdets, setBudgets] = useState<Budget[]>([]);

  const handleEmojiSelect = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const closeNotification = () => {
    setNotification('');
  }

  const handleAddBudgets = async () => {
    try {
      const amount = parseFloat(budgetAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Der Betrag muss eine positive Zahl sein");
      }

      await addBugets( user?.primaryEmailAddress?.emailAddress as string,
      budgetName,
      amount,
      selectedEmoji 
      )

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement
       if (modal) {
         modal.close();
       }

       setNotification('neuer Budjet wurde erfolgreich hinzugefügt');
        setBudgetName('');
        setBudgetAmount('');
        setSelectedEmoji('');
        setShowEmojiPicker(false);
      
    } catch(error) {
      setNotification(`Fehler beim Hinzufügen des Budjets: ${error}`);   
    }
  }

  const getAllBudgets = async () => {
    if(user?.primaryEmailAddress?.emailAddress){
      try {
        
        const userBudgets = await getBudgetsByUser(user?.primaryEmailAddress?.emailAddress)
        setBudgets(userBudgets)
      } catch (error) {
        setNotification(`Fehler beim Abrufen der Budjets: ${error}`)
      }
    }
  }

  useEffect(() => {
    getAllBudgets()    
  }, [user?.primaryEmailAddress?.emailAddress])
  
  console.log(bugdets);
  
  

  return (
    <div>
      <Wrapper>
        {notification && (
          <Notifications message={notification} type={notification.includes('Fehler') ? 'error' : 'success'} onclose={closeNotification}  />
        )}
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            ).showModal()
          }
        >
          neuer Budjet
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Budjet erstellen</h3>
            <p className="py-4">
              ermöglicht es Ihnen, Ihre Ausgaben zu kontrollieren
            </p>
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={budgetName}
                placeholder="Name des bugets"
                onChange={(e) => setBudgetName(e.target.value)}
                className="input input-bordered mb-3"
                required
              />

              <input
                type="text"
                value={budgetAmount}
                placeholder="Beitrag in €"
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="input input-bordered mb-3"
                required
              />
              <button
                className="btn mb-3"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {selectedEmoji || "ein emoji wählen 🫵"}
              </button>
              {showEmojiPicker && (
                <div className="flex justify-center items-center my-4">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}
              <button className="btn" onClick={handleAddBudgets}>Budjet hinzufügen</button>
            </div>
          </div>
        </dialog>

        <ul className="grid md:grid-cols-3 gap-4">
          {bugdets.map((budget) => (
            <Link href={"/budjets"} key={budget.id} className="card">
             {budget.emoji} {budget.name} - {budget.amount} €
            </Link>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default Page;
