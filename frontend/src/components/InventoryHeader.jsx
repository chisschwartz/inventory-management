import { Link } from "react-router-dom";

function InventoryHeader({ username, onLogout }) {
    return (
        <header className="topbar">
            <Link className="brand" to="/labels" aria-label="Stockroom inventory">
                <span className="brand-mark" aria-hidden="true">S</span>
                <span>Stockroom</span>
            </Link>
            <div className="account">
                <span className="account-name">Signed in as <strong>{username}</strong></span>
                <button className="text-button" onClick={onLogout} type="button">Sign out</button>
            </div>
        </header>
    );
}

export default InventoryHeader;
