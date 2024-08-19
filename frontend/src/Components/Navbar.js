import { Link } from "react-router-dom";
import "./Components.css"
import Cookies from 'js-cookie';
import Roles from "../Roles.json";
import { useState, useEffect } from "react";

import * as React from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

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
    
    // if(document.querySelector(".Nav-Event-Drop")){
    //     document.querySelector(".Nav-Event-Drop").style.display='none';
    // }
    // const DropEvent=()=>{
    //     let EveD=document.querySelector(".Nav-Event-Drop").style.display;
    //     if(EveD==="none"){
    //         document.querySelector(".Nav-Event-Drop").style.display='flex';
    //     }else{
    //         document.querySelector(".Nav-Event-Drop").style.display='none';
    //     }
        
    // }

    // 

    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

    return (
        <div className="Nav">
            <div className="Nav-Title">
                <p>Episode</p>
            </div>
            <div className="Nav-Elements">
                {nav.map((item, index) => (
                    <Link key={index} to={item[1]}>{item[0]}</Link>
                ))}
                {/* <div className="Nav-Event-But">
                    <a onClick={DropEvent} >Event</a>
                    <div className="Nav-Event-Drop">
                        {Evenav.map((item, index) => (
                            <Link key={index} to={item[1]} onClick={DropEvent}>{item[0]}</Link>
                        ))}
                    </div>
                </div> */}

                <div style={{zIndex:5}}>
                    <Link ref={anchorRef} id="composition-button" aria-controls={open ? 'composition-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleToggle}>Event</Link>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow {...TransitionProps} style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                                    {Evenav.map((item, index) => (
                                        <MenuItem onClick={handleClose}>
                                            <Link key={index} to={item[1]} className="Menu-Link">{item[0]}</Link>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                    </Popper>
                </div>
                                
            </div>
            <div className="Nav-Login">
                <Link to={"/Log"}>{LogName || "Login"}</Link>
            </div>

            
        </div>
    );
}

export default Navbar;
