// src/components/Table.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const Th = styled.th`
  background-color: #34495e;
  color: white;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #ecf0f1;
  }
`;

function Table({ products }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Price</Th>
          <Th>Category</Th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.id}</Td>
            <Td>
              <Link to={`/details/${product.id}`}>{product.title}</Link>
            </Td>
            <Td>${product.price}</Td>
            <Td>{product.category}</Td>
          </Tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Table;
