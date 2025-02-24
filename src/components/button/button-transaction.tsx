import React from "react";

interface ButtonTransactionProps extends React.HTMLAttributes<HTMLButtonElement> {
    transaction?: Transaction;
}

export default function ButtonTransaction({ transaction, className, ...props }: ButtonTransactionProps) {
    return (
        <button className={`w-full h-[60px] flex items-center gap-3 bg-slate-200 border border-gray-300 rounded py-2 px-4 cursor-pointer ${className}`} {...props}>
            <span className="text-lg font-semibold w-[200px]">{transaction?.inv_no}</span>
            {transaction?.dp && <span className="bg-green-400 text-white text-lg font-semibold py-1 px-3 rounded">{transaction?.dp}</span>}
            {transaction?.order_status &&
                <span className="bg-red-400 text-white text-lg font-semibold py-1 px-3 rounded">{transaction?.order_status}</span>}
        </button>
    )
}