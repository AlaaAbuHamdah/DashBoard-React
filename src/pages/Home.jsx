// src/pages/Home.js
import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import styled from "styled-components";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: #2980b9;
  }
`;

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const sortByPrice = (order) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  return (
    <Container>
      <Title>🛒 Products Dashboard</Title>
      <Actions>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button onClick={() => sortByPrice("asc")}>
          <FaSortAmountUp /> Sort ↑
        </Button>
        <Button onClick={() => sortByPrice("desc")}>
          <FaSortAmountDown /> Sort ↓
        </Button>
      </Actions>
      {loading ? <Loader /> : <Table products={filteredProducts} />}
    </Container>
  );
}

export default Home;
