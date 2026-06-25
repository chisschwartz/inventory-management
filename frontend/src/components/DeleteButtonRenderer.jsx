import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export function DeleteButtonRenderer (params) {
    // const [deleteLabel, setDeleteLabel] = useState(params.data);
    const [url, setUrl] = useState('');
    const [deleteLabel, setDeleteLabel] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const location = useLocation();

    const handleClick = () => {
        setConfirmation(true);
    };

    useEffect(() => {
        setUrl(location.pathname);
    }, []);

    const handleDelete = async() => {
        setDeleteLabel(true);
        
        try {
            const response = await fetch(
                `http://localhost:5176/labels/${params.data.id}`, {
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

    const handleCancel = () => {
        setConfirmation(false);
    };

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
                    cursor: deleteLabel ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                }}
                >
                    {deleteLabel ? 'Deleting...' : 'Delete'}
                </button>
                <button
                onClick={handleCancel}
                disabled={deleteLabel}
                //reuse of styles. Need to make a css file for use throughout the app.
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
            {url}
        </button>
    );
};