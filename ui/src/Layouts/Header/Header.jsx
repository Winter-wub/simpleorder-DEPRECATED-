import {
  Badge, Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/brand.css';


const Header = () => (
  <Navbar color="dark" light expand="md" className="Navbar" fixed="top">
    <NavbarBrand className="pull-sm-right"><div className="Title">แม่! วันนี้มีอะไรกิน <Badge color="danger">Now</Badge></div></NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link to="/"><Button color="info"><FontAwesome.FaHome /></Button></Link>
      </NavItem>
    </Nav>
  </Navbar>
);
export default Header;

