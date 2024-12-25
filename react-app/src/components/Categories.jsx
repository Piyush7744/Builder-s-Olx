import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa"; // Dropdown icon

function Categories() {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);

    const categories = [
        "Bricks",
        "Blocks",
        "Cement",
        "Steel",
        "Rod",
        "Pipes",
        "Tools",
        "Sand",
        "Paint",
        "Others",
    ];

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <div
            style={{
                backgroundColor: "#002f34",
                padding: "10px 20px",
                color: "#fff",
                borderBottom: "3px solid #f8dc75",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Header Section */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
                onClick={toggleCategories}
            >
                <span
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#f8dc75",
                    }}
                >
                    All Categories
                </span>
                {/* Dropdown Icon for Mobile */}
                <FaCaretDown
                    style={{
                        marginLeft: "10px",
                        color: "#f8dc75",
                        display: window.innerWidth <= 768 ? "inline" : "none",
                    }}
                />
            </div>

            {/* Categories List */}
            <div
                style={{
                    display:
                        window.innerWidth > 768 || showCategories
                            ? "flex"
                            : "none", // Show categories always on larger screens
                    flexWrap: "wrap",
                    gap: "15px",
                    marginTop: "10px",
                    flexDirection: window.innerWidth <= 768 ? "column" : "row",
                }}
            >
                {categories.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => navigate("/category/" + item)}
                        style={{
                            backgroundColor: "#004f56",
                            color: "#fff",
                            padding: "8px 20px",
                            borderRadius: "20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background-color 0.3s, transform 0.2s",
                            textAlign: "center",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#f8dc75";
                            e.target.style.color = "#002f34";
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#004f56";
                            e.target.style.color = "#fff";
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Categories;
