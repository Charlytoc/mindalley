export const Message = ({ text, type, prediction }) => {

    return (
        <div>{text}
        <span style={{background: "red"}}>{prediction}</span>
        </div>
    )
}