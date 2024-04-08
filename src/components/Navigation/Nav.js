import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons";
import Search from "./Search";
import Genre from  "./Genre";
import './nav.css';
import SideBar from "./Sidebar";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBRipple,
  MDBBadge,
  MDBInput
} from 'mdb-react-ui-kit';

function Nav() {
  const [isActive, setIsActive] = useState(false);
  const { height, width } = useWindowDimensions();

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

  return (
    <div>
      <NavBar>
 
    
          {width  <= 600 && (
          <IconContext.Provider
            value={{
              size: "1.5rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          > 
        <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                
                            <div className={menu_class}>
                             <Links to="/trending/1 ">Trending</Links>
          <Links to="/popular/1">Popular</Links>
                              <Links to="/schedule/1">Schedule Anime</Links>

                    <Links to="/recent/1">Recent Anime</Links>
                                    <Links to="/animechart/1">Anime Chart</Links>

                                <Genre/> 
                            </div>
                            </IconContext.Provider>
                             )}

                           {/* 
                           <div className="app">
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;  
      </button>
      {sidebarOpen && 
        <div className="sidebar">
          <Links to="/trending/1 ">Trending</Links>
          <Links to="/popular/1">Popular</Links>
                    <Links to="/recent/1">Recent Anime</Links>
            
                            <Genre/>  
        </div>
      }
    </div>  
                           
                           */}  
                           
        <Link to="/">
          <img src="./assets/logo1.png" alt="Logo Here" />
        </Link>
          
         
        <div className="nav-links">
          <Links to="/trending/1 ">Trending</Links>
          <Links to="/popular/1">Popular</Links>
                    <Links to="/schedule/1">Schedule Anime</Links>
                                        <Links to="/recent/1">Recent Anime</Links>

                <Links to="/animechart/1">Anime Chart</Links>
                            <Genre/>  
        </div>
        

        {width <= 600 && (
          <IconContext.Provider
            value={{
              size: "1.5rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <Button onClick={(e) => setIsActive(!isActive)}>
              <FiSearch />
            </Button>
          </IconContext.Provider>
        )}
        {width > 600 && (
          <IconContext.Provider
            value={{
              size: "1rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <Button onClick={(e) => setIsActive(!isActive)}>
               Search
            </Button>
          </IconContext.Provider>
        )}
      </NavBar>
      {isActive && <Search isActive={isActive} setIsActive={setIsActive} />}
      {isActive && <Shadow></Shadow>}
    </div>
  );
}

const Shadow = styled.div`
  z-index: 9;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 98.6vw;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

const Button = styled.button`
  color: white;
  font-family: "Lexend", sans-serif;
  font-weight: 500;
  background-color: #DB202C;
  outline: none;
  border: none;
  padding: 0.7rem 1.6rem 0.7rem 1.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  FiSearch {
    font-size: 1rem;
  }
  white-space: nowrap;
  @media screen and (max-width: 600px) {
    padding: 0.5rem;
    padding-right: 0;
    background-color: transparent;
  }
`;

const Links = styled(Link)`
  color: white;
  font-weight: 400;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.8rem 5rem 0 5rem;
  

  img{
    height: 4rem;
  }
  @media screen and (max-width: 600px) {
    margin: 1rem 2rem;
    margin-top: 1rem;
    img {
      height: 1.7rem;
    }
    .nav-links {
      display: none;
    }
  }
`;

export default Nav;
