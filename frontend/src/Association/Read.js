import { getAssociations } from './API';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Role from "../Roles.json";

function ReadAssociation() {
    const pos = Cookies.get("Position");
    const Action = Role[pos];

    const [Association, setAssociation] = useState([]);

    useEffect(() => {
        if (!Action.includes("RA")) {
            window.location.href = "/";
        }
    }, [Action]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAssociations();
                setAssociation(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`RA ${!Action.includes("RA") ? 'hidden' : ''}`}>
            <p>Association</p>
            <div>
                {Association.map((assoc) => (
                    <div key={assoc.id}>
                        <p>{assoc.Name}</p>
                        <p>{assoc.id}</p>
                        <img
                            src={`https://drive.google.com/thumbnail?id=${assoc.Logo}&sz=w100`}
                            alt={assoc.Name}
                            onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadAssociation;
