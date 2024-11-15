import React, { useState, useEffect } from "react";

const CategoryManager = ({ categories, setCategories }) => {
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem("categories"));
        if (storedCategories) {
            setCategories(storedCategories);
        }
    }, [setCategories]);

    const handleAddCategory = (event) => {
        event.preventDefault();
        if (newCategory.trim() && !categories[newCategory]) {
            const updatedCategories = { ...categories, [newCategory]: [] };
            setCategories(updatedCategories);
            setNewCategory("");

            localStorage.setItem(
                "categories",
                JSON.stringify(updatedCategories)
            );
            alert("Category added successfully!");
        } else {
            alert("Category already exists or invalid input.");
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add Category"
                className="border border-gray-300 rounded-md p-2"
            />
            <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white mt-2 py-1 px-4 rounded-md ml-2"
            >
                Add
            </button>
        </div>
    );
};

export default CategoryManager;
