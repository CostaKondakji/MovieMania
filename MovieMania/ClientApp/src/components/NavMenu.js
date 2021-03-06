import React, { Component } from 'react';
import { Collapse, Container, Navbar,Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
            <Navbar dark fixed="top" expand="lg" className="border-bottom mb-3">
          <Container>
            <NavbarBrand tag={Link} to="/">MovieMania</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link" to="/profiles">Profiles</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
