import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
  			<div className="ms-auto">  {/* ← Empuja el botón a la derecha */}
    			<Link to="/demo" className="me-5">
      			<button className="btn btn-success">Add new contact</button>
    			</Link>
  			</div>
		</nav>
	);
};