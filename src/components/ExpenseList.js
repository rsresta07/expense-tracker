import React from "react";
import axios from "axios";

const ExpenseList = ({ response }) => {
     const getPost = async () => {
         const response = await axios(
             "https://expense-tracker-c44b3-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
         );
         // const list = await response.json();
         console.log(response.data);
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
                    </tr>
                </thead>
                <tbody>
                    {/* {response.length === 0 ? (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center border-b border-gray-300 px-4 py-2 text-middle"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td>

                            </td>
                        </tr>
                    )} */}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
