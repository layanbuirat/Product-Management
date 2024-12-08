let products = [];
let counter = 0;
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const counterDisplay = document.getElementById("counter");
const increaseCounterButton = document.getElementById("increaseCounter");
const productDetailsSection = document.querySelector(".product-details");
const toggleProductDetailsButton = document.getElementById("toggleProductDetails");

// CRUD Operations
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value.trim();

    if (!name || !description || !price || !category) {
        Swal.fire("Error", "All fields are required", "error");
        return;
    }

    if (id) {
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex > -1) {
            products[productIndex] = { id, name, description, price, category };
            Swal.fire("Updated", "Product updated successfully", "success");
        }
    } else {
        const newProduct = {
            id: Date.now().toString(),
            name,
            description,
            price,
            category,
        };
        products.push(newProduct);
        Swal.fire("Added", "Product added successfully", "success");
    }

    form.reset();
    renderProducts();
});

function renderProducts() {
    productList.innerHTML = products
        .map(
            (product) => `
        <tr>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct('${product.id}')">Edit</button>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        </tr>
    `
        )
        .join("");
}

function editProduct(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
        document.getElementById("productId").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("category").value = product.category;
    }
}

function deleteProduct(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            products = products.filter((p) => p.id !== id);
            renderProducts();
            Swal.fire("Deleted", "Product deleted successfully", "success");
        }
    });
}

// Counter Increment
increaseCounterButton.addEventListener("click", () => {
    counter++;
    counterDisplay.textContent = counter;
});

// Toggle Product Details
toggleProductDetailsButton.addEventListener("click", () => {
    const isVisible = productDetailsSection.style.display === "block";
    productDetailsSection.style.display = isVisible ? "none" : "block";
    toggleProductDetailsButton.textContent = isVisible ? "Show Product" : "Hide Product";
});
