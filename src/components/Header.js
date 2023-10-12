import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Header.module.css";
import logo from "../assets/logo.png";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Menu } from "../assets/menu.svg";
import lightTheme from "../assets/lightTheme.svg";
import darkTheme from "../assets/darkTheme.svg";

import { links } from "../data/links";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckLogin, fetchLogout } from "../store/user-action";
import { uiActions } from "../store/ui-slice";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const Header = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [showLinks, setShowLinks] = useState(false);
  const isLogined = useSelector((state) => state.ui.isLogined);
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const toggleChangeTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  const handleLogout = (e) => {
    if (e.target.href.indexOf("logout") !== -1 && isLogined) {
      e.preventDefault();
      dispatch(fetchLogout());
      //navigator("/");
    }
  };

  useEffect(() => {
    dispatch(fetchCheckLogin({}));
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header>
      <nav>
        <div className={classes.nav_center}>
          <div className={classes.nav_header}>
            <Link to="/">
              <Logo className={classes.logo} />
              {/* <img src={logo} className={classes.logo} alt="로고" /> */}
            </Link>
            <div className={classes.button_container}>
              <button
                data-testid="changeTheme"
                className={classes.theme_toggle_main}
                onClick={toggleChangeTheme}
              >
                <div className={classes.theme_toggle_main_img}>
                  <img
                    src={theme === "light-theme" ? lightTheme : darkTheme}
                    alt="화면 색상 모드"
                  />
                </div>
              </button>
              <button
                className={classes.nav_toggle}
                data-testid="toggleShowLinks"
                onClick={toggleShowLinks}
              >
                {/* <img src={menu} className="menu" alt="메뉴" /> */}
                <Menu className={classes.nav_toggle_menu} alt="nav menu" />
              </button>
            </div>
          </div>
          <div className={classes.menu_center}>
            <button
              className={classes.theme_toggle_sub}
              onClick={toggleChangeTheme}
            >
              <div className={classes.theme_toggle_sub_img}>
                <img
                  src={theme === "light-theme" ? lightTheme : darkTheme}
                  className="menu"
                  alt={theme}
                />
              </div>
            </button>
            <ul
              className={[
                classes.links,
                showLinks === true ? classes.show_links : "",
              ].join(" ")}
            >
              {links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <Link
                      to={
                        url === "/login" ? (isLogined ? "/logout" : url) : url
                      }
                      className={url === "/login" ? classes.login_btn : ""}
                      onClick={handleLogout}
                      data-testid={isLogined ? "toggleLogout" : ""}
                    >
                      {url === "/login"
                        ? isLogined
                          ? "로그아웃"
                          : text
                        : text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
