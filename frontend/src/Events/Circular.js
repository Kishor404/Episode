import Cookies from 'js-cookie';

import RITLogo from "../Assets/RITLogo.jpeg"

import "./Circular.css"

const Circular=({data=Cookies.get("CZ45")})=>{
    const event=JSON.parse(data)
    return(
        <>
        <div>
            <div className='Circular-A4'>
                <div className='Circular-Cont'>
                    <div className='Circular-Top'>
                        <div className='Circular-Logo'>
                            <img src={RITLogo}/>
                        </div>
                        <div className='Circular-Title'>
                            <p>RAMCO INSTITUTE OF TECHNOLOGY</p>
                            <p>RAJAPALAYAM</p>
                            <p>{event.Association}</p>
                            <p>{event.Department}</p>
                        </div>
                        <div className='Circular-Logo'>
                            <img src={RITLogo}/>
                        </div>
                    </div>
                    <div className='Circular-Mid'>
                        <div className='Circular-Mid-L'>

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
                                        {event.PO.map((x)=>(
                                            <th>
                                                {x}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                    {event.PO.map((x)=>(
                                            <td>
                                                ✔
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Circular