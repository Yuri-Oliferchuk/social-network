import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../../common/formsControls/FormsControls";
import { ProfileType } from "../../../types/types";
import { maxLengthCreator, requiredField } from "../validators";
import style from "./ProfileDataForm.module.css"
 
const fieldLength20 = maxLengthCreator(20);

type ProfileFieldsType = {
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    contacts: Array<string>

}
type ProfileFieldsProps = {
    // initialValues={props.profile}
    profile: ProfileType,
    status: string,
    isOwner: boolean,
    updateUserStatus: (status: string) => void,
    editMode: boolean,
}
type ProfileFieldsKeys = Extract<keyof ProfileFieldsType, string>

const ProfileDataForm: FC<InjectedFormProps<ProfileFieldsType, ProfileFieldsProps> & ProfileFieldsProps> = (props) => {
    return (
        <form className={style.mainForm} onSubmit={ props.handleSubmit }>
            <button className={style.saveButton}>Save info</button>
            {props.error &&
                <div className={style.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <b>Full name:</b>{createField<ProfileFieldsKeys>( "fullName", "Full name", Input, [requiredField, fieldLength20] )}
            </div>
            <div className={style.isLooking} >
                <b>Looking for a job:</b>{createField<ProfileFieldsKeys>( "lookingForAJob", "", Input, [], {type: "checkbox", className: style.checkBoxContainer} )}
            </div>
            <div>
                <b>My Skils:</b> {createField<ProfileFieldsKeys>( "lookingForAJobDescription", "My Skils", Textarea, [fieldLength20] )}
            </div>
            <div>
                <b>About me:</b> {createField<ProfileFieldsKeys>( "aboutMe", "About me", Textarea, [fieldLength20] )}
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

const ProfileDataReduxForm = reduxForm<ProfileFieldsType, ProfileFieldsProps>({ form: 'profileData' })(ProfileDataForm)

export default ProfileDataReduxForm;

