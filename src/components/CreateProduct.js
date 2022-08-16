import React, { useState } from "react";
import { createNewProduct } from "../apiAdapter";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ productsList, setProductsList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [roast, setRoast] = useState("");
  const [grind, setGrind] = useState("");
  const [country, setCountry] = useState("");
  const [inventory, setInventory] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const freshProduct = await createNewProduct(
      token,
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
      await setProductsList([freshProduct, ...productsList]);
      navigate("./");
    }
  }

  return (
    <div className="bg-gradient-to-t from-rose-300 to-yellow-600 h-screen flex flex-col justify-center items-center pb-24">
      <h1 className="font-bold text-3xl" id="addRoutineTitle">
        Add A Product
      </h1>
      {error && error.message ? <h3>{error.message}</h3> : null}
      <form className="flex flex-col font-medium  " onSubmit={handleSubmit}>
        <label className="my-2">
          Name:
          <input
            className="flex rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label className="my-2">
          Description:
          <input
            className="flex rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        <label className="my-2">
          Price:
          <input
            className="flex rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            type="text"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </label>
        <label className="my-2 ">
          Inventory:
          <input
            className="flex rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
            value={inventory}
            type="text"
            onChange={(event) => {
              setInventory(event.target.value);
            }}
          />
        </label>
        <label className="my-2">
          Weight:
          <input
            className="flex rounded-md focus:ring-rose-900 focus:border-rose-900 focus:z-10"
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
            <option value="Whole Beans">Brazil</option>
            <option value="Ground">Vietnam</option>
            <option value="Instant">Colombia</option>
            <option value="Instant">Indonesia</option>
            <option value="Instant">Ethiopia</option>
            <option value="Instant">Honduras</option>
            <option value="Instant">India</option>
            <option value="Instant">Uganda</option>
          </select>
        </label>

        <button
          className="container font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500"
          type="submit"
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
