import { useState } from 'react';

export function EditButtonRenderer(params) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(params.data);
    const [loading, setLoading] = useState(false);

    //checks to see if an edit is occuring
    const handleEdit = () => {
        setIsEditing(true);
    };

    //cancels an edit
    const handleCancel = () => {
        setIsEditing(false);
        setEditData(params.data);
    };

    //intiates the edit and saves to the database
    const handleSave = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                //due to certain params I'd like this to be only useful for the individual inventory components
                `http://localhost:5176/api/labels/size/${params.data.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editData)
                }
            );

            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            setIsEditing(false);
            if (params.onEditComplete) {
                params.onEditComplete();
            }

        } catch (error) {
            console.error('Error updating item:', error);
            alert('Failed to update item');

        } finally {
            setLoading(false);
        }
    };

    //shows the previous value within the text box, and changes that value when a new one is submitted
    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    //checks to see if editing is true before executing
    //need css
    if (isEditing) {
        return (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <input
                    type="text"
                    value={editData.quantity || ''}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    style={{ width: '60px', padding: '4px' }}
                />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                        padding: '4px 8px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '12px'
                    }}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    }

    //sets isEditing to true to and allows us to apply and save edits
    return (
        <button
            onClick={handleEdit}
            style={{
                padding: '6px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
            }}
        >
            Update
        </button>
    );
}
