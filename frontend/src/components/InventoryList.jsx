import { useEffect, useState } from "react"
import CreateLabel from "./CreateLabel";
import "./InventoryList.css";
import LabelList from "./LabelList";
import Pagination from "./Pagination";


const InventoryList = () => {
    const [labels, setLabels] = useState([]);
    const [isCreateLabel, setCreateLabel] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    // const indexOfLastLabel = currentPage * itemsPerPage;
    // const indexOfFirstLabel = indexOfLastLabel - itemsPerPage;
    // const currentLabels = labels.slice(indexOfFirstLabel, indexOfLastLabel);    

    useEffect(() => {
        
        const fetchLabels = async () => {
        // try {
        //     const response = await fetch("http://localhost:5176/api/labels", {
        //         method: 'GET',
        //         credentials: 'include'
        //     });

        try {
            const response = await fetch(`http://localhost:5176/api/labels?page=${currentPage}&size=${itemsPerPage}&sortBy=labelCode&ascending=false`);

            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();
            const totalItems = response.headers.get("X-Total-Count");
            
            setLabels(data);
            setTotalItems(totalItems);

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    };

    fetchLabels();
    }, [currentPage, itemsPerPage]);

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
        <div>
            <LabelList labels={labels} />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                // setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                paginate={setCurrentPage}
                />
        </div>
        // <div style={{display: "flex", flexFlow: "column wrap",  height: "10000px"}}>
        //     {labels.map((label) => (
        //         <div className="label-display" key={label.id}>
        //                 <p key={label.id}>{label.labelCode} {label.labelAlias} {label.company}</p>
        //         </div>
        //     ))}
        // </div>
    )
};

export default InventoryList;