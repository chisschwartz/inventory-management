import { useEffect, useState } from "react"
import CreateLabel from "./CreateLabel";
import "./InventoryList.css";
import LabelList from "./LabelList";
import Pagination from "./Pagination";


const InventoryList = () => {
    const [labels, setLabels] = useState([]);
    const [isCreateLabel, setCreateLabel] = useState(false)

    useEffect(() => {
        
        const fetchLabels = async () => {
        try {
            const response = await fetch("http://localhost:5176/api/labels", {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();
            
            setLabels(data)

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    };

    fetchLabels();
    }, []);

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
        <div style={{display: "flex", flexFlow: "column wrap",  height: "800px"}}>
            {labels.map((label) => (
                <ul className="label-display" key={label.id}>
                        <li>{label.labelCode} {label.labelAlias} {label.company}</li>
                </ul>
            ))}
        </div>
    )
};

export default InventoryList;