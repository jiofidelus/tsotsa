/** @format */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from 'reactstrap';

export default function NavComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const activeStyle = { color: '#F15B2A' };

  const pseudo = localStorage.getItem('pseudo');
  const surname = localStorage.getItem('surname');

  console.log(pseudo);

  return (
    <Navbar color='light' light expand='md'>
      <NavbarBrand acti href='/'>
        Food Ontology 237
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <NavLink
              exact
              activeStyle={activeStyle}
              className='nav-link'
              to='/'
            >
              Acceuil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              exact
              activeStyle={activeStyle}
              className='nav-link'
              to='/recherche'
            >
              Recherche
            </NavLink>
          </NavItem>

          {pseudo && (
            <>
              <NavItem>
                <NavLink
                  exact
                  activeStyle={activeStyle}
                  className='nav-link'
                  to='/enrichir'
                >
                  Enrichir
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  exact
                  activeStyle={activeStyle}
                  className='nav-link'
                  to='/proposition'
                >
                  Proposition
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  exact
                  activeStyle={activeStyle}
                  className='nav-link'
                  to='/collecte'
                >
                  Collecte des faits
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        {pseudo ? (
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag='a' className='nav-link' caret>
              {pseudo} - {surname}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag='a' href='/blah' active>
                Deconnexion
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavbarText>
            <NavLink
              exact
              activeStyle={activeStyle}
              className='nav-link'
              to='/connexion'
            >
              Connexion
            </NavLink>
          </NavbarText>
        )}
      </Collapse>
    </Navbar>
  );
}
