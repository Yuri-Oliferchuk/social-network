import React, { useState } from "react";
import style from "./ProfileStatus.module.css"

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [statusText, setStatusText] = useState(props.status);

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.status !== this.props.status) {
    //         this.setState({ statusText: this.props.status})
    //     }
    // }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(statusText)
    }

    const onChangeStatus = (e) => {
        setStatusText(e.target.value)
    }

    return (
        <div>
            { !editMode &&
                <div onDoubleClick={activateEditMode}>{props.status || "Enter your status"}</div>}
            { editMode &&
                <div>
                    <input onBlur={deactivateEditMode} 
                            className={style.statusInput} 
                            value={statusText}
                            onChange={onChangeStatus}
                            autoFocus={true} ></input>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHooks;