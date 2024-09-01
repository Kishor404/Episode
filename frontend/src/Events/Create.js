import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { createEventAPI } from './API';
import { getLogs } from '../Pages/LogAPI';
import Roles from "../Roles.json";
import "./Event.css"
import { getAssociations } from '../Association/API';
import Tooltip from '@mui/material/Tooltip';

import Circular from './Circular';

const CreateEvent=()=>{

    // ------------------------- Verify User ---------------------

    const pos = Cookies.get("Position");
    const Role = Roles[pos];
    useEffect(() => {
        if (!Role.includes("CE")) {
            window.location.href = "/";
        } else {
            document.querySelector(".CE").style.display = "flex";
        }
    }, [Role]);

    // ------------------------ POST Event ------------------------

    const POST_Event = async (data) => {
        try {
            await createEventAPI(data);
            alert('Event created successfully!');
        } catch (error) {
            console.error(error);
            alert('Check Network Connection ...');
        }
    };


    // ---------------------- GET ASSOCIATION DATA ---------------------


    const [AssociationData, setAssociationData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAssociations();
                setAssociationData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const [AssociationList,SetAssociationList]=useState([]);
    useEffect(()=>{
        let Alist=[];
        for(let i=0;i<AssociationData.length;i++){
            Alist.push(AssociationData[i].Name)
        }
        SetAssociationList(Alist);
    },[AssociationData])

    // ------------------------- GET LOG DATA --------------------------

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
    
    const [StudentRegList,SetStudentRegList]=useState([]);
    const [StudentTooltip,SetStudentTooltip]=useState([["",{}]]);

    useEffect(()=>{
        const studentList = LogData.filter(log => log.Position === 'Student');
        let Slist=[];
        for(let i=0;i<studentList.length;i++){
            Slist.push(studentList[i].RegNo)
        }
        SetStudentRegList(Slist);
    },[LogData])

    const [FacultyRegList,SetFacultyRegList]=useState([]);
    const [FacultyTooltip,SetFacultyTooltip]=useState([["",{}]]);

    useEffect(()=>{
        const FacultyList = LogData.filter(log => log.Position !== 'Student');
        let Flist=[];
        for(let i=0;i<FacultyList.length;i++){
            Flist.push(FacultyList[i].RegNo)
        }
        SetFacultyRegList(Flist);
    },[LogData])
    

    // ------------------------ Data Init (14) -------------------------

    const [Name,SetName]=useState("");
    const [Venue,SetVenue]=useState("");
    const [Permission,SetPermission]=useState({AS:0,AF:0,HOD:0,VP:0,P:0});
    const [Association,SetAssociation]=useState("");
    const [Faculty_Incharge,SetFaculty_Incharge]=useState([""]);
    const [Student_Incharge,SetStudent_Incharge]=useState([""]);
    const [Participations,SetParticipations]=useState([""]);
    const [PO,SetPO]=useState([""]);
    const [Rules,SetRules]=useState("");
    const [Resource_Person,SetResource_Person]=useState("");
    const [Description,SetDescription]=useState("");
    const [Department,SetDepartment]=useState([""]);
    const [Date,SetDate]=useState("");
    const [Time,SetTime]=useState("");

    const [FinalParticipations,SetFinalParticipations]=useState([""]);

    // -------------------- Data Storing Functions (5) --------------------------

    // +++++++++ Faculty Incharge ++++++++

    const Faculty_Incharge_Change=(i,e)=>{
        const values = [...Faculty_Incharge];
        values[i] = e.target.value;
        const FT=[...FacultyTooltip];
        if(FacultyRegList.includes(e.target.value)){
            
            for(let j=0;j<LogData.length;j++){
                if(LogData[j].RegNo===e.target.value){
                    FT[i][0]=LogData[j].Name
                    FT[i][1]={backgroundColor:"white",color:"green"}
                    break;
                }
            }
        }else{
            FT[i][0]="No Faculty Found"
            FT[i][1]={backgroundColor:"rgb(255, 140, 140)"}
        }
        SetFacultyTooltip(FT)
        SetFaculty_Incharge(values);
    }
    const Add_Faculty_Incharge=()=>{
        SetFaculty_Incharge([...Faculty_Incharge,""])
        SetFacultyTooltip([...FacultyTooltip,["",{borderColor:"red"}]])
    }
    const Del_Faculty_Incharge=(i)=>{
        const values = [...Faculty_Incharge];
        values.splice(i, 1);
        SetFaculty_Incharge(values);
        const ST=[...FacultyTooltip];
        ST.splice(i,1)
        SetFacultyTooltip(ST)
    }

    // ++++++++ Student Incharge +++++++++
    
    const Student_Incharge_Change=(i,e)=>{
        const values = [...Student_Incharge];
        values[i] = e.target.value;
        const ST=[...StudentTooltip];
        if(StudentRegList.includes(e.target.value)){
            
            for(let j=0;j<LogData.length;j++){
                if(LogData[j].RegNo===e.target.value){
                    ST[i][0]=LogData[j].Name+" , "+LogData[j].Department+" ("+LogData[j].Year+")"
                    ST[i][1]={backgroundColor:"white",color:"green"}
                    break;
                }
            }
        }else{
            ST[i][0]="No Student Found"
            ST[i][1]={backgroundColor:"rgb(255, 140, 140)"}
        }
        SetStudentTooltip(ST)
        SetStudent_Incharge(values);
    }
    const Add_Student_Incharge=()=>{
        SetStudent_Incharge([...Student_Incharge,""])
        SetStudentTooltip([...StudentTooltip,["",{borderColor:"red"}]])
    }
    const Del_Student_Incharge=(i)=>{
        const values = [...Student_Incharge];
        values.splice(i, 1);
        SetStudent_Incharge(values);
        const ST=[...StudentTooltip];
        ST.splice(i,1)
        SetStudentTooltip(ST)
    }

    // ++++++++ Participations +++++++++

    

    const Participations_Change = (i, e) => {
        const values = [...Participations];
        values[i] = e.target.value;
        
        SetParticipations(values);
    
        
    };
    

    const Add_Participations=()=>{
        SetParticipations([...Participations,""])
    }
    const Del_Participations=(i)=>{
        const values = [...Participations];
        values.splice(i, 1);
        SetParticipations(values);
    }


    // ------------------- PO Mapping ------------------

    const POitems=[
        ["PO1","Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems."],
        ["PO2","Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences."],
        ["PO3","Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations."],
        ["PO4","Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions."],
        ["PO5","Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations."],
        ["PO6","The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice."],
        ["PO7","Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development."],
        ["PO8","Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice."],
        ["PO9","Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings."],
        ["PO10","Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions."],
        ["PO11","Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to ones own work, as a member and leader in a team, to manage projects and in multidisciplinary environments."],
        ["PO12","Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change."]
    ]
    const [EventPO, setEventPO] = useState([]);
    const handlePOChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setEventPO([...EventPO, name]);
        } else {
            setEventPO(EventPO.filter(item => item !== name));
        }
    };
    useEffect(()=>{
        SetPO(EventPO)
    },[EventPO])


    // ------------------- Permission ------------------

    // const Permissionsitems=["GM","Principal","Vice Principal","HOD","Association_Faculty","Association_Student"]
    // const [EventPermission, setEventPermission] = useState();
    // const handlePermissionChange = (e) => {
    //     const { name, checked } = e.target;
    //     if (checked) {
    //         setEventPermission([...EventPermission, name]);
    //     } else {
    //         setEventPermission(EventPermission.filter(item => item !== name));
    //     }
    // };
    // useEffect(()=>{
    //     let TempPermissions=[]
    //     for(let i=0;i<EventPermission.length;i++){
    //         TempPermissions.push([EventPermission[i],"No"])
    //     }
    //     SetPermission(TempPermissions)
    // },[EventPermission])


    // ------------------- Department ------------------

    const Departmentitems=["CSBS","AIDS","MECH","ECE","EEE","CIVIL","IT","CSE"]
    const [EventDepartment, setEventDepartment] = useState([]);
    const handleDepartmentChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setEventDepartment([...EventDepartment, name]);
        } else {
            setEventDepartment(EventDepartment.filter(item => item !== name));
        }
    };
    useEffect(()=>{
        let TempDepartment=[]
        for(let i=0;i<EventDepartment.length;i++){
            TempDepartment.push([EventDepartment[i],"No"])
        }
        SetDepartment(TempDepartment)
    },[EventDepartment])
    

    // ------------------ Data Gathering (15) -----------------

    const [Event,SetEvent]=useState(
        {
            Name: Name,
            Venue: Venue,
            Date:Date,
            Time:Time,
            Status: 1,
            Permission: Permission,
            Association: Association,
            Faculty_Incharge: Faculty_Incharge,
            Student_Incharge: Student_Incharge,
            Participations: Participations,
            PO: PO,
            Rules: Rules,
            Resource_Person:Resource_Person,
            Description: Description,
            Department:Department
    })

    useEffect(()=>{
        SetEvent({
        Name: Name,
        Venue: Venue,
        Date:Date,
        Time:Time,
        Status: 1,
        Permission: Permission,
        Association: Association,
        Faculty_Incharge: Faculty_Incharge,
        Student_Incharge: Student_Incharge,
        Participations: FinalParticipations,
        PO: PO,
        Rules: Rules,
        Resource_Person:Resource_Person,
        Description: Description,
        Department:Department
    })
    },[Association, Date, Department, Description, Faculty_Incharge, Name, PO, FinalParticipations, Permission, Resource_Person, Rules, Student_Incharge, Time,Venue])
    

    // ----------------- Data Pass For POST --------------


    const Submit = () => {
        
    
        const DeptP = ["CSBS", "CSE", "ECE"];
        const newFinalParticipations = [];
    
        Participations.forEach(PartIn => {
            if (DeptP.some(substring => PartIn.startsWith(substring))) {
                let Parid = DeptP.findIndex(substring => PartIn.startsWith(substring));
                let PYear = parseInt(PartIn.replace(DeptP[Parid], ''));
                let PDep = DeptP[Parid];
    
                LogData.forEach(data => {
                    if (data.Year === PYear && data.Department === PDep && !newFinalParticipations.includes(data.RegNo)) {
                        newFinalParticipations.push(data.RegNo);
                    }
                });
            } else {
                LogData.forEach(data => {
                    if (!newFinalParticipations.includes(data.RegNo) && data.RegNo === PartIn) {
                        newFinalParticipations.push(data.RegNo);
                    }
                });
            }
        });
        SetFinalParticipations(newFinalParticipations);

        console.log(Event);
        POST_Event(Event);
    };
    

    
    // ------------- PAGE HANDLING --------------------
    const x=6
    const Open_P1=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P1").style.display="flex"
    }
    const Open_P2=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P2").style.display="flex"
    }
    const Open_P3=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P3").style.display="flex"
    }
    const Open_P4=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P4").style.display="flex"
    }
    const Open_P5=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P5").style.display="flex"
    }
    const Open_P6=()=>{
        for(let i=x;i>0;i--){
            let pid=".CE-P"+i;
            document.querySelector(pid).style.display="none"
        }
        document.querySelector(".CE-P6").style.display="flex"
    }



    return(
    <>

        <div className='CE' style={{ display: "none" }}>


            <div className='CE-P1 CE-P'>
                {/* Intro (12) */}
                <button onClick={Open_P2}>Create Episode</button>
            </div>


            <div className='CE-P2 CE-P' style={{ display: "none" }}>
                {/* Association - Department (2) */}
                <div className='CE-PCont'>
                    <div className='CE-IND'>
                        <p>Select The Association :</p>
                        <select onChange={(e) => SetAssociation(e.target.value)} value={Association}>
                            <option value="" disabled>Select Association</option>
                            {AssociationList.map((assoc, index) => (
                                <option key={index} value={assoc}>
                                    {assoc}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='CE-INS'>
                        <p>Select The Associated Departments : </p>
                        <div className='CE-ULDEP'>
                            {Departmentitems.map((item, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={item}
                                            checked={EventDepartment.includes(item)}
                                            onChange={handleDepartmentChange}
                                        />
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                
                <div className='CE-PNav'>
                    <button onClick={Open_P1} className='CE-Prev'>Pervious</button>
                    <button onClick={Open_P3}>Next</button>
                </div>
            </div>


            <div className='CE-P3 CE-P' style={{ display: "none" }}>
                {/* Details (6) */}
                <div className='CE-Cont'>
                    <div className='CE-IN'>
                        <p>Enter The Event Name : </p>
                        <input placeholder='Event Name' onChange={(e) => SetName(e.target.value)} value={Name}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Enter The Venue : </p>
                        <input placeholder='Venue' onChange={(e) => SetVenue(e.target.value)} value={Venue}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Enter The Date : </p>
                        <input placeholder='Event Name' type='date' onChange={(e) => SetDate(e.target.value)} value={Date}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Enter The Time : </p>
                        <input placeholder='Event Name' type='time' onChange={(e) => SetTime(e.target.value)} value={Time}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Describe The Event : </p>
                        <input placeholder='Description' onChange={(e) => SetDescription(e.target.value)} value={Description}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Rules Of This Event : </p>
                        <input placeholder='Rules' onChange={(e) => SetRules(e.target.value)} value={Rules}/>
                    </div>
                    <div className='CE-IN'>
                        <p>Enter The Name Of Resource Person : </p>
                        <input placeholder='Resource Person' onChange={(e) => SetResource_Person(e.target.value)} value={Resource_Person}/>
                    </div>
                </div>
                
                
                <div className='CE-PNav'>
                    <button onClick={Open_P2} className='CE-Prev'>Pervious</button>
                    <button onClick={Open_P4}>Next</button>
                </div>
            </div>


            <div className='CE-P4 CE-P' style={{ display: "none" }}>
                {/* Person Details (3) */}

                <div className='CE-PCont CE-Cont-Y'>
                    <div className='CE-INZ'>
                        <p>Enter The Faculty_Incharges : </p>
                        <div className='CE-INZ-SRC'>
                            {Array.from({ length: Faculty_Incharge.length }, (_, i) => (
                                <div key={i}>
                                    <Tooltip title={FacultyTooltip[i][0]}>
                                        <input type="text" value={Faculty_Incharge[i]} onChange={(e) => Faculty_Incharge_Change(i, e)} placeholder='Enter Reg No' style={FacultyTooltip[i][1]}/>
                                    </Tooltip>
                                    <button onClick={() => Del_Faculty_Incharge(i)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={Add_Faculty_Incharge}>Add</button>
                    </div>

                    <div className='CE-INZ'>
                        <p>Enter The Student_Incharges : </p>
                        <div className='CE-INZ-SRC'>
                            {Array.from({ length: Student_Incharge.length }, (_, i) => (
                                <div key={i}>
                                    <Tooltip title={StudentTooltip[i][0]}>
                                        <input type="text" value={Student_Incharge[i]} onChange={(e) => Student_Incharge_Change(i, e)} placeholder='Enter Reg No' style={StudentTooltip[i][1]}/>
                                    </Tooltip>
                                    
                                    <button onClick={() => Del_Student_Incharge(i)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={Add_Student_Incharge}>Add</button>
                    </div>

                    <div className='CE-INZ'>
                        <p>Enter The Participations : </p>
                        <div className='CE-INZ-SRC'>
                            {Array.from({ length: Participations.length }, (_, i) => (
                                <div key={i}>
                                    <input type="text" value={Participations[i]} onChange={(e) => Participations_Change(i, e)}/>
                                    <button onClick={() => Del_Participations(i)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={Add_Participations}>Add</button>
                    </div>
                </div>

                

                <div className='CE-PNav'>
                    <button onClick={Open_P3} className='CE-Prev'>Pervious</button>
                    <button onClick={Open_P5}>Next</button>
                </div>
            </div>


            <div className="CE-P5 CE-P" style={{ display: "none" }}>
                {/* PO Mapping */}
                
                <div>
                    <ul>
                        {POitems.map((item, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={item[0]}
                                        checked={EventPO.includes(item[0])}
                                        onChange={handlePOChange}
                                    />
                                    {item[0]+" - "+item[1]}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='CE-PNav'>
                    <button onClick={Open_P4} className='CE-Prev'>Pervious</button>
                    <button onClick={Open_P6}>Next</button>
                </div>
            </div>



            {/* <div className="CE-P6 CE-P" style={{ display: "none" }}>
                
                <div>
                    <ul>
                        {Permissionsitems.map((item, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={item}
                                        checked={EventPermission.includes(item)}
                                        onChange={handlePermissionChange}
                                    />
                                    {item}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='CE-PNav'>
                    <button onClick={Open_P5} className='CE-Prev'>Pervious</button>
                    <button onClick={Open_P7}>Next</button>
                </div>
            </div> */}



            <div className="CE-P6 CE-P" style={{ display: "none" }}>
                {/* Pre Final */}

                <div className='CE-PCont'>
                    <div className='CE-ZCont'>
                        <Circular data={JSON.stringify(Event)}/>
                    </div>
                </div>

                <div className='CE-PNav'>
                    <button onClick={Open_P6} className='CE-Prev'>Pervious</button>
                    <button onClick={Submit}>Submit</button>
                </div>
                
            </div>

        </div>

    </>
    );
}

export default CreateEvent;