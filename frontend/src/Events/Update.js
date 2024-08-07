import Cookies from 'js-cookie';
import { useState } from 'react';

function UpdateEvent() {

    Cookies.set("Org","Org1");

    let Organization=Cookies.get("Org")

    let OldEvent={
        Name:"Old",
        Venue:"OldV",
        Status:1,
        Permission:"Old",
        Organization:Organization,
        Faculty_Incharge:"$OldFI1$FI2",
        Student_Incharge:"$OldSI$SI2",
        Participations:"$OldInv$INV2",
        PO:"$PO1$PO9",
        Rules:"LO",
        Description:"LP",
        FeedBack:"None",
        Report:"None",
        Poster:"None"
    }

    let OldFI=OldEvent.Faculty_Incharge.split("$")
    OldFI.splice(0,1)
    
    let OldSI=OldEvent.Student_Incharge.split("$")
    OldSI.splice(0,1)
    
    let OldInv=OldEvent.Participations.split("$")
    OldInv.splice(0,1)
    
    let OldPO=OldEvent.PO.split("$")
    OldPO.splice(0,1)
    


    const [name, setName] = useState(OldEvent.Name);
    const [venue, setVenue] = useState(OldEvent.Venue);
    const [Rules, setRules] = useState(OldEvent.Rules);
    const [Description, setDescription] = useState(OldEvent.Description);


    const [FICount, setFICount] = useState(OldFI.length);
    const [FI, setFI] = useState(OldFI);
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

    const [SICount, setSICount] = useState(OldSI.length);
    const [SI, setSI] = useState(OldSI);
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

    const [InvCount, setInvCount] = useState(OldInv.length);
    const [Inv, setInv] = useState(OldInv);
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

    const [POCount, setPOCount] = useState(OldPO.length);
    const [PO, setPO] = useState(OldPO);
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
            <p>Update Event for {Organization}</p>

            <div>
                <div>
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <p>Venue</p>
                    <input onChange={(e) => setVenue(e.target.value)} value={venue}/>
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
                    <input onChange={(e) => setRules(e.target.value)} value={Rules}/>
                </div>
                <div>
                    <p>Description</p>
                    <input onChange={(e) => setDescription(e.target.value)} value={Description}/>
                </div>
            </div>

            <button onClick={CreateEve}>Create</button>

        </div>
        </>
    );
}

export default UpdateEvent;
