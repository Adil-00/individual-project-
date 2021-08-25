import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContex } from "../Auth/AuthContex";
import logo from "../img/logo/logo-white.png";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./Header.css";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PersonIcon from "@material-ui/icons/Person";
import { PERSONAL } from "../Helpers/constans";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white!important",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Header = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [flag, setFlag] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user, handleOut, emailFlag, ADMIN, PERSONAL } =
    useContext(authContex);
  const classes = useStyles();

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  useEffect(() => {
    if (user.length > 0) {
      if (user[0].login === ADMIN || user[0].login === PERSONAL) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    } else {
      setFlag(false);
    }
  }, [user.length]);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div className={classes.menu}>
        {emailFlag ? (
          <>
            <Link style={{ textDecoration: "none" }} to="liked">
              <IconButton color="primary">
                {user.length > 0 ? user[0].login : null}
              </IconButton>
            </Link>
            <IconButton onClick={() => handleOut()} color="primary">
              <MeetingRoomIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Link to="registration">
              <IconButton color="primary">
                <PersonAddIcon />
              </IconButton>
            </Link>
            <Link to="login">
              <IconButton color="primary">
                <PersonIcon />
              </IconButton>
            </Link>
          </>
        )}
      </div>
    </Menu>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header_row">
          <div className="header__logo">
            <div>
              <Link to="/">
                <img className="logo" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="header__navBar">
            <div className="navBar">
              {emailFlag ? (
                <div>
                  <Link to={flag ? "" : "/liked"}>
                    <button className="email-user">
                      {user.length > 0 ? user[0].login : null}
                    </button>
                  </Link>
                  <Link to="/">
                    <button onClick={() => handleOut()} className="email-user">
                      Выйти
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="registration">
                    <button className="header_btn">Регистрация</button>
                  </Link>
                  <Link to="login">
                    <button className="header_btn">Войти</button>
                  </Link>
                </>
              )}
            </div>
            <div>
              <IconButton
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                aria-label="display more actions"
                edge="end"
                className={`${classes.root} header_more_btn`}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {renderMobileMenu}
    </header>
  );
};

export default Header;
