import React from "react";
import style from "./ProfileStatus.module.css"

class ProfileStatus extends React.Component {
    constructor (props) {
        super (props)
        this.state = { editMode: false }
    }

    activateEditMode = () => {
        this.setState({ editMode: true })
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false })
    }

    render = () => {
        return (
            <div>
                { !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.aboutMe}</span>
                    </div>}
                { this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode} 
                               className={style.statusInput} 
                               value={this.props.aboutMe}
                               autoFocus={true} ></input>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;