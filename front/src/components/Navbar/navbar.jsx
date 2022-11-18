import React from 'react';
// import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import MyNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'


function Navbar() {

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false);
  }

  let button;
  if (!localStorage.getItem("token")) {
    button = <Nav.Link href="/login"> LOGIN </Nav.Link >;
  } else {
    button = <Nav.Link onClick={handleLogout}> LOGOUT </Nav.Link>;
  }

  let account;
  if (!localStorage.getItem("token")) {
    account = <Nav.Link href="/login"> ACCOUNT </Nav.Link>;
  } else {
    account = <Nav.Link href="/account"> ACCOUNT </Nav.Link>;
  }

  return (

    <MyNavbar bg="light" expand="lg">
      <Container fluid>
        <MyNavbar.Brand href="/" className='logo'>ANIMAL HOUSE</MyNavbar.Brand>
        <MyNavbar.Toggle aria-controls="basic-navbar-nav" />
        <MyNavbar.Collapse className='collapse'>
          <Nav className="me-auto">
            <Nav.Link className="menuItems" href="/commerce">ECOMMERCE</Nav.Link >
            <Nav.Link className="menuItems" href="/pinboards">PINBOARDS</Nav.Link >
            <Nav.Link className="menuItems" href="/locations">LOCATIONS</Nav.Link >
            <NavDropdown className="menuItems" id="nav-dropdown-light-example" title="SERVICES">
              <NavDropdown.Item href="/services:At%20Home"> AT HOME </NavDropdown.Item>
              <NavDropdown.Item href="/services:Online"> ON LINE </NavDropdown.Item>
              <NavDropdown.Item href="/services:In%20Store"> IN STORE </NavDropdown.Item>
            </NavDropdown>

            <div className='account'>
              <Nav.Link className="menuItems" href="/cart">CART</Nav.Link >
              {button}
              {account}
            </div>
          </Nav>
        </MyNavbar.Collapse>
      </Container>
    </MyNavbar>
  );
}

export default Navbar;
