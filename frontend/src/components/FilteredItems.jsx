import { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useParams } from "react-router-dom";
import { EditButtonRenderer } from "./EditButtonRenderer";
import InventoryHeader from "./InventoryHeader";
import { Link } from "react-router-dom";

//shows us the individual items for each label code
const FilteredItems = ({ token, username, isAdmin, onLogout }) => {
    const { labelCode } = useParams();
    const [rowData, setRowData] = useState([]);
    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(`/api/labels/size/code/${labelCode}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Unable to load stock (status ${response.status}).`);
            setRowData(await response.json());

        } catch(error) {
            console.error("Error fetching lables: ", error);
        }
    }, [labelCode, token]);
    
    const colDefs = useMemo(() => [
        { field: "labelCode", headerName: "Label code" },
        { field: "size", headerName: "Size" },
        { field: "quantity", headerName: "Quantity" },
        {
            headerName: "Update Quantity",
            cellRenderer: EditButtonRenderer,
            cellRendererParams: {
                onEditComplete: fetchItems,
                token
            },
        }
    ], [fetchItems, token]);

    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        minWidth: 130,
        filter: true,
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const loadItems = async () => {
            try {
                const response = await fetch(`/api/labels/size/code/${labelCode}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`Unable to load stock (status ${response.status}).`);
                setRowData(await response.json());
            } catch(error) {
                if (error.name !== "AbortError") {
                    console.error("Error fetching labels: ", error);
                }
            }
        };
        loadItems();
        return () => controller.abort();
    }, [labelCode, token]);

    return (
        <div className="inventory-app">
            <InventoryHeader username={username} isAdmin={isAdmin} onLogout={onLogout} />
            <main className="inventory-main">
                <div className="page-heading">
                    <div>
                        <Link className="back-link" to="/labels">← Back to inventory</Link>
                        <p className="eyebrow">STOCK DETAILS</p>
                        <h1>Label {labelCode}</h1>
                        <p className="page-description">Sizes and available quantities for this label.</p>
                    </div>
                </div>
                <section className="inventory-panel" aria-label={`Stock details for label ${labelCode}`}>
                    <AgGridProvider modules={[AllCommunityModule]}>
                    <div className="ag-theme-alpine inventory-grid">
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            debug={true}
                        />
                    </div>
                </AgGridProvider>
                </section>
                <footer className="page-footer">Inventory is visible to authorized users only.</footer>
            </main>
        </div>
    );
};

export default FilteredItems;