import { Link } from "react-router-dom";
import "./Components.css"
import Cookies from 'js-cookie';
import Roles from "../Roles.json";
import { useState, useEffect } from "react";

const Navbar = () => {
    const LogName = Cookies.get("Name");
    const Pos = Cookies.get("Position");
    const actions = Roles[Pos];

    const [nav, setNav] = useState([["Home", "/"]]);
    const [Evenav, setEveNav] = useState([["View", "/Event/View/"]]);

    useEffect(() => {
        setNav([["Home", "/"]])
        setEveNav([["View", "/Event/View/"]])
        if (actions) {
            if (actions.includes("CE")) {
                setEveNav(prevNav => [...prevNav, ["Create", "/Event/Create"]]);
            }
            if (actions.includes("FE")) {
                setEveNav(prevNav => [...prevNav, ["Feedback", "/Event/Feedback"]]);
            }
            if (actions.includes("UE")) {
                setEveNav(prevNav => [...prevNav, ["Update", "/Event/Update"]]);
            }
            if (actions.includes("DE")) {
                setEveNav(prevNav => [...prevNav, ["Delete", "/Event/Delete"]]);
            }
            if (actions.includes("RE")) {
                setEveNav(prevNav => [...prevNav, ["Read", "/Event/Read"]]);
            }
            if (actions.includes("W")) {
                setEveNav(prevNav => [...prevNav, ["Willing", "/Willingness"]]);
            }
        }
    }, [actions]);

    return (
        <div className="Nav">
            <div className="Nav-Title">
                <p>Episode</p>
            </div>
            <div className="Nav-Elements">
                {nav.map((item, index) => (
                    <Link key={index} to={item[1]}>{item[0]}</Link>
                ))}
                {Evenav.map((item, index) => (
                    <Link key={index} to={item[1]}>{item[0]}</Link>
                ))}
            </div>
            <div className="Nav-Login">
                <Link to={"/Log"}>{LogName || "Login"}</Link>
            </div>
        </div>
    );
}

export default Navbar;
