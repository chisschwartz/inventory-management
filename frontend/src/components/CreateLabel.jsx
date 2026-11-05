import {useState} from "react";

//provides us functionality to create items in our database
const CreateLabel = ({onLabelCreated, setCreateLabel, token, onUnauthorized}) => {

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
            const response = await fetch("/api/labels", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(labelData)
            });

            if (response.status === 401) {
                onUnauthorized();
            }
            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("label created:", data);
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
            <input type="text" placeholder="Label Name" value={labelAlias} onChange={(e) => setLabelAlias(e.target.value)} required/>
            <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required/>
            <button type="submit">Add New Label</button>
        </form>
    );
};

export default CreateLabel;