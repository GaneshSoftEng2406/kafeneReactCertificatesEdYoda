import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Products = () => {

    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [activeFilters, setActiveFilters] = useState({
        expired: true,
        low_stock: true,
    });

    const apiData = async () => {
        const { data } = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        setDisplayProducts(data);
        setProducts(data);
        setCount(data.length);
        console.log(data)
    }

    useEffect(() => {
        apiData();
        // eslint-disable-next-line
    }, [])



    const handleFilterCheck = (e) => {
        const filters = activeFilters;
        filters[e.target.name] = e.target.checked;

        let myproducts = products
        if (filters['expired'] && filters['low_stock']) {
            setDisplayProducts(myproducts)
            setCount(myproducts.length)

            return
        }

        let disprod = []
        for (const product of products) {
            let { expiryDate, stock } = product

            if (filters['low_stock'] === true && !filters['expired']) {
                const newDate = new Date()
                expiryDate = new Date(expiryDate)
                if (expiryDate > newDate) {
                    disprod.push(product)
                }
            }
            if (filters['expired'] && !filters['low_stock']) {
                if (stock > 100) {
                    disprod.push(product)
                }
            }
            if (!filters['expired'] && !filters['low_stock']) {
                const newDate = new Date()
                expiryDate = new Date(expiryDate)
                if (expiryDate > newDate && stock > 100) {
                    disprod.push(product)
                }
            }

            setDisplayProducts(disprod);
            setCount(disprod.length)
        }
    }




    return (
        <main className="main_container">
            <div className="Homepage_PageWrapper">
                <h1 className="Homepage_MainHeading">Products</h1>
                <div className="Homepage_OrdersWrapper">
                    <div className="Homepage_FilterWrapper">
                        <h3>Filters</h3>
                        <div className="Homepage_FilterOptions">
                            <p>Count: <span id="count">{count}</span></p>
                            <label className="Homepage_FilterCheckbox">
                                <input
                                    type="checkbox" name='expired'
                                    checked={activeFilters['expired']}
                                    onChange={handleFilterCheck}
                                />Expired
                            </label>
                            <label className="Homepage_FilterCheckbox">
                                <input
                                    type="checkbox" name='low_stock'
                                    checked={activeFilters['low_stock']}
                                    onChange={handleFilterCheck}
                                />
                                Low-Stock
                            </label>
                        </div>
                    </div>

                    <div style={{ width: "100%" }}>
                        <table className="Homepage_OrderTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {
                                    displayProducts !== [] ? displayProducts.map((item, idx) => (
                                        <tr className='Homepage_TableRow' key={item.id + '' + idx}>
                                            <td className="Homepage_SecondaryText">{item.id}</td>
                                            <td className="Homepage_PrimaryText">{item.medicineName}</td>
                                            <td className="Homepage_PrimaryText">{item.medicineBrand}</td>
                                            <td className="Homepage_SecondaryText">{item.expiryDate}</td>
                                            <td className="Homepage_PrimaryText">{item.unitPrice}</td>
                                            <td className="Homepage_PrimaryText">{item.stock}</td>
                                        </tr>
                                    ))
                                        :
                                        null
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Products;
