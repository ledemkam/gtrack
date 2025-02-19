import { Transaction } from '@/lib/types';
import Link from 'next/link';

interface TransactionItemProps {
    transaction: Transaction;
}

const TransactionItem = ({ transaction } : TransactionItemProps)  => {

    return (
        <li key={transaction.id} className='flex justify-between items-center'>
            <div className='my-4'>
                <button className='btn'>
                    <div className="badge badge-accent">- {transaction.amount} €</div>
                    {transaction.budgetName}
                </button>
            </div>
            <div className='md:hidden flex flex-col items-end'>
                <span className='font-bold text-sm'>{transaction.description}</span>
                <span className='text-sm'>
                    {transaction.createdAt.toLocaleDateString("de-DE")} à {" "}
                    {transaction.createdAt.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>


            <div className='hidden md:flex'>
                <span className='font-bold text-sm'>
                    {transaction.description}
                </span>
            </div>

            <div className='hidden md:flex'>
                {transaction.createdAt.toLocaleDateString("de-DE")} à {" "}
                {transaction.createdAt.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>

            <div className='hidden md:flex'>
                <Link href={`/budjets/${transaction.budgetId}`}  className='btn'>
                Mehr sehen
                </Link>
            </div>



        </li>
    )
}

export default TransactionItem