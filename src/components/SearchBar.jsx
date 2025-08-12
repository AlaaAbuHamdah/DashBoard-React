// src/components/SearchBar.js
import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  position: relative;
  width: 250px;
`;

const Input = styled.input`
  padding: 8px 35px 8px 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Icon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search by title or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Icon />
    </SearchContainer>
  );
}

export default SearchBar;
