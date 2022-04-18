import React from "react";
import style from "./ProfileStatus.module.css"

class ProfileStatus extends React.Component {
    constructor (props) {
        super (props)
        this.state = { editMode: false, statusText: this.props.status }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({ statusText: this.props.status})
        }
    }

    activateEditMode = () => {
        this.setState({ editMode: true })
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false })
        this.props.updateUserStatus(this.state.statusText)
    }

    onChangeStatus = (e) => {
        this.setState({ statusText: e.target.value })
    }

    render = () => {
        return (
            <div>
                { !this.state.editMode &&
                    <div onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "Enter your status"}</div>}
                { this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode.bind(this)} 
                               className={style.statusInput} 
                               value={this.state.statusText}
                               onChange={this.onChangeStatus.bind(this)}
                               autoFocus={true} ></input>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;