import React from "react";

const ExpenseFilter = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    applyFilter,
    resetFilter,
}) => {
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Filter Expenses</h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center mb-4">
                    <label className="mr-2">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={today}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        max={today}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="flex space-x-2 mb-4">
                    <button
                        onClick={applyFilter}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition font-bold"
                    >
                        Apply Filter
                    </button>
                    <button
                        onClick={resetFilter}
                        className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition font-bold"
                    >
                        Reset Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseFilter;
