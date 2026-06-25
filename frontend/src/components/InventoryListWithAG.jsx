import { useEffect, useMemo, useState } from "react"
import CreateLabel from "./CreateLabel";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { InventoryLinkRenderer } from "./InventoryLinkRenderer";
import { DeleteButtonRenderer } from "./DeleteButtonRenderer";

const InventoryListAG = () => {
    //fetchs our data and then applies it to the agGrid
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

    const [isCreateLabel, setCreateLabel] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState ([
        { field: "labelCode",
            headerName: "Label Code",
            cellRenderer: InventoryLinkRenderer,
        },
        { field: "labelAlias"},
        { field: "company"},
                {
            headerName: "Delete",
            cellRenderer: DeleteButtonRenderer,
            cellRendererParams: {
                onDeleteComplete: fetchLabels
            },
        }
    ]);

    //enables our filter and enables flex on our columns
    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        filter: true,
        };
    }, []);

    //fetchs our labels once whenever called
    useEffect(() => {
        fetchLabels();
    }, []);

    return (
        <div>
            {/* creates a button that lets us add a label to the database, will need to move eventually */}
            <div className="create-label-button">
                {!isCreateLabel ? <button onClick={() => {
                    setCreateLabel(true);
                }}>Create Label</button> : ""}
            </div>
            {isCreateLabel ? <CreateLabel onLabelCreated={fetchLabels} setCreateLabel={setCreateLabel} /> :
                <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine" style={{ width: "75%", height: "1000px"}}>
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