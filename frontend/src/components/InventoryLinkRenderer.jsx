

export function InventoryLinkRenderer(params) {

    const link = `http://localhost:5176/labels/size/code/${params.value}`;
    
    return (
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer'
            }}
        >
            {params.value}
        </a>
    );
}