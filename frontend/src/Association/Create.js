import React, { useState } from 'react';
import { createAssociationAPI } from './API';

const CreateAssociation = () => {

    const Post_Association = async (data) => {
        try {
            await createAssociationAPI(data);
            alert('Association created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create item');
        }
    };

    const [roles, setRoles] = useState([
        {
            role: '',
            persons: ['']
        }
    ]);
    const [logoUrl, setLogoUrl] = useState('');
    const [logoId, setLogoId] = useState('');
    const [associationName, setAssociationName] = useState('');

    const handleRoleChange = (index, value) => {
        const newRoles = [...roles];
        newRoles[index].role = value;
        setRoles(newRoles);
    };

    const handlePersonChange = (roleIndex, personIndex, value) => {
        const newRoles = [...roles];
        newRoles[roleIndex].persons[personIndex] = value;
        setRoles(newRoles);
    };

    const addPerson = (roleIndex) => {
        const newRoles = [...roles];
        newRoles[roleIndex].persons.push('');
        setRoles(newRoles);
    };

    const addRole = () => {
        setRoles([...roles, {
            role: '',
            persons: ['']
        }]);
    };

    const deletePerson = (roleIndex, personIndex) => {
        const newRoles = [...roles];
        newRoles[roleIndex].persons.splice(personIndex, 1);
        setRoles(newRoles);
    };

    const deleteRole = (roleIndex) => {
        const newRoles = roles.filter((_, index) => index !== roleIndex);
        setRoles(newRoles);
    };

    const extractFileId = (url) => {
        const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
        const match = url.match(regex);
        return match ? match[1] : '';
    };

    const handleLogoUrlChange = (e) => {
        const url = e.target.value;
        setLogoUrl(url);
        setLogoId(extractFileId(url));
    };

    const handleAssociationNameChange = (e) => {
        setAssociationName(e.target.value);
    };

    const submitAssociation = () => {
        const data = {
            Name: associationName,
            Logo: logoId,
            Roles: roles
        };
        console.log(data);
        Post_Association(data);
    };

    return (
        <>
            <div>
                <div>
                    <p>Name Of The Association :</p>
                    <input
                        type="text"
                        value={associationName}
                        onChange={handleAssociationNameChange}
                    />
                </div>
                <div>
                    <p>Enter The Logo URL (Google Drive):</p>
                    <input
                        type="text"
                        value={logoUrl}
                        onChange={handleLogoUrlChange}
                    />
                    {logoId && <p>Extracted Logo ID: {logoId}</p>}
                    {logoId && (
                        <img
                            src={`https://drive.google.com/thumbnail?id=${logoId}&sz=w100`}
                            alt="Logo Thumbnail"
                            style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                        />
                    )}
                </div>
                {roles.map((roleItem, roleIndex) => (
                    <div key={roleIndex} style={{ marginBottom: '20px' }}>
                        <p>Enter The Role :</p>
                        <input
                            value={roleItem.role}
                            onChange={(e) => handleRoleChange(roleIndex, e.target.value)}
                        />
                        <button onClick={() => deleteRole(roleIndex)}>Delete Role</button>
                        <p>Enter The Persons :</p>
                        {roleItem.persons.map((person, personIndex) => (
                            <div key={personIndex}>
                                <input
                                    value={person}
                                    onChange={(e) =>
                                        handlePersonChange(roleIndex, personIndex, e.target.value)
                                    }
                                />
                                <button onClick={() => deletePerson(roleIndex, personIndex)}>Delete Person</button>
                            </div>
                        ))}
                        <button onClick={() => addPerson(roleIndex)}>Add Person</button>
                    </div>
                ))}
                <button onClick={addRole}>Add Role</button>
                <button onClick={submitAssociation}>Submit</button>
            </div>
        </>
    );
};

export default CreateAssociation;
