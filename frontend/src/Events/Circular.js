import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import RITLogo from "../Assets/RITLogo.jpeg";
import { getLogs } from '../Pages/LogAPI';
import "./Circular.css";

const Circular = ({ data = Cookies.get("CZ45") }) => {
    const event = JSON.parse(data);
    const [LogData, setLogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLogs();
                setLogData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const Principal = LogData.filter(log => log.Position === 'Principal')[0];

    return (
        <>
            <div>
                <div className='Circular-A4'>
                    <div className='Circular-Cont'>
                        <div className='Circular-Top'>
                            <div className='Circular-Logo'>
                                <img src={RITLogo} alt="RIT Logo" />
                            </div>
                            <div className='Circular-Title'>
                                <p>RAMCO INSTITUTE OF TECHNOLOGY</p>
                                <p>RAJAPALAYAM</p>
                                <p>{event.Association}</p>
                                <p>{event.Department}</p>
                            </div>
                            <div className='Circular-Logo'>
                                <img src={RITLogo} alt="RIT Logo" />
                            </div>
                        </div>
                        <div className='Circular-Mid'>
                            <div className='Circular-Mid-L'>
                                <p><b>Chief Patron : </b>{Principal ? Principal.Name : "Not Available"}</p>
                                <div>
                                    <p><b>Student Incharge : </b></p>
                                    <div>
                                        {event.Student_Incharge.map((x, index) => (<p key={index}>{x}</p>))}
                                    </div>
                                </div>
                                <div>
                                    <p><b>Faculty Incharge : </b></p>
                                    <div>
                                        {event.Faculty_Incharge.map((x, index) => (<p key={index}>{x}</p>))}
                                    </div>
                                </div>
                            </div>
                            <div className='Circular-Mid-R'>
                                <p><b>Event Name : </b>{event.Name}</p>
                                <p><b>Venue : </b>{event.Venue}</p>
                                <p><b>Date : </b>{event.Date}</p>
                                <p><b>Time : </b>{event.Time}</p>
                                <p><b>Description : </b>{event.Description}</p>
                                <p><b>Rules : </b>{event.Rules}</p>
                                <table border='1'>
                                    <thead>
                                        <tr>
                                            <th>POs</th>
                                            {event.PO.map((x, index) => (
                                                <th key={index}>
                                                    {x}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {event.PO.map((x, index) => (
                                                <td key={index}>
                                                    ✔
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='Circular-Low'>
                                <div>
                                    <p>{event.Permission.HOD===0?'X':'✔'}</p>
                                    <p><b>HOD</b></p>
                                </div>
                                <div>
                                    <p>{event.Permission.VP===0?'X':'✔'}</p>
                                    <p><b>Vice Principal</b></p>
                                </div>
                                <div>
                                    <p>{event.Permission.P===0?'X':'✔'}</p>
                                    <p><b>Principal</b></p>
                                </div>
                                <div>
                                    <p>{event.Permission.AF===0?'X':'✔'}</p>
                                    <p><b>Faculty Coordinator</b></p>
                                </div>
                                <div>
                                    <p>{event.Permission.AS===0?'X':'✔'}</p>
                                    <p><b>Student Coordinator</b></p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Circular;
