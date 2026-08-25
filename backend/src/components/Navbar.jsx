import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav>
            <h2>GlobeTrotter 🌍</h2>

            <div>
                <Link to="/">Home</Link>
                <Link to="/destinations">Destinations</Link>
                <Link to="/recommendations">Recommendations</Link>
                <Link to="/itineraries">Itineraries</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;