import React from "react";

const ExpenseList = ({ expenses }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {expenses.length === 0 ? (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center border-b border-gray-300 px-4 py-2 text-middle"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        expenses.map((expense, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-b border-gray-300 px-4 py-2 text-left">
                                    {expense.name}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-left">
                                    {expense.amount}
                                </td>
                                <td className="border-b border-gray-300 px-4 py-2 text-left">
                                    {expense.date}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
