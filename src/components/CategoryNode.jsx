import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function CategoryNode({
                                         category,
                                         selectedCategory,
                                         setSelectedCategory,
                                         level = 0
                                     }) {

    const { i18n } = useTranslation();

    const [open, setOpen] = useState(false);

    const hasChildren = category.children && category.children.length > 0;

    const getName = () =>
        i18n.language?.startsWith("ar")
            ? (category.nameAr || category.nameEn)
            : (category.nameEn || category.nameAr);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const selectCategory = () => {
        setSelectedCategory(category.id);
    };

    return (
        <>

            <li
                className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedCategory === category.id ? "active" : ""
                }`}
                style={{
                    cursor: "pointer",
                    paddingLeft: `${16 + level * 12}px`
                }}
                onClick={selectCategory}
            >

                {getName()}

                {hasChildren && (
                    <span onClick={toggleOpen}>
                     {open
                          ? <FaChevronDown size={12}/>
                          : <FaChevronRight size={12}/>
                     }
                    </span>
                )}

            </li>

            {open && hasChildren && category.children.map(child => (

                <CategoryNode
                    key={child.id}
                    category={child}
                    level={level + 1}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

            ))}

        </>
    );
}