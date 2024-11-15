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
    const [categories, setCategories] = useState({}); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        getExpenses();
    }, []);

    useEffect(() => {
        calculateTotalExpense(expenses);
    }, [expenses]);

    const getExpenses = async () => {
        try {
            const response = await axios.get(
                "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
            );
            setExpenses(response.data);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const onAddExpense = async (data) => {
        const formattedData = {
            "expense-name": data.expenseName,
            "expense-amount": data.expenseAmount,
            "expense-date": data.expenseDate,
            category: data.category || "Uncategorized",
        };

        try {
            await axios.post(
                "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
                { ...formattedData }
            );
            getExpenses();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const applyFilter = () => setFilterTriggered(!filterTriggered);

    const calculateCategoryPercentages = () => {
        const totalExpenses = Object.values(expenses).reduce(
            (sum, expense) => sum + parseFloat(expense["expense-amount"] || 0),
            0
        );

        const categorySums = Object.values(expenses).reduce((acc, expense) => {
            const category = expense.category || "Uncategorized";
            acc[category] =
                (acc[category] || 0) +
                parseFloat(expense["expense-amount"] || 0);
            return acc;
        }, {});

        return Object.keys(categorySums).map((category) => ({
            category,
            percentage: (
                (categorySums[category] / totalExpenses) *
                100
            ).toFixed(2),
        }));
    };

    // Calculate total expense amount
    const calculateTotalExpense = (filteredExpenses) => {
        const total = Object.values(filteredExpenses).reduce(
            (sum, expense) => sum + parseFloat(expense["expense-amount"] || 0),
            0
        );
        setTotalExpense(total);
    };

    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        setFilterTriggered(false);
    };

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
                    <li className="py-2 cursor-pointer hover:bg-gray-300">
                        <p className="text-lg font-medium mb-2">
                            Total Expense Amount{" "}
                            <span className="text-green-600">
                                ${totalExpense.toFixed(2)}
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>

                <ExpenseForm
                    onAddExpense={onAddExpense}
                    categories={categories}
                />

                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Category Percentages
                    </h3>
                    {calculateCategoryPercentages().map(
                        ({ category, percentage }) => (
                            <p key={category}>
                                {category}: {percentage}%
                            </p>
                        )
                    )}
                </div>

                <ExpenseFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    applyFilter={applyFilter}
                    resetFilter={resetFilter}
                />

                <ExpenseList
                    expenses={expenses}
                    startDate={startDate}
                    endDate={endDate}
                    filterTriggered={filterTriggered}
                    refresh={refresh}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
        </div>
    );
};

export default ExpenseTracker;
