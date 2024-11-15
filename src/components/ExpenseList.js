import React, { useState, useEffect } from "react";

const ExpenseList = ({
    expenses,
    startDate,
    endDate,
    filterTriggered,
    refresh,
}) => {
    const [filteredExpenses, setFilteredExpenses] = useState({});

    useEffect(() => {
        filterExpenses();
    }, [filterTriggered, expenses, refresh]);

    const filterExpenses = () => {
        const filtered = Object.keys(expenses).reduce((result, key) => {
            const expenseDate = new Date(expenses[key]["expense-date"]);
            if (
                (!startDate || expenseDate >= new Date(startDate)) &&
                (!endDate || expenseDate <= new Date(endDate))
            ) {
                result[key] = { ...expenses[key], date: expenseDate };
            }
            return result;
        }, {});

        const sortedFiltered = Object.entries(filtered)
            .sort(([, a], [, b]) => b.date - a.date)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        setFilteredExpenses(sortedFiltered);
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Expense List</h3>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border-b border-gray-300 px-4 py-2 text-left">
                            Expense Name
                        </th>
                        <th className="border-b border-gray-300 px-4 py-2 text-left">
                            Amount
                        </th>
                        <th className="border-b border-gray-300 px-4 py-2 text-left">
                            Date
                        </th>
                        <th className="border-b border-gray-300 px-4 py-2 text-left">
                            Category
                        </th>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {filteredExpenses &&
                    Object.keys(filteredExpenses).length > 0 ? (
                        Object.keys(filteredExpenses).map((key) => (
                            <tr key={key}>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {filteredExpenses[key]["expense-name"]}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {filteredExpenses[key]["expense-amount"]}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {filteredExpenses[key]["expense-date"]}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2">
                                    {filteredExpenses[key].category ||
                                        "Uncategorized"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="4"
                                className="text-center border-b border-gray-300 px-4 py-2"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
