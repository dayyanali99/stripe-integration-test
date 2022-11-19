const products = [
    {
        id: "price_1M5ejfKRVoH9Fxm1SaFoBB6N",
        title: "Coffee",
        price: 4.99
    },
    {
        id: "price_1M5el0KRVoH9Fxm197rGARLG",
        title: "Sunglasses",
        price: 9.99
    },
    {
        id: "price_1M5elZKRVoH9Fxm17SnTjpQk",
        title: "Camera",
        price: 39.99
    },
];

function getProductData(id) {
    let productData = products.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }
    return productData;
}

export {products, getProductData};