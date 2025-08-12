// src/pages/Details.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: #3498db;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const ProductImage = styled.img`
  width: 250px;
  border-radius: 8px;
  object-fit: contain;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Product not found</p>;

  return (
    <Container>
      <BackLink to="/">
        <FaArrowLeft /> Back to Home
      </BackLink>
      <DetailsWrapper>
        <ProductImage src={product.image} alt={product.title} />
        <div>
          <h1>{product.title}</h1>
          <Price>${product.price}</Price>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>{product.description}</p>
        </div>
      </DetailsWrapper>
    </Container>
  );
}

export default Details;
