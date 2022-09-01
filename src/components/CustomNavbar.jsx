import { Navbar, Nav } from 'react-bootstrap'

const CustomNavbar = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Pasta Restaurant - {props.brand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#menu">Menu</Nav.Link>
          <Nav.Link href="#prenotazioni">Prenotazioni</Nav.Link>
          <Nav.Link href="#contatti">Contatti</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar

// VERSIONE ABBREVIATA
// const CustomNavbar = () => (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//     <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav className="mr-auto">
//         <Nav.Link href="#features">Features</Nav.Link>
//         <Nav.Link href="#pricing">Pricing</Nav.Link>
//         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">
//             Another action
//             </NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action/3.4">
//             Separated link
//             </NavDropdown.Item>
//         </NavDropdown>
//         </Nav>
//         <Nav>
//         <Nav.Link href="#deets">More deets</Nav.Link>
//         <Nav.Link eventKey={2} href="#memes">
//             Dank memes
//         </Nav.Link>
//         </Nav>
//     </Navbar.Collapse>
//     </Navbar>
// )
