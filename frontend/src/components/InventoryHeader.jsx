import { Link } from "react-router-dom";

function InventoryHeader({ username, isAdmin, onLogout }) {
    return (
        <header className="topbar">
            <Link className="brand" to="/labels" aria-label="Label Room Inventory">
                Label Room Inventory
            </Link>
            <div className="account">
                {isAdmin && <Link className="text-button admin-nav-link" to="/admin">Admin</Link>}
                <span className="account-name">Signed in as <strong>{username}</strong></span>
                <button className="text-button" onClick={onLogout} type="button">Sign out</button>
            </div>
        </header>
    );
}

export default InventoryHeader;
