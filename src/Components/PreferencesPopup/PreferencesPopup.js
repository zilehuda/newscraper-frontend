import { forwardRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";

const Popup = forwardRef(({ handlePreferenceSave }, ref) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [sourceList, setsourceList] = useState([]);
  const [authorList, setauthorList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchCategories(token);
    fetchSources(token);
    fetchAuthors(token);
    fetchPreferences(token);
  }, []);

  const fetchPreferences = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/preferences`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("iM pref: ", response);
        setCategories(response.data.data.categories);
        setSources(response.data.data.sources);
        setAuthors(response.data.data.authors);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchCategories = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setcategoryList(response.data.categories);
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
        setsourceList(response.data.sources);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAuthors = (token) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/authors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setauthorList(response.data.authors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSources(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthors(event.target.value);
  };

  const handleSaveChanges = () => {
    const preferences = {
      categories,
      sources,
      authors,
    };
    handlePreferenceSave(preferences);
    handleClose();
  };

  return (
    <Box>
      <Button onClick={handleOpen} ref={ref}></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              multiple={true}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categories}
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Source</InputLabel>
            <Select
              multiple={true}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sources}
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Author</InputLabel>
            <Select
              multiple={true}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={authors}
              label="Author"
              onChange={handleAuthorChange}
            >
              {authorList &&
                authorList.map((elem, ind) => (
                  <MenuItem value={elem} key={ind}>
                    {elem}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});
Popup.displayName = "Popup";
export default Popup;
