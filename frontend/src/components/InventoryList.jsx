import { useEffect, useState } from "react"
import CreateLabel from "./CreateLabel";
import "./InventoryList.css";
// import LabelList from "./LabelList";
// import Pagination from "./Pagination";
// import FilterTable from "./FilterTable";

const InventoryList = () => {
    const [labels, setLabels] = useState([]);
    const [isCreateLabel, setCreateLabel] = useState(false);

    useEffect(() => {
        fetchLabels();
    }, []);
        
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5176/api/labels/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-type': 'application/json'}
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
        <div className="label-container">
            {!isCreateLabel ? <button onClick={() => {
                setCreateLabel(true);
            }}>Create Label</button> : ""}
            {isCreateLabel ? <CreateLabel onLabelCreated={fetchLabels} setCreateLabel={setCreateLabel}/> :
            <table className="label-display">
                <thead>
                    <tr>
                        <th>Label Code</th>
                        <th>Label Alias</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {labels.map(label => (
                        <tr key={label.id}>
                            <td>{label.labelCode}</td>
                            <td>{label.labelAlias}</td>
                            <td>{label.company}</td>
                            <td><button onClick={() => handleDelete(label.id)}>DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        </div>
    );
};

export default InventoryList;