import { useState } from "react";

export function DeleteButtonRenderer (params) {
    const [deleteLabel, setDeleteLabel] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [error, setError] = useState("");
    //works for deleting and having multiple api endpoints but 
    // const urls = [`http://localhost:5176/api/labels/size/${params.data.id}`, `http://localhost:5176/api/labels/${params.data.id}`]


    //a small double check to prevent accidental clicks
    const handleClick = () => {
        setError("");
        setConfirmation(true);
    };

    //intiates the deletion process
    const handleDelete = async() => {
        setDeleteLabel(true);
        
        try {
            const response = await fetch(
                `/api/labels/${params.data.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${params.token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Could not delete label (status ${response.status}).`);
            }

            setConfirmation(false);
            if (params.onDeleteComplete) {
                params.onDeleteComplete();
            }
            
        } catch (error) {
            console.error('Error deleting item:', error);
            setConfirmation(false);
            setError(error.message || "Could not delete label. Please try again.");
        } finally {
            setDeleteLabel(false);
        }
    };

    //cancels the deletion process
    const handleCancel = () => {
        setConfirmation(false);
    };

    //if confirmation equals true, then displays the buttons that allow deletion to happen
    //need to make an actual css page to make this prettier
    if (confirmation) {
        return (
            <div className="grid-action-group grid-delete-confirm">
                <span>Delete this label?</span>
                <button
                className="grid-action-button grid-action-delete"
                onClick={handleDelete}
                disabled={deleteLabel}
                type="button"
                >
                    {deleteLabel ? 'Deleting...' : 'Delete'}
                </button>
                <button
                className="grid-action-button grid-action-cancel"
                onClick={handleCancel}
                disabled={deleteLabel}
                type="button"
                >
                    Cancel
                </button>
            </div>
        );
    }

       return (
        <div className="grid-action-feedback">
            <button
                className="grid-action-button grid-action-delete"
                onClick={handleClick}
                type="button"
            >
                Delete
            </button>
            {error && <span className="grid-action-error" role="alert">{error}</span>}
        </div>
    );
};