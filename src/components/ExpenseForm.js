import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CategoryManager from "./CategoryManager";

const ExpenseForm = ({ onAddExpense }) => {
    const [categories, setCategories] = useState({});
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            expenseName: "",
            expenseAmount: "",
            expenseDate: new Date().toISOString().split("T")[0],
            category: "",
        },
    });

    const onSubmit = (data) => {
        onAddExpense(data);
        alert("Expense added successfully!");
        reset();
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="mb-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto"
            >
                <h3 className="text-xl font-semibold mb-4">Expenses Form</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <label
                        htmlFor="expenseName"
                        className="col-span-1 text-left text-gray-700 font-medium"
                    >
                        Expense Name:
                    </label>
                    <div className="col-span-2">
                        <input
                            type="text"
                            id="expenseName"
                            {...register("expenseName", {
                                required: "Expense Name is required",
                            })}
                            className={`w-full p-2 border rounded-md ${
                                errors.expenseName
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.expenseName && (
                            <span className="text-red-500 text-sm">
                                {errors.expenseName.message}
                            </span>
                        )}
                    </div>

                    <label
                        htmlFor="expenseAmount"
                        className="col-span-1 text-left text-gray-700 font-medium"
                    >
                        Amount:
                    </label>
                    <div className="col-span-2">
                        <input
                            type="number"
                            id="expenseAmount"
                            {...register("expenseAmount", {
                                required: "Amount is required",
                                min: 0,
                            })}
                            className={`w-full p-2 border rounded-md ${
                                errors.expenseAmount
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.expenseAmount && (
                            <span className="text-red-500 text-sm">
                                {errors.expenseAmount.message}
                            </span>
                        )}
                    </div>

                    {/* Expense Date */}
                    <label
                        htmlFor="expenseDate"
                        className="col-span-1 text-left text-gray-700 font-medium"
                    >
                        Date:
                    </label>
                    <div className="col-span-2">
                        <input
                            type="date"
                            id="expenseDate"
                            {...register("expenseDate", {
                                required: "Date is required",
                                validate: (value) =>
                                    new Date(value) <= new Date() ||
                                    "Future dates are not allowed",
                            })}
                            className={`w-full p-2 border rounded-md ${
                                errors.expenseDate
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            max={today} // Set max attribute to today's date
                        />
                        {errors.expenseDate && (
                            <span className="text-red-500 text-sm">
                                {errors.expenseDate.message}
                            </span>
                        )}
                    </div>

                    {/* Category Selection */}
                    <label
                        htmlFor="category"
                        className="col-span-1 text-left text-gray-700 font-medium"
                    >
                        Category:
                    </label>
                    <div className="col-span-2">
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required: "Category is required",
                            }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="w-full p-2 border rounded-md border-gray-300"
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((key) => (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.category && (
                            <span className="text-red-500 text-sm">
                                {errors.category.message}
                            </span>
                        )}
                    </div>
                </div>

                <CategoryManager
                    categories={categories}
                    setCategories={setCategories}
                />

                <button
                    type="submit"
                    className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-semibold"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
