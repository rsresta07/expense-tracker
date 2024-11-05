import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onAddExpense = (data) => {
        setExpenses((prevExpenses) => [...prevExpenses, data]);
    };

    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
            (!startDate || expenseDate >= new Date(startDate)) &&
            (!endDate || expenseDate <= new Date(endDate))
        );
    });

    const totalExpense = filteredExpenses.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
    );

    return (
        <div className="flex h-auto">
            {/** Menu section but it doesn't work right now */}
            <div className="w-64 bg-gray-200 p-4">
                <h2 className="text-xl font-semibold">Menu</h2>
                <ul className="mt-4">
                    <li className="py-2 cursor-pointer hover:bg-gray-300">
                        Dashboard
                    </li>
                    <li className="py-2 cursor-pointer hover:bg-gray-300">
                        Add Expense
                    </li>
                    <li className="py-2 cursor-pointer hover:bg-gray-300">
                        View Expenses
                    </li>
                    <li className="py-2 cursor-pointer hover:bg-gray-300">
                        Settings
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>
                {/* ExpenseForm.js ko part load garcha */}
                <ExpenseForm onAddExpense={onAddExpense} />

                {/* ExpenseFilter.js ko part load garcha */}
                <ExpenseFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
                {/* ExpenseList.js ko part load garcha */}
                <ExpenseList expenses={filteredExpenses} />

                <div className="flex items-center mt-4 pb-4">
                    <h3 className="text-xl font-semibold">Total Expenses:</h3>
                    <h3 className="text-xl font-semibold text-green-500 ml-2">
                        NPR {totalExpense}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
