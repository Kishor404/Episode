import { getEvents } from './API';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Roles from "../Roles.json";


function ReadEvent(){

    const pos = Cookies.get("Position");
    const Role = Roles[pos];

    useEffect(() => {
        if (!Role.includes("RE")) {
            window.location.href = "/";
        } else {
            document.querySelector(".RE").style.display = "block";
        }
    }, [Role]);

    const [Event, setEvent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getEvents();
                setEvent(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    // let Event=[{
    //     Name:"Eve1",
    //     Venue:"Ven1",
    //     Status:0,
    //     Permission:"None",
    //     Organization:"Org1",
    //     Faculty_Incharge:"$ES$RS",
    //     Student_Incharge:"$ER$DF",
    //     Participations:"$HG$CSBS",
    //     PO:"$de$fr",
    //     Rules:"GHJK",
    //     Description:"KSJ",
    //     FeedBack:"KBG",
    //     Report:"POI",
    //     Poster:"HJK"
    // },{
    //     Name:"Eve2",
    //     Venue:"Ven2",
    //     Status:0,
    //     Permission:"None",
    //     Organization:"Org1",
    //     Faculty_Incharge:"$ES$RS",
    //     Student_Incharge:"$ER$DF",
    //     Participations:"$HG$CSBS",
    //     PO:"$de$fr",
    //     Rules:"GHJK",
    //     Description:"KSJ",
    //     FeedBack:"KBG",
    //     Report:"POI",
    //     Poster:"HJK"
    // }]

    return (
        
        <>
            <div className='RE' style={{ display: "none" }}>
                <p>Event</p>
                <div>
                    {Array.from({ length: Event.length }, (_, i) => (
                        <div key={i}>
                            <p>{Event[i].Name}</p>
                            <p>{Event[i].id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ReadEvent;
