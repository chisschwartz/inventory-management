import React, {useState, useEffect} from "react";

const CreateLabel = ({onLabelCreated, setCreateLabel}) => {

    const [labelCode, setLabelCode] = useState("");
    const [labelAlias, setLabelAlias] = useState("");
    const [company, setCompany] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const labelData = {
            labelCode,
            labelAlias,
            company
        };

        try {
            const response = await fetch("http://localhost:5176/api/labels", {
                method: 'POST',
                credentials: 'include',
                headers,
                body: JSON.stringify(labelData)
            });

            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();
            onLabelCreated();
            setLabelCode('');
            setLabelAlias('');
            setCompany('');
            setCreateLabel(false);

        } catch(error) {
            console.error("ERROR CREATING POST: ", error);
        }
    };

    return(

        <form className="add-label-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Label Code" value={labelCode} onChange={(e) => setLabelCode(e.target.value)} required/>
            <input type="text" placeholder="Label Name" value={labelAlias} onChange={(e) => setLabelCode(e.target.value)} required/>
            <input type="text" placeholder="Company" value={labelCode} onChange={(e) => setLabelCode(e.target.value)} required/>
            <button type="submit">Add New Label</button>
        </form>
    );
};

export default CreateLabel;