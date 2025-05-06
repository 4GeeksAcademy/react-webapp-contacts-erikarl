import { Link } from "react-router-dom";

const Navbar = () => {  
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="ms-auto">
        <Link to="/add-contact" className="me-5">
          <button className="btn btn-success">Nuevo contacto</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;