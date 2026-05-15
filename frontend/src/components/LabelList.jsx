

const LabelList = ({ labels }) => {

    return (
        <div className="label-list" style={{display: "flex", flexFlow: "column wrap", height: "850px"}}>
            {labels.map((label) =>(
                <div key={label.id} className="label-list-item">
                    <p>{label.labelCode} {label.labelAlias} {label.company}</p>
                </div>
            ))}
        </div>
    );
};

export default LabelList;