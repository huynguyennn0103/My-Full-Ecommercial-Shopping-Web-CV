import { red } from "@mui/material/colors"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();//object{pathname: /products/jeans}
  const cat = location.pathname.split("/")[2];//jeans
  const [filters,setFilters] = useState({})// state of color and size
  const [sort, setSort] = useState("newest")
  const handleFilters = (e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value
    })
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange = {handleFilters}>
            <Option  >
              Color
            </Option>
            <Option value={"white"}>White</Option>
            <Option value={"black"}>Black</Option>
            <Option value={"red"}>Red</Option>
            <Option value={"blue"}>Blue</Option>
            <Option value={"yellow"}>Yellow</Option>
            <Option value={"green"}>Green</Option>
          </Select>
          <Select name="size" onChange = {handleFilters}>
            <Option  >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=>{setSort(e.target.value)}}>
            {/* neu khong set value thi value = "Newest,Price (asc)" */}
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/* pass cat filters sort to products */}
      <Products cat={cat} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;