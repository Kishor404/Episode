import Cookies from 'js-cookie';
import { useState } from 'react';

function CreateEvent() {

    Cookies.set("Org","Org1");

    let Organization=Cookies.get("Org")

    const [name, setName] = useState('None');
    const [venue, setVenue] = useState('None');
    const [Rules, setRules] = useState('None');
    const [Description, setDescription] = useState('None');


    const [FICount, setFICount] = useState(1);
    const [FI, setFI] = useState(['']);
    const handleFIChange = (index, event) => {
        const values = [...FI];
        values[index] = event.target.value;
        setFI(values);
    };
    const addFI = () => {
        setFICount(FICount + 1);
        setFI([...FI, '']);
    };
    const deleteFI = (index) => {
        const values = [...FI];
        values.splice(index, 1); // Remove the value at the specified index
        setFI(values);
        setFICount(FICount - 1);
    };
    let Faculty_Incharge="";
    for(let i=0;i<FICount;i++){
        Faculty_Incharge=Faculty_Incharge+"$"+FI[i]
    }

    const [SICount, setSICount] = useState(1);
    const [SI, setSI] = useState(['']);
    const handleSIChange = (index, event) => {
        const values = [...SI];
        values[index] = event.target.value;
        setSI(values);
    };
    const addSI = () => {
        setSICount(SICount + 1);
        setSI([...SI, '']);
    };
    const deleteSI = (index) => {
        const values = [...SI];
        values.splice(index, 1); // Remove the value at the speciSIed index
        setSI(values);
        setSICount(SICount - 1);
    };
    let Student_Incharge="";
    for(let i=0;i<SICount;i++){
        Student_Incharge=Student_Incharge+"$"+SI[i]
    }

    const [InvCount, setInvCount] = useState(1);
    const [Inv, setInv] = useState(['']);
    const handleInvChange = (index, event) => {
        const values = [...Inv];
        values[index] = event.target.value;
        setInv(values);
    };
    const addInv = () => {
        setInvCount(InvCount + 1);
        setInv([...Inv, '']);
    };
    const deleteInv = (index) => {
        const values = [...Inv];
        values.splice(index, 1); // Remove the value at the speciInved index
        setInv(values);
        setInvCount(InvCount - 1);
    };
    let Invite="";
    for(let i=0;i<InvCount;i++){
        Invite=Invite+"$"+Inv[i]
    }

    const [POCount, setPOCount] = useState(1);
    const [PO, setPO] = useState(['']);
    const handlePOChange = (index, event) => {
        const values = [...PO];
        values[index] = event.target.value;
        setPO(values);
    };
    const addPO = () => {
        setPOCount(POCount + 1);
        setPO([...PO, '']);
    };
    const deletePO = (index) => {
        const values = [...PO];
        values.splice(index, 1); // Remove the value at the speciPOed index
        setPO(values);
        setPOCount(POCount - 1);
    };
    let POs="";
    for(let i=0;i<POCount;i++){
        POs=POs+"$"+PO[i]
    }


    let Event={
        Name:name,
        Venue:venue,
        Status:0,
        Permission:"None",
        Organization:Organization,
        Faculty_Incharge:Faculty_Incharge,
        Student_Incharge:Student_Incharge,
        Participations:Invite,
        PO:POs,
        Rules:Rules,
        Description:Description,
        FeedBack:"None",
        Report:"None",
        Poster:"None"
    }

    const CreateEve=()=>{
        Event.Status=1
        console.log(Event)
        Cookies.set("Event",Event)
    }

    return (
        <>
        <div>
            <p>Create Event for {Organization}</p>

            <div>
                <div>
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <p>Venue</p>
                    <input onChange={(e) => setVenue(e.target.value)}/>
                </div>

                <div>
                    <p>Faculty Incharge</p>
                    {Array.from({ length: FICount }, (_, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={FI[index]}
                            onChange={(e) => handleFIChange(index, e)}
                        />
                        <button onClick={() => deleteFI(index)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={addFI}>Add</button>
                </div>

                <div>
                    <p>Student Incharge</p>
                    {Array.from({ length: SICount }, (_, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={SI[index]}
                            onChange={(e) => handleSIChange(index, e)}
                        />
                        <button onClick={() => deleteSI(index)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={addSI}>Add</button>
                </div>
                <div>
                    <p>Invite</p>
                    {Array.from({ length: InvCount }, (_, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={Inv[index]}
                            onChange={(e) => handleInvChange(index, e)}
                        />
                        <button onClick={() => deleteInv(index)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={addInv}>Add</button>
                </div>
                <div>
                    <p>PO</p>
                    {Array.from({ length: POCount }, (_, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={PO[index]}
                            onChange={(e) => handlePOChange(index, e)}
                        />
                        <button onClick={() => deletePO(index)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={addPO}>Add</button>
                </div>
                <div>
                    <p>Rules</p>
                    <input onChange={(e) => setRules(e.target.value)}/>
                </div>
                <div>
                    <p>Description</p>
                    <input onChange={(e) => setDescription(e.target.value)}/>
                </div>
            </div>

            <button onClick={CreateEve}>Create</button>

        </div>
        </>
    );
}

export default CreateEvent;
