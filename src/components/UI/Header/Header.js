import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { ReactComponent as Menu } from "../../../assets/menu.svg";
import lightTheme from "../../../assets/lightTheme.svg";
import darkTheme from "../../../assets/darkTheme.svg";

import { links } from "../../../data/links";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckLogin, fetchLogout } from "../../../store/User/user-action";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const Header = () => {
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

  const handleMenuClickEvent = (e) => {
    if (e.target.href.indexOf("logout") !== -1 && isLogined) {
      e.preventDefault();
      dispatch(fetchLogout());
      //navigator("/");
    }
    if (showLinks) {
      toggleShowLinks();
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
              <Logo className={classes.logo} alt="한 줄 일기 사이트 로고" />
            </Link>
            <div className={classes.button_container}>
              <button
                data-testid="changeTheme"
                className={classes.theme_toggle_main}
                onClick={toggleChangeTheme}
              >
                <div className={classes.theme_toggle_main_img}>
                  <img
                    width="22"
                    height="22"
                    src={theme === "light-theme" ? lightTheme : darkTheme}
                    alt={
                      theme === "light-theme"
                        ? "라이트 화면 모드"
                        : "다크 화면 모드"
                    }
                  />
                </div>
              </button>
              <button
                className={classes.nav_toggle}
                data-testid="toggleShowLinks"
                onClick={toggleShowLinks}
              >
                <Menu className={classes.nav_toggle_menu} alt="메뉴" />
              </button>
            </div>
          </div>
          <div className={classes.menu_center}>
            <button
              className={classes.theme_toggle_sub}
              arai-label="모바일 메뉴"
              onClick={toggleChangeTheme}
            >
              <div className={classes.theme_toggle_sub_img}>
                <img
                  src={theme === "light-theme" ? lightTheme : darkTheme}
                  className="menu"
                  alt={
                    theme === "light-theme"
                      ? "라이트 화면 모드"
                      : "다크 화면 모드"
                  }
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
                      onClick={handleMenuClickEvent}
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

export default Header;
