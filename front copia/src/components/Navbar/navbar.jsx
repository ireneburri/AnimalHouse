import axios from 'axios';
import React, { useState } from 'react';
// import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import MyNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'


function Navbar() {
  const getCurrentCart = window.localStorage.getItem('cart');
  const currentCart = JSON.parse(getCurrentCart);
  const username = window.localStorage.getItem('username');
  const [listItems, setListItems] = useState([]);
  const date = new Date()
  var vipItem = false

  const handleLogout = () => {
    console.log(currentCart)
    if (currentCart !== null && currentCart !== []) {
      console.log('sticazzi')
      var sum = currentCart.reduce(function (acc, obj) { return acc + obj.items.price * obj.quantity; }, 0);

      var strcart = JSON.stringify(currentCart);
      listItems.push(strcart);
      console.log(strcart);

      console.log(listItems);
      axios.post('http://site212224.tw.cs.unibo.it/Order/', {
        client_id: '638a43569d836700070fa273',
        username: username,
        products: listItems,
        price: sum,
        date: date,
        vip: vipItem,
        completed: 'false'
      }).then((res) => {
        console.log(res);
        localStorage.clear();
        window.location.reload(false);
      })
    }
    else {
      localStorage.clear();
      window.location.reload(false);
    }
  }

  let login;
  if (!localStorage.getItem("token")) {
    login = <Nav.Link href="/login" style={{paddingRight:'1em'}}> LOGIN </Nav.Link >;
  } else {
    login = <Nav.Link onClick={handleLogout} style={{paddingRight:'1em'}}> LOGOUT </Nav.Link>;
  }

  let account;
  if (!localStorage.getItem("token")) {
    account = <Nav.Link href="/login" style={{paddingRight:'1em'}}> ACCOUNT </Nav.Link>;
  } else {
    account = <Nav.Link href="/account" style={{paddingRight:'1em'}}> ACCOUNT </Nav.Link>;
  }

  return (

    <MyNavbar bg="light" expand="lg">
      <Container fluid>
        <MyNavbar.Brand href="/" className='logo'>ANIMAL HOUSE</MyNavbar.Brand>
        <MyNavbar.Toggle aria-controls="basic-navbar-nav" />
        <MyNavbar.Collapse className='collapse'>
          <Nav className="me-auto">
            <NavDropdown className="menuItems" id="nav-dropdown-light-example" title="ECOMMERCE">
              <NavDropdown.Item href="/commerce"> PRODUCTS </NavDropdown.Item>
              <NavDropdown.Item href="/animalcommerce"> CUBS </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="menuItems" href="/pinboards">PINBOARDS</Nav.Link >
            <Nav.Link className="menuItems" href="/locations">LOCATIONS</Nav.Link >
            <NavDropdown className="menuItems" id="nav-dropdown-light-example" title="SERVICES">
              <NavDropdown.Item href="/services:At%20Home"> AT HOME </NavDropdown.Item>
              <NavDropdown.Item href="/services:Online"> ON LINE </NavDropdown.Item>
              <NavDropdown.Item href="/services:In%20Store"> IN STORE </NavDropdown.Item>
            </NavDropdown>

            <div className='account'>
              <Nav.Link className="menuItems" style={{paddingRight:'1em'}} href="/cart">CART</Nav.Link >
              {account}
              {login}
            </div>
          </Nav>
        </MyNavbar.Collapse>
      </Container>
    </MyNavbar>
  );
}

export default Navbar;
