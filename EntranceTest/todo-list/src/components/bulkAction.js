import React from "react";
import '../css/mainStyle.css'
const BulkAction = ({setTodos, todos}) => {
    const bulkRemove = () => {
        setTodos([])
        localStorage.clear();
    }
    return(
        <div className='bulkAction'>
            <p>Bulk Action:</p>
            <button className='btn-detail allDone'>Done</button>
            <button onClick={bulkRemove} className='btn-remove allRemove'>Remove</button>
        </div>
    )
}

export default BulkAction;