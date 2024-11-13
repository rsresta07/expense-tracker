import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import axios from "axios";

const ExpenseTracker = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filterTriggered, setFilterTriggered] = useState(false);
    const [expenses, setExpenses] = useState({});
    const [refresh, setRefresh] = useState(false); // New refresh state

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const response = await axios.get(
                "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
            );
            setExpenses(response.data);
            setRefresh((prev) => !prev); // Toggle refresh to trigger rerender
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const onAddExpense = async (data) => {
        const formattedData = {
            "expense-name": data.expenseName,
            "expense-amount": data.expenseAmount,
            "expense-date": data.expenseDate,
        };

        try {
            await axios.post(
                "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
                { ...formattedData }
            );
            getExpenses(); // Fetch updated expenses after adding a new one
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const applyFilter = () => setFilterTriggered(!filterTriggered);

    return (
        <div className="flex h-auto">
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
                <ExpenseForm onAddExpense={onAddExpense} />
                <ExpenseFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    applyFilter={applyFilter}
                />
                <ExpenseList
                    expenses={expenses}
                    startDate={startDate}
                    endDate={endDate}
                    filterTriggered={filterTriggered}
                    refresh={refresh} // Pass refresh to trigger rerender
                />
            </div>
        </div>
    );
};

export default ExpenseTracker;
