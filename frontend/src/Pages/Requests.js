import { getEvents, updateEvent } from '../Events/API';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const Requests = () => {
    const pos = Cookies.get("Position").toLowerCase();
    const [Event, setEvent] = useState(null);
    const [Role, setRole] = useState("U");
    const [Req, setReq] = useState([]);

    const PATCH_Event = async (id,data) => {
        try {
            await updateEvent(id,data);
            alert('Approved Successfully!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Check Network Connection ...');
        }
    };

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

        // Set role based on position
        if (pos === 'principal') {
            setRole("P");
        } else if (pos === 'viceprincipal') {
            setRole("VP");
        } else if (pos === 'hod') {
            setRole("HOD");
        } else if (pos === 'af') {
            setRole("AF");
        } else if (pos === 'as') {
            setRole("AS");
        } else {
            setRole("U");
        }
    }, [pos]);

    useEffect(() => {
        if (Event && Event.length > 0) {
            let XReq = [];
            for (let i = 0; i < Event.length; i++) {
                if (Role === "P" && Event[i].Permission.P === 0 && Event[i].Permission.VP === 1) {
                    XReq.push(Event[i]);
                }
                if (Role === "VP" && Event[i].Permission.VP === 0 && Event[i].Permission.HOD === 1) {
                    XReq.push(Event[i]);
                }
                if (Role === "HOD" && Event[i].Permission.HOD === 0 && Event[i].Permission.AF === 1) {
                    XReq.push(Event[i]);
                }
                if (Role === "AF" && Event[i].Permission.AF === 0 && Event[i].Permission.AS === 1) {
                    XReq.push(Event[i]);
                }
                if (Role === "AS" && Event[i].Permission.AS === 0) {
                    XReq.push(Event[i]);
                }
            }
            setReq(XReq);
        }
    }, [Event, Role]);

    // Handle the case where Event might still be null
    if (!Event) {
        return <div>Loading...</div>;
    }

    const ViewCir = (data) => {
        // Open a new tab and pass the event data via localStorage or a query string
        const eventData = JSON.stringify(data);
        window.open('/circular', '_blank');
        Cookies.set('CZ45',eventData)
        
    }

    const Approve=(data)=>{
        let id=data.id
        let dx=data.Permission
        dx[Role]=1
        let dv={Permission:dx}
        console.log(dv)
        PATCH_Event(id,dv)
    }

    return (
        <section>
            <div>
                {Req.map((x, index) => (
                    <div key={index}>
                        <p>{x.Name}</p>
                        <button onClick={() => ViewCir(x)}>View</button>
                        <button onClick={()=>Approve(x)}>Approve</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Requests;
