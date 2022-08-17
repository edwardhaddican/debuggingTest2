import React, { useState, useEffect } from "react";
import { getProductsByAdmin, updateProduct } from "../apiAdapter";

const UpdateProducts = ({ myProducts, setMyProducts, productId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [roast, setRoast] = useState("");
  const [grind, setGrind] = useState("");
  const [inventory, setInventory] = useState(0);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const freshProduct = await updateProduct(
      token,
      productId,
      name,
      description,
      price,
      inventory,
      weight,
      roast,
      grind,
      country
    );
    if (freshProduct.error) {
      setError(freshProduct);
    } else {
      setError(null);
      freshProduct;
      const newEditedProduct = await getProductsByAdmin(username);

      setMyProducts(newEditedProduct);
    }
  }
  useEffect(() => {}, [myProducts]);

  return (
    <div className="flex flex-col absolute  bg-white">
      <h1 id="addRoutineTitle">UPDATE PRODUCT</h1>
      {error && error.message ? (
        <h3>There Is Already A Product With That Name</h3>
      ) : null}
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="update Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label className="flex flex-col">
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        <label className="flex flex-col">
          Price:
          <input
            type="text"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </label>
        <label className="flex flex-col">
          Weight:
          <input
            value={weight}
            type="text"
            onChange={(event) => {
              setWeight(event.target.value);
            }}
          />
        </label>
        <label className="my-2">
          Roast:
          <select
            id="roast"
            className="flex w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={roast}
            onChange={(event) => {
              setRoast(event.target.value);
            }}
          >
            <option defaultValue>--Select Roast--</option>
            <option value="Light">Light</option>
            <option value="Mild">Mild</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </label>
        <label className="my-2">
          Grind:
          <select
            id="grind"
            className="flex w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={grind}
            onChange={(event) => {
              setGrind(event.target.value);
            }}
          >
            <option defaultValue>--Select Grind--</option>
            <option value="Whole Beans">Whole Beans</option>
            <option value="Ground">Ground</option>
            <option value="Instant">Instant</option>
          </select>
        </label>
        <label className="my-2">
          Country:
          <select
            id="Country"
            className="flex w-full text-center rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          >
            <option defaultValue>--Select Country--</option>
            <option value="Brazil">Brazil</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Colombia">Colombia</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Hondurus">Honduras</option>
            <option value="India">India</option>
            <option value="Uganda">Uganda</option>
          </select>
        </label>
        <label className="flex flex-col">
          Inventory:
          <input
            value={inventory}
            type="text"
            onChange={(event) => {
              setInventory(event.target.value);
            }}
          />
        </label>
        <button className="container font-medium mt-2  py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
