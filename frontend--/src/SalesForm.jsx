import React, { useState } from "react";

function AddSaleForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Send data to backend
    try {
      const response = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: productName,
          price: price,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        alert("✅ Sale added successfully!");
        setProductName("");
        setPrice("");
        setQuantity("");
      } else {
        alert("❌ Failed to add sale. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
}

export default AddSaleForm;