import React from "react";

const ExpenseFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Filter Expenses</h3>
            <div className="grid grid-cols-3">
                <div className="flex items-center mb-4">
                    <label className="mr-2">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        max={today} // Set max attribute to today's date
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>

                <div className="flex items-center mb-4">
                    <label className="mr-2">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        max={today} // Set max attribute to today's date
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default ExpenseFilter;
