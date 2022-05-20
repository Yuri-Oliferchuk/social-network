import React, { useEffect, useState, FC, ChangeEvent } from "react";
import style from "./ProfileStatus.module.css"

type PropsType = {
    status: string
    isOwner: boolean
    updateUserStatus: (statusText: string) => void

}

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [statusText, setStatusText] = useState(props.status);

    useEffect( () => {
        setStatusText(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner && setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(statusText)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.target.value)
    }

    return (
        <div>
            { !editMode &&
                <div onDoubleClick={activateEditMode}>{props.status || "No status... :("}</div>}
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

export default ProfileStatus;