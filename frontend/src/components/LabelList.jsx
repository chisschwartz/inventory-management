

const LabelList = ({ labels }) => {

    return (
        <div className="label-list" style={{display: "flex", flexFlow: "column wrap", height: "850px"}}>
            {Object.entries(labels).map((label) => 
                <ul key={label.id} className="label-list-item">
                    <li key={label.id}>{label.labelCode} {label.labelAlias} {label.company}</li>
                </ul>
            )}
        </div>
    );
};

export default LabelList;