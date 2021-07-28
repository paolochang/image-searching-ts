import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  width: 45%;
`;
const Input = styled.input`
  width: 80%;
  height: 40px;
  margin: 10px 0;
  padding-left: 1rem;
  font-size: 1.6rem;
`;
const Button = styled.button`
  width: 16%;
  height: 46px;
`;

interface Props {
  onSubmitKeyword: any;
}

const SearchBar: React.FC<Props> = ({ onSubmitKeyword }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <Container>
      <Form onSubmit={(event) => onSubmitKeyword(event, keyword)}>
        <Input
          placeholder="Search by keyword"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
