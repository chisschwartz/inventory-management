import { useEffect, useMemo, useState } from "react"
import CreateLabel from "./CreateLabel";
// import "./InventoryList.css";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";

const InventoryListAG = () => {
    const [isCreateLabel, setCreateLabel] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState ([
        { field: "labelCode"},
        { field: "labelAlias"},
        { field: "company"},
    ]);

    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        filter: true,
        };
    }, []);

    useEffect(() => {
        fetchLabels();
    }, []);
        
    const fetchLabels = async () => {
        try {
            const response = await fetch("http://localhost:5176/api/labels", {
                method: 'GET'
            })

            .then(response => response.json())
            .then(rowData => setRowData(rowData))

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    };

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:5176/api/labels/${id}`, {
    //             method: 'DELETE',
    //             credentials: 'include',
    //             headers: {'Content-type': 'application/json'}
    //         });

    //         if(!response.ok) {
    //             throw new Error(`Error! Status: ${response.status}`);
    //         }
            
    //         fetchLabels();

    //     } catch(error) {
    //         console.error("Error deleting lable: ", error);
    //     }
    // };

 return (
    <div>
        <div className="create-label-button">
        {!isCreateLabel ? <button onClick={() => {
            setCreateLabel(true);
            }}>Create Label</button> : ""}
            </div>
            {isCreateLabel ? <CreateLabel onLabelCreated={fetchLabels} setCreateLabel={setCreateLabel}/> :
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="ag-theme-alpine" style={{ width: "500px", height: "500px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          debug={true}
        />
      </div>
    </AgGridProvider>
    }
    </div>
  );
};

export default InventoryListAG;