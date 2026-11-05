import {useState} from "react";

//provides us functionality to create items in our database
const CreateLabel = ({onLabelCreated, setCreateLabel, token}) => {

    const [labelCode, setLabelCode] = useState("");
    const [labelAlias, setLabelAlias] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

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

            if(!response.ok) {
                throw new Error(`Label could not be created (status ${response.status}).`);
            }

            await response.json();
            onLabelCreated();
            setLabelCode('');
            setLabelAlias('');
            setCompany('');
            setCreateLabel(false);

        } catch(error) {
            setError(error.message || "Label could not be created. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <form className="add-label-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="label-code">Label code</label>
                <input id="label-code" name="labelCode" type="number" placeholder="e.g. 1042" value={labelCode} onChange={(e) => setLabelCode(e.target.value)} required/>
            </div>
            <div className="form-field">
                <label htmlFor="label-name">Label name</label>
                <input id="label-name" name="labelAlias" type="text" placeholder="Enter label name" value={labelAlias} onChange={(e) => setLabelAlias(e.target.value)} required/>
            </div>
            <div className="form-field">
                <label htmlFor="label-company">Company</label>
                <input id="label-company" name="company" type="text" placeholder="Enter company" value={company} onChange={(e) => setCompany(e.target.value)} required/>
            </div>
            {error && <p className="form-error add-label-error" role="alert">{error}</p>}
            <button className="primary-button" disabled={isSubmitting} type="submit">{isSubmitting ? "Adding…" : "Add label"}</button>
        </form>
    );
};

export default CreateLabel;