import {
  Badge, Button, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/brand.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Navbar color="dark" light expand="md" className="Navbar" fixed="top">
        <NavbarBrand className="pull-sm-right"><div className="Title">จะสั่งอะไรก็สั่ง <Badge color="danger">Now</Badge></div></NavbarBrand>
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/"><Button color="danger">Home</Button></Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default Header;

