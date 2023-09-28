import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";

import { links } from "../data/links";
import { useSelector } from "react-redux";

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const isLogined = useSelector((state) => state.ui.isLogined);

  const toggleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header>
      <nav>
        <div className={classes.nav_center}>
          <div className={classes.nav_header}>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="로고" />
            </Link>
            <button className={classes.nav_toggle} onClick={toggleShowLinks}>
              <img src={menu} className="menu" alt="메뉴" />
            </button>
          </div>
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
                    to={url}
                    className={url === "/login" ? classes.login_btn : ""}
                  >
                    {url === "/login" ? (isLogined ? "로그아웃" : text) : text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
