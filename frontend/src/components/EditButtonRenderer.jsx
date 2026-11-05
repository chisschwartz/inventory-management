import { useState } from 'react';

export function EditButtonRenderer(params) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(params.data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //checks to see if an edit is occuring
    const handleEdit = () => {
        setError("");
        setEditData(params.data);
        setIsEditing(true);
    };

    //cancels an edit
    const handleCancel = () => {
        setIsEditing(false);
        setError("");
        setEditData(params.data);
    };

    //intiates the edit and saves to the database
    const handleSave = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                //due to certain params I'd like this to be only useful for the individual inventory components
                `/api/labels/size/${params.data.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${params.token}`
                    },
                    body: JSON.stringify(editData)
                }
            );

            if (!response.ok) {
                throw new Error(`Could not update quantity (status ${response.status}).`);
            }

            setIsEditing(false);
            if (params.onEditComplete) {
                params.onEditComplete();
            }

        } catch (error) {
            console.error('Error updating item:', error);
            setEditData(params.data);
            setIsEditing(false);
            setError(error.message || "Could not update quantity. Please try again.");

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
            <div className="grid-action-group">
                <input
                    aria-label={`Quantity for ${params.data.labelCode}`}
                    type="text"
                    value={editData.quantity || ''}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
                <button
                    className="grid-action-button grid-action-save"
                    onClick={handleSave}
                    disabled={loading}
                    type="button"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    className="grid-action-button grid-action-cancel"
                    onClick={handleCancel}
                    disabled={loading}
                    type="button"
                >
                    Cancel
                </button>
            </div>
        );
    }

    //sets isEditing to true to and allows us to apply and save edits
    return (
        <div className="grid-action-feedback">
            <button
                className="grid-action-button grid-action-update"
                onClick={handleEdit}
                type="button"
            >
                Update
            </button>
            {error && <span className="grid-action-error" role="alert">{error}</span>}
        </div>
    );
}
