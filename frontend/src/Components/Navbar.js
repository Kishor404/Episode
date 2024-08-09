import { Link } from "react-router-dom";
import "./Components.css"

const Navbar=()=>{
    return(
        <>
        <div className="Nav">
            <div className="Nav-Title">
                <p>Episode</p>
            </div>
            <div className="Nav-Elements">
                <Link to={"/"}>Home</Link>
                <Link to={"/Event/Create"}>Event</Link>
                <Link to={"/Event/Read"}>Read</Link>
                
            </div>
            <div className="Nav-Login">
                <Link to={"/Log"}>Login</Link>
            </div>
        </div>
        </>
    )
}

export default Navbar;