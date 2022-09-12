const inputValue = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    input.value = "";
    return value;
}

const addProduct = () => {
    const product_name = inputValue("product-name");
    const product_quantity = inputValue("product-quantity");
    // const number=Number(product_quantity);
    // console.log(Number.isInteger(number))
    if (!isNaN(product_name) || isNaN(product_quantity)) {
        alert('please provide valid input')
        return;
    }
    // console.log(product_name, product_quantity);

    setProductInLocalStorage(product_name, product_quantity);
    // console.table(getLocalStorageData())
    // window.location.reload();
    display();

}
// getfromlocalstorag to avoid replacing values

const getLocalStorageData = () => {
    const products = JSON.parse(localStorage.getItem('all_products'));
    return products;
}

// set to localstorage

const setProductInLocalStorage = (name, quantity) => {
    // console.log(name, quantity);

    let products = getLocalStorageData();
    if (!products) {
        products = {};

    }
    // for updating quantity(last step)
    if (products[name]) {
        products[name] = parseInt(products[name]) + parseInt(quantity)
    }

    else {
        products[name] = quantity;
    }
    // to set product name and value in the object


    // set data in localstorage;
    localStorage.setItem('all_products', JSON.stringify(products))

}


// display data\
const display = () => {
    const productsFromLocalStorage = getLocalStorageData();
    const section = document.getElementById("all-products");
    section.textContent = '';

    for (product in productsFromLocalStorage) {
        const name = product;
        const amount = productsFromLocalStorage[name];
        // console.log(name, amount);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded">
            <span class="fs-4">${name}</span>
            Quantity:<small class="fw-bold">
                ${amount}
            </small>
        </div>
        `
        section.appendChild(div);
    }
    // section.textContent = '';
}
display();