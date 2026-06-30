import { useEffect, useMemo, useState } from "react"
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { EditButtonRenderer } from "./EditButtonRenderer";

//shows all of our labels in stock and their type
const IndividualItems = () => {
        const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:5176/api/labels/size", {
                method: 'GET'
            })

            .then(response => response.json())
            .then(rowData => setRowData(rowData))

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    };

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState ([
        { field: "labelCode"},
        { field: "size"},
        { field: "quantity"},
        {
            headerName: "Update Quantity",
            cellRenderer: EditButtonRenderer,
            cellRendererParams: {
                onEditComplete: fetchItems,
                url: `http://localhost:5176/api/labels/${params.data.id}`
            },
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        filter: true,
        };
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
                <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine" style={{ width: "1000px", height: "1000px"}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            debug={true}
                        />
                    </div>
                </AgGridProvider>
        </div>
    );
};

export default IndividualItems;