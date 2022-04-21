import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";
import style from "./ProfileDataForm.module.css"

const fieldLength20 = maxLengthCreator(20);

const ProfileDataForm = (props) => {
    return (
        <form className={style.mainForm} onSubmit={ props.handleSubmit }>
            <button className={style.saveButton}>Save info</button>
            {props.error &&
                <div className={style.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <b>Full name:</b>{createField( "fullName", "Full name", Input, [requiredField, fieldLength20] )}
            </div>
            <div className={style.isLooking} >
                <b>Looking for a job:</b>{createField( "lookingForAJob", "", Input, [], {type: "checkbox", className: style.checkBoxContainer} )}
            </div>
            <div>
                <b>My Skils:</b> {createField( "lookingForAJobDescription", "My Skils", Textarea, [fieldLength20] )}
            </div>
            <div>
                <b>About me:</b> {createField( "aboutMe", "About me", Textarea, [fieldLength20] )}
            </div>
            <div>
                {Object.keys(props.profile.contacts).map( item => {
                    return (
                        <div key={item}>
                            <b>{item + `:`}</b> 
                            {createField( "contacts." + item, item, Input, [])}
                        </div>
                    )
                }
                )}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({ form: 'profileData' })(ProfileDataForm)

export default ProfileDataReduxForm;

