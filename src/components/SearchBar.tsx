import React from "react";
import styled from "styled-components";

interface ISearchBar {
  keyword?: string;
  handleSearch: (value: string) => void;
}

const SearchBarInput = styled.input`
  width: 400px;
  background: #f2f1f9;
  border: none;
  padding: 10px 20px;
`;
const SearchBar: React.FC<ISearchBar> = ({ keyword, handleSearch }) => {
  return (
    <SearchBarInput
      key="random1"
      value={keyword}
      placeholder={"Search repositories by name"}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchBar;
