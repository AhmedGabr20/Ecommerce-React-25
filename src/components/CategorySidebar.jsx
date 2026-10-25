import React from "react";
import { useTranslation } from "react-i18next";
import CategoryNode from "./CategoryNode";

export default function CategorySidebar({
                                            categories,
                                            selectedCategory,
                                            setSelectedCategory
                                        }) {

    const { t } = useTranslation();

    return (

        <div className="card p-3">

            <h6 className="mb-3">{t("categories")}</h6>

            <ul className="list-group list-group-flush">

                {/* All products */}

                <li
                    className={`list-group-item ${
                        selectedCategory === null ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(null)}
                    style={{ cursor: "pointer" }}
                >
                    {t("AlCategories")}
                </li>

                {categories.map(cat => (

                    <CategoryNode
                        key={cat.id}
                        category={cat}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                ))}

            </ul>

        </div>

    );
}