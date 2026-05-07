import { useEffect, useState } from "react"
import CreateLabel from "./CreateLabel";
import "./InventoryList.css";


const InventoryList = () => {
    const [labels, setLabels] = useState([]);
    const [isCreateLabel, setCreateLabel] = useState(false);

    useEffect(() => {
        fetchLabels();
    })

    const fetchLabels = async () => {
        try {
            const response = await fetch("http://localhost:5176/api/labels", {
                method: 'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();
            setLabels(data);

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5176/api/labels/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            
            fetchLabels();

        } catch(error) {
            console.error("Error deleting lable: ", error);
        }
    };

    return (
        <div style={{display: "flex", flexFlow: "column wrap",  height: "900px"}}>
            {labels.map((label) => (
                <div key={label.id} className="label-display">
                        <p>{label.labelCode} {label.labelAlias} {label.company}</p>
                </div>
            ))}
        </div>
    )
};

export default InventoryList;