import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import PreferencesPopup from "../PreferencesPopup/PreferencesPopup";
import axios from "axios";

const SearchAndFilter = ({ handleSearchAndFilter }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchCategories(token);
    fetchSources(token);
  }, []);

  const fetchCategories = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategoryList(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSources = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/sources`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSourceList(response.data.sources);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filter = {
      keyword,
      category,
      source,
      dateFrom,
      dateTo,
    };
    handleSearchAndFilter(filter);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        marginBottom: "32px",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ m: 1, ml: 0, width: "100%" }}
        label="Keyword"
        variant="outlined"
        value={keyword}
        onChange={handleKeywordChange}
      />
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          {categoryList &&
            categoryList.map((elem, ind) => (
              <MenuItem value={elem} key={ind}>
                {elem}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="source-label">Source</InputLabel>
        <Select
          labelId="source-label"
          id="source-select"
          value={source}
          label="Source"
          onChange={handleSourceChange}
        >
          {sourceList &&
            sourceList.map((elem, ind) => (
              <MenuItem value={elem} key={ind}>
                {elem}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ m: 1, width: "100%" }}
        id="date-from"
        label="From"
        type="date"
        value={dateFrom}
        onChange={handleDateFromChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={{ m: 1, width: "100%" }}
        id="date-to"
        label="To"
        type="date"
        value={dateTo}
        onChange={handleDateToChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ inputProps: { min: dateFrom } }}
      />
      <Button
        sx={{ marginRight: "8px" }}
        variant="contained"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </Button>
      {/* <IconButton color="primary" aria-label="search" component="label">
        <SearchIcon />
      </IconButton> */}
      {/* <PreferencesPopup></PreferencesPopup> */}
    </Box>
  );
};

export default SearchAndFilter;
