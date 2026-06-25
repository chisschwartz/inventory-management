import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export function DeleteButtonRenderer (params) {
    // const [deleteLabel, setDeleteLabel] = useState(params.data);
    const [url, setUrl] = useState('');
    const [deleteLabel, setDeleteLabel] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const location = useLocation();


    //a small double check to prevent accidental clicks
    const handleClick = () => {
        setConfirmation(true);
    };

    //working on updating the url for deletion depending on the path.
    useEffect(() => {
        setUrl(location.pathname);
    }, []);

    //intiates the deletion process
    const handleDelete = async() => {
        setDeleteLabel(true);
        
        try {
            const response = await fetch(
                `http://localhost:5176/api/labels/${params.data.id}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }
            );

                if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            setConfirmation(false);
            if (params.onDeleteComplete) {
                params.onDeleteComplete();
            }
            
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
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
            <div style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                backgroundColor: '#fff3cd',
                padding: '8px',
                borderRadius: '3px'
            }}>
                <span style={{fontSize: '12px', fontWeight: 'bold'}}>Confirm Permanent Deletion?</span>
                <button
                onClick={handleDelete}
                disabled={deleteLabel}
                style={{
                    padding: '4px 8px',
                    backgroundColor: '#ff3c00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    //allows for no multiple clicks while deletion is processed
                    cursor: deleteLabel ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                }}
                >
                    {deleteLabel ? 'Deleting...' : 'Delete'}
                </button>
                <button
                onClick={handleCancel}
                disabled={deleteLabel}
                style={{
                    padding: '4px 8px',
                    backgroundColor: '#706c6a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: deleteLabel ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                }}
                >
                    Cancel
                </button>
            </div>
        );
    }

       return (
        <button
            onClick={handleClick}
            style={{
                padding: '6px 12px',
                backgroundColor: '#ff3c00',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
            }}
        >
            Delete
        </button>
    );
};