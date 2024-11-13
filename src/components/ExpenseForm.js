import React from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ onAddExpense }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            expenseName: "",
            expenseAmount: "",
            expenseDate: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = (data) => {
        onAddExpense(data);
        reset();
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
                        id="expenseName"
                        {...register("expenseName", {
                            required: "Expense Name is required",
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.expenseName ? "border-red-500" : ""
                        }`}
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.expenseName && (
                        <label className="error-message text-red-500 text-base">
                            {errors.expenseName.message}
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
                        id="expenseAmount"
                        {...register("expenseAmount", {
                            required: "Amount is required",
                            min: 0,
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.expenseAmount ? "border-red-500" : ""
                        }`}
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.expenseAmount && (
                        <label className="error-message text-red-500 text-base">
                            {errors.expenseAmount.message}
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
                        id="expenseDate"
                        {...register("expenseDate", {
                            required: "Date is required",
                            validate: (value) =>
                                new Date(value) <= new Date() ||
                                "Future dates are not allowed",
                        })}
                        className={`border border-gray-300 rounded-md p-2 w-full ${
                            errors.expenseDate ? "border-red-500" : ""
                        }`}
                        max={today} // Set max attribute to today's date
                    />
                </div>
                <div className="text-left flex items-center">
                    {errors.expenseDate && (
                        <label className="error-message text-red-500 text-xl">
                            {errors.expenseDate.message}
                        </label>
                    )}
                </div>

                <div></div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 transition font-bold mb-4"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
