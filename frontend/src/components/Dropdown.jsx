import React, { useState } from 'react'

function Dropdown({ appointment }) {
    const [open, setOpen] = useState(false)
    const handleAction = (id, action) => {
        // Handle accept or reject action here
        console.log(`Appointment ID: ${id}, Action: ${action}`)
    }
    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                onClick={() => setOpen(!open)}
            >
                Edit
            </button>
            <div
                id="dropdown"
                className={`dropdown-menu dropdown-menu-left ${
                    open ? 'show' : ''
                }`}
                aria-labelledby="dropdownMenuButton"
            >
                <button
                    className="dropdown-item"
                    onClick={() => handleAction(appointment?.id, 'Accept')}
                >
                    Accept
                </button>
                <button
                    className="dropdown-item"
                    onClick={() => handleAction(appointment?.id, 'Reject')}
                >
                    Reject
                </button>
                <button
                    className="dropdown-item"
                    onClick={() => handleAction(appointment?.id, 'Reschedule')}
                >
                    Reschedule
                </button>
            </div>
        </div>
    )
}

export default Dropdown
