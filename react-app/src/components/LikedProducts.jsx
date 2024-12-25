// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
// import './Home.css';
// import API_URL from "../constants";


// function LikedProducts() {

//     const navigate = useNavigate()

//     const [products, setproducts] = useState([]);
//     const [cproducts, setcproducts] = useState([]);
//     const [search, setsearch] = useState('');

//     // useEffect(() => {
//     //     if (!localStorage.getItem('token')) {
//     //         navigate('/login')
//     //     }
//     // }, [])

//     useEffect(() => {
//         const url = API_URL + '/liked-products';
//         let data = { userId: localStorage.getItem('userId') }
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.products) {
//                     setproducts(res.data.products);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }, [])

//     const handlesearch = (value) => {
//         setsearch(value);
//     }

//     const handleClick = () => {
//         let filteredProducts = products.filter((item) => {
//             if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
//                 item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
//                 item.category.toLowerCase().includes(search.toLowerCase())) {
//                 return item;
//             }
//         })
//         setcproducts(filteredProducts)

//     }

//     const handleCategory = (value) => {
//         let filteredProducts = products.filter((item, index) => {
//             if (item.category == value) {
//                 return item;
//             }
//         })
//         setcproducts(filteredProducts)
//     }

//     const handleLike = (productId) => {
//         let userId = localStorage.getItem('userId');

//         const url = API_URL + '/like-product';
//         const data = { userId, productId }
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     alert('Product saved to Favourites.')
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

//     }


//     return (
//         <div>
//             <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
//             <Categories handleCategory={handleCategory} />
//             <h5> SEARCH RESULTS </h5>
//             <div className="d-flex justify-content-center flex-wrap">
//                 {cproducts && products.length > 0 &&
//                     cproducts.map((item, index) => {

//                         return (
//                             <div key={item._id} className="card m-3 ">
//                                 <div onClick={() => handleLike(item._id)} className="icon-con">
//                                     <FaHeart className="icons" />
//                                 </div>
//                                 <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <h3 className="m-2 text-danger"> {item.price} </h3>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>

//             <h5> ALL RESULTS  </h5>

//             <div className="d-flex justify-content-center flex-wrap">
//                 {products && products.length > 0 &&
//                     products.map((item, index) => {

//                         return (
//                             <div key={item._id} className="card m-3 ">
//                                 <div onClick={() => handleLike(item._id)} className="icon-con">
//                                     <FaHeart className="icons" />
//                                 </div>
//                                 <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <h3 className="m-2 text-danger"> {item.price} </h3>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>



//         </div>
//     )
// }

// export default LikedProducts;
import { useEffect, useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import axios from "axios";
import API_URL from "../constants";

function LikedProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const url = API_URL + '/liked-products';
        const data = { userId: localStorage.getItem('userId') };
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products); // Set both products and filteredProducts initially
                }
            })
            .catch(() => {
                alert('Server error while fetching liked products.');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
        const filtered = products.filter((item) => {
            return (
                item.pname.toLowerCase().includes(value.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredProducts(filtered); // Update the filtered products based on search input
    };

    const handleUnlike = (productId) => {
        const url = API_URL + '/unlike-product';
        const data = {
            userId: localStorage.getItem('userId'),
            productId
        };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message === 'unliked success') {
                    const updatedProducts = products.filter((product) => product._id !== productId);
                    setProducts(updatedProducts);
                    setFilteredProducts(updatedProducts); // Update both lists
                } else {
                    alert('Failed to unlike the product.');
                }
            })
            .catch(() => {
                alert('Server error while unliking the product.');
            });
    };

    // Inline styles for card design
    const styles = {
        card: {
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '15px',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
        },
        cardImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderBottom: '1px solid #ddd',
        },
        cardBody: {
            padding: '15px',
            textAlign: 'center',
        },
        cardTitle: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333',
        },
        cardText: {
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '10px',
        },
        cardCategory: {
            fontSize: '0.8rem',
            color: '#aaa',
        },
        cardPrice: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'red',
        },
        unlikeButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
        },
        unlikeButtonHover: {
            backgroundColor: '#c82333',
        },
    };

    return (
        <div>
            {/* Header with search functionality */}
            <Header
                search={search}
                handlesearch={(value) => handleSearch(value)}
            />
            <Categories />

            <h5>Your Liked Products</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div
                            key={item._id}
                            style={styles.card}
                            className="product-card"
                        >
                            <img
                                src={`${API_URL}/${item.pimage}`}
                                alt={item.pname}
                                style={styles.cardImage}
                            />
                            <div style={styles.cardBody}>
                                <h5 style={styles.cardTitle}>{item.pname}</h5>
                                <p style={styles.cardText}>{item.pdesc}</p>
                                <p style={styles.cardCategory}>
                                    Category: {item.category}
                                </p>
                                <h6 style={styles.cardPrice}>${item.price}</h6>
                                <button
                                    style={styles.unlikeButton}
                                    onClick={() => handleUnlike(item._id)}
                                >
                                    Unlike
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No liked products found.</p>
                )}
            </div>
        </div>
    );
}

export default LikedProducts;
