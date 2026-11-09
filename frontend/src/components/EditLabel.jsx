import { useState } from "react"

//may use this in the final for admins to edit but unsure.
const EditLabel = ({label, onUpdate, onCancel}) => {
    const [company, setCompany] = useState(label.company);
    const [labelAlias, setLabelAlias] = useState(label.labelAlias);
    const [labelCode, setLabelCode] = useState(label.labelCode);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedLabel = {
            labelCode,
            labelAlias,
            company
        };

        try {
            const response = await fetch(`http://localhost:5176/api/labels/${id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(updatedLabel)
            });

            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();
            onUpdate();
        } catch (error){
            console.error("Error updating post:", error);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="update-form">
            <input type="text" value={labelCode} onChange={(e) => setLabelCode(e.target.value)} />
            <input type="text" value={labelAlias} onChange={(e) => setLabelAlias(e.target.value)} />
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            <button type="submit">Update Label</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditLabel;