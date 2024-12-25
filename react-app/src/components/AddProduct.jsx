import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
            formData.append('userId', localStorage.getItem('userId'));

            const url = API_URL + '/add-product';
            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch(() => {
                    alert('Server error. Please try again.');
                });
        });
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <h2 style={styles.heading}>Add Product</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={pname}
                        onChange={(e) => setpname(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Description</label>
                    <textarea
                        style={styles.textarea}
                        value={pdesc}
                        onChange={(e) => setpdesc(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Price</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Category</label>
                    <select
                        style={styles.select}
                        value={category}
                        onChange={(e) => setcategory(e.target.value)}
                    >
                        <option disabled value="">
                            Select a Category
                        </option>
                        <option>Bikes</option>
                        <option>Mobiles</option>
                        <option>Cloth</option>
                        {categories &&
                            categories.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Image</label>
                    <input
                        style={styles.fileInput}
                        type="file"
                        onChange={(e) => setpimage(e.target.files[0])}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Second Product Image</label>
                    <input
                        style={styles.fileInput}
                        type="file"
                        onChange={(e) => setpimage2(e.target.files[0])}
                    />
                </div>
                <button style={styles.submitButton} onClick={handleApi}>
                    Submit
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
        fontWeight: "bold",
        fontSize: "24px",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        color: "#555",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        transition: "border-color 0.3s",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        minHeight: "80px",
        transition: "border-color 0.3s",
    },
    select: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
    },
    fileInput: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
    },
    submitButton: {
        width: "100%",
        padding: "12px",
        backgroundColor: "rgba(0, 47, 52, 0.95)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    submitButtonHover: {
        backgroundColor: "#0056b3",
    },
};

export default AddProduct;
