import React from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ onAddExpense }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onAddExpense(data);
        reset(); // Reset the form fields after submission
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="name" className="block text-left mb-1">
                        Expense Name:
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "Expense Name is required",
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.name ? "border-red-500" : ""
                        }`}
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.name && (
                        <label className="error-message text-red-500 text-sm">
                            {errors.name.message}
                        </label>
                    )}
                </div>

                <div>
                    <label htmlFor="amount" className="block text-left mb-1">
                        Amount:
                    </label>
                </div>
                <div>
                    <input
                        type="number"
                        id="amount"
                        {...register("amount", {
                            required: "Amount is required",
                            min: 0,
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.amount ? "border-red-500" : ""
                        }`}
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.amount && (
                        <label className="error-message text-red-500 text-sm">
                            {errors.amount.message}
                        </label>
                    )}
                </div>

                <div>
                    <label htmlFor="date" className="block text-left mb-1">
                        Date:
                    </label>
                </div>
                <div>
                    <input
                        type="date"
                        id="date"
                        {...register("date", {
                            required: "Date is required",
                            validate: (value) =>
                                new Date(value) <= new Date() ||
                                "Future dates are not allowed",
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.date ? "border-red-500" : ""
                        }`}
                        max={today} // Set max attribute to today's date
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.date && (
                        <label className="error-message text-red-500 text-sm">
                            {errors.date.message}
                        </label>
                    )}
                </div>

                <div className="col-span-3">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition font-bold"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
