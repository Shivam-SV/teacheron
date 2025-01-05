export default function ModalClose({onPress}){
    return <button className="btn btn-sm btn-ghost absolute top-1 right-1" onClick={() => onPress()} >✕</button>
}