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
    const [isAddingSizing, setIsAddingSizing] = useState(false);
    const [newSize, setNewSize] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [addError, setAddError] = useState("");
    const [addSuccess, setAddSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddSizing = async (event) => {
        event.preventDefault();
        setAddError("");
        setAddSuccess("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/labels/size/code/${labelCode}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    size: newSize,
                    quantity: Number(newQuantity),
                }),
            });

            if (!response.ok) {
                throw new Error(`Stock item could not be added (status ${response.status}).`);
            }

            const createdSizing = await response.json();
            setRowData((currentItems) => [...currentItems, createdSizing]);
            setNewSize("");
            setNewQuantity("");
            setAddSuccess("Stock item added.");
        } catch (error) {
            setAddError(error.message || "Stock item could not be added. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <div className="table-toolbar">
                        <button
                            className="primary-button"
                            onClick={() => {
                                setIsAddingSizing((isAdding) => !isAdding);
                                setAddError("");
                                setAddSuccess("");
                            }}
                            type="button"
                        >
                            {isAddingSizing ? "Cancel add" : "Add size"}
                        </button>
                    </div>
                    {isAddingSizing && (
                        <form className="add-label-form add-sizing-form" onSubmit={handleAddSizing}>
                            <div className="form-field">
                                <label htmlFor="stock-size">Size</label>
                                <input
                                    autoFocus
                                    id="stock-size"
                                    maxLength="255"
                                    onChange={(event) => setNewSize(event.target.value)}
                                    placeholder="e.g. 4 × 6"
                                    required
                                    value={newSize}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="stock-quantity">Quantity</label>
                                <input
                                    id="stock-quantity"
                                    min="0"
                                    onChange={(event) => setNewQuantity(event.target.value)}
                                    required
                                    type="number"
                                    value={newQuantity}
                                />
                            </div>
                            {addError && <p className="form-error add-label-error" role="alert">{addError}</p>}
                            {addSuccess && <p className="form-success add-label-error" role="status">{addSuccess}</p>}
                            <button className="primary-button" disabled={isSubmitting} type="submit">
                                {isSubmitting ? "Adding…" : "Add stock"}
                            </button>
                        </form>
                    )}
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