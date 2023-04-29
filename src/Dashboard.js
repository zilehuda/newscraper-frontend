import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MediaCard from "./Components/Card/Card";
import SearchAndFilter from "./Components/SearchAndFilter/SearchAndFilter";
import axios from "axios";
import Masonry from "@mui/lab/Masonry";
import PreferencesPopup from "./Components/PreferencesPopup/PreferencesPopup";
import { useNavigate } from "react-router-dom";

const pages = [];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [articles, setArticles] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [queryParams, setqueryParams] = React.useState("");
  const popupRef = React.useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const settings = [
    {
      title: "Dashboard",
      function: () => {},
    },
    {
      title: "Preferences",
      function: () => {
        popupRef.current.click();
      },
    },
    {
      title: "Logout",
      function: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  React.useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = (page = 1) => {
    const params = queryParams ? `&${queryParams}` : "";
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/articles?page=${page}${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (page === 1) {
          setArticles(response.data.data.data);
        } else {
          setArticles([...articles, ...response.data.data.data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchAndFilter = (filters) => {
    const queryParams = `q=${filters.keyword}&category=${filters.category}&source=${filters.source}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}`;
    setqueryParams(queryParams);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/articles?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArticles(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePreferenceSave = (preferences) => {
    const data = {
      categories: preferences.categories,
      authors: preferences.authors,
      sources: preferences.sources,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/preferences`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        fetchArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoadMoreArticles = () => {
    setPage(page + 1);
  };
  React.useEffect(() => {
    if (page > 1) {
      fetchArticles(page);
    }
  }, [page]);
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              News Scraper
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              News Scrapper
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.function}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ paddingTop: 5 }} maxWidth="xl">
        <Box>
          <SearchAndFilter handleSearchAndFilter={handleSearchAndFilter} />
          <Masonry columns={3} spacing={2}>
            {articles &&
              articles?.map((item, ind) => <MediaCard {...item} key={ind} />)}
          </Masonry>
        </Box>
      </Container>
      <PreferencesPopup
        ref={popupRef}
        handlePreferenceSave={handlePreferenceSave}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "32px",
        }}
      >
        <Button onClick={handleLoadMoreArticles} variant="outlined">
          Load more
        </Button>
      </Box>
    </Box>
  );
}
export default ResponsiveAppBar;
