import { useState } from "react";

export function DeleteButtonRenderer (params) {
    const [deleteLabel, setDeleteLabel] = useState(params.data);

    const handleDelete = async() => {

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

            if (params.onDeleteComplete) {
                params.onDeleteComplete();
            }
            
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
        }
    };

       return (
        <button
            onClick={handleDelete}
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