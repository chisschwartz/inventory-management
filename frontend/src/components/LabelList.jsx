

const LabelList = ({ labels }) => {

    return (
        <ul className="label-list">
            {labels.map((label) =>(
                <li key={label.id} className="label-list-item">
                    <p>{label.labelCode} {label.labelAlias} {label.company}</p>
                </li>
            ))}
        </ul>
    )
};

export default LabelList;