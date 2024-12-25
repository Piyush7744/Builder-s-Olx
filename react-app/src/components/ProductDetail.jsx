// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "./Header";
// import API_URL from "../constants";

// function ProductDetail() {

//     const [product, setproduct] = useState()
//     const [user, setuser] = useState()
//     console.log(user, "userrrrr")
//     const p = useParams()

//     useEffect(() => {
//         const url = API_URL + '/get-product/' + p.productId;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setproduct(res.data.product)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }, [])


//     const handleContact = (addedBy) => {
//         console.log('id', addedBy)
//         const url = API_URL + '/get-user/' + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setuser(res.data.user)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }

//     return (<>
//         <Header />
//         PRODUCT DETAILS :
//         <div >
//             {product && <div className="d-flex justify-content-between flex-wrap">
//                 <div>
//                     <img width="400px" height="200px" src={API_URL + '/' + product.pimage} alt="" />
//                     {product.pimage2 && <img width="400px" height="200px" src={API_URL + '/' + product.pimage2} alt="" />}
//                     <h6> Product Details : </h6>
//                     {product.pdesc}
//                 </div>
//                 <div>
//                     <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
//                     <p className="m-2"> {product.pname}  | {product.category} </p>
//                     <p className="m-2 text-success"> {product.pdesc} </p>

//                     {product.addedBy &&
//                         <button onClick={() => handleContact(product.addedBy)}>
//                             SHOW CONTACT DETAILS
//                         </button>}
//                     {user && user.username && <h4>{user.username}</h4>}
//                     {user && user.mobile && <h3>{user.mobile}</h3>}
//                     {user && user.email && <h6>{user.email}</h6>}

//                 </div>
//             </div>}
//         </div>
//     </>

//     )
// }

// export default ProductDetail;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // For carousel navigation
    const [showContactDetails, setShowContactDetails] = useState(false); // Toggle for contact details

    const { productId } = useParams();

    useEffect(() => {
        const url = API_URL + '/get-product/' + productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                }
            })
            .catch(() => {
                alert('Server Error.');
            });
    }, [productId]);

    const handleContact = (addedBy) => {
        if (!showContactDetails) {
            const url = API_URL + '/get-user/' + addedBy;
            axios.get(url)
                .then((res) => {
                    if (res.data.user) {
                        setUser(res.data.user);
                    }
                })
                .catch(() => {
                    alert('Server Error.');
                });
        }
        setShowContactDetails(!showContactDetails); // Toggle contact details visibility
    };

    const handleNextImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % product.images.length
            );
        }
    };

    const handlePrevImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex - 1 + product.images.length) % product.images.length
            );
        }
    };

    const styles = {
        container: {
            padding: "20px",
            fontFamily: "'Arial', sans-serif",
            color: "#333",
        },
        layout: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
        },
        carouselContainer: {
            flex: 1,
            position: "relative",
            textAlign: "center",
            maxWidth: "400px",
        },
        carouselImage: {
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
        carouselButton: {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "50%",
        },
        prevButton: {
            left: "10px",
        },
        nextButton: {
            right: "10px",
        },
        detailsContainer: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
        },
        price: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "rgba(0, 47, 52, 0.95)",
            marginBottom: "10px",
        },
        button: {
            padding: "10px 15px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "rgba(0, 47, 52, 0.95)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "15px",
        },
        contactDetails: {
            marginTop: "20px",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        },
    };

    // Prepare the images for the carousel
    const images = product
        ? [API_URL + '/' + product.pimage, ...(product.pimage2 ? [API_URL + '/' + product.pimage2] : [])]
        : [];

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1>Product Details</h1>
                {product ? (
                    <div style={styles.layout}>
                        {/* Carousel Section */}
                        <div style={styles.carouselContainer}>
                            {images.length > 0 && (
                                <>
                                    <img
                                        src={images[currentImageIndex]}
                                        alt={product.pname}
                                        style={styles.carouselImage}
                                    />
                                    <button
                                        style={{ ...styles.carouselButton, ...styles.prevButton }}
                                        onClick={handlePrevImage}
                                    >
                                        &#8249;
                                    </button>
                                    <button
                                        style={{ ...styles.carouselButton, ...styles.nextButton }}
                                        onClick={handleNextImage}
                                    >
                                        &#8250;
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Product Details Section */}
                        <div style={styles.detailsContainer}>
                            <h2>{product.pname}</h2>
                            <p>{product.category}</p>
                            <p>{product.pdesc}</p>
                            <p style={styles.price}>Rs. {product.price} /-</p>
                            {product.addedBy && (
                                <button
                                    style={styles.button}
                                    onClick={() => handleContact(product.addedBy)}
                                >
                                    {showContactDetails ? "Hide Details" : "Show Contact Details"}
                                </button>
                            )}
                            {showContactDetails && user && (
                                <div style={styles.contactDetails}>
                                    <h4>Contact Details:</h4>
                                    <p>Name: {user.username}</p>
                                    <p>Mobile: {user.mobile}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading product details...</p>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
