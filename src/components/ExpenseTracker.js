import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import { getDatabase } from "firebase/database";
import axios from "axios";

const ExpenseTracker = () => {
    // const [expenses, setExpenses] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        const response = await axios(
            "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );
        // const list = await response.json();
        console.log(response.data);
    };

    const onAddExpense = async (data) => {
        // console.log(typeof data, data);

        const formattedData = {
            "expense-name": data.expenseName,
            "expense-amount": data.expenseAmount,
            "expense-date": data.expenseDate,
        };

        await axios.post(
            "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
            {
                ...formattedData,
            }
        );
    };

    // const filteredExpenses = expenses.filter((expense) => {
    //     const expenseDate = new Date(expense.date);
    //     return (
    //         (!startDate || expenseDate >= new Date(startDate)) &&
    //         (!endDate || expenseDate <= new Date(endDate))
    //     );
    // });

    // const totalExpense = filteredExpenses.reduce(
    //     (total, expense) => total + parseFloat(expense.amount),
    //     0
    // );

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
                {/* <button
                    onClick={() => onAddExpense()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition font-bold"
                >
                    Add Expense
                </button> */}
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
                {/* <ExpenseList response={response}  /> */}

                <ExpenseList />

                <div className="flex items-center mt-4 pb-4">
                    <h3 className="text-xl font-semibold">Total Expenses:</h3>
                    <h3 className="text-xl font-semibold text-green-500 ml-2">
                        {/* NPR {totalExpense} */}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
