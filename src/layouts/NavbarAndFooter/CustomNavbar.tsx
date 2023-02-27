import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form, Row, Col, FormControl, Button } from "react-bootstrap";
import myLogo from '../../Images/PublicImages/logo.jpg';

export const CustomNavbar = () => {
    return (
        <Navbar className='navbar navbar-dark navbar-expand-lg main-color py-2 d-flex'>
            <Nav className='container-fluid'>
                <img src={myLogo} width={50} height={50} />
                <div className='navbar-brand logo' >Book</div>
                
                <ul className='navbar-nav '>
                    <li className='nav-item'>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link'
                        }>Home</NavLink>
                    </li>
                    <div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle nav-link bg-transparent" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Categories
  </a>

  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
                </ul>
                <ul className="position-relative flex-grow-1 m-auto">
                    <Form className="">
                        <Row className="">
                            <Col className="w-100">
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                />
                            </Col>
                            <Col >
                                <Button variant="outline-light">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ul>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <Link type='button' className='btn btn-outline-light' to="/signup">Sigh in</Link>
                    </li>
                </ul>
            </Nav>
        </Navbar>
    );
}
