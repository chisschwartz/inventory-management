import { useEffect, useState } from "react"
import CreateLabel from "./CreateLabel";
import "./InventoryList.css";
import LabelList from "./LabelList";
import Pagination from "./Pagination";


const InventoryList = () => {
    const [labels, setLabels] = useState([]);
    const [isCreateLabel, setCreateLabel] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const indexOfLastLabel = currentPage * itemsPerPage;
    const indexOfFirstLabel = indexOfLastLabel - itemsPerPage;
    const currentLabels = labels.slice(indexOfFirstLabel, indexOfLastLabel);    

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
        <div >
            <LabelList labels={labels} />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={labels.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                />
        </div>
        // <div style={{display: "flex", flexFlow: "column wrap",  height: "10000px"}}>
        //     {labels.map((label) => (
        //         <div key={label.id} className="label-display">
        //                 <p>{label.labelCode} {label.labelAlias} {label.company}</p>
        //         </div>
        //     ))}
        // </div>
    )
};

export default InventoryList;