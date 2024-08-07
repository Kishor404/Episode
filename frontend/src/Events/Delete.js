import React, { useState } from 'react';

function DeleteEvent() {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirm(true);
    }

    const handleConfirm = () => {
        setShowConfirm(false);
        const id = document.querySelector('#EveID').value;
        console.log(id,"Deleted !");
    }

    const handleCancel = () => {
        setShowConfirm(false);
    }

    return (
        <>
            <div id="Del">
                <p>Delete Event</p>
                <div>
                    <p>Enter The Event ID</p>
                    <input placeholder="EventID" id="EveID"/>
                </div>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
            {showConfirm && (
                <div id="Del2">
                    <p>The operation was not reversible. Are you sure you want to delete the event?</p>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </>
    );
}

export default DeleteEvent;
