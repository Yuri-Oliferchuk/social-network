import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";

const maxLength10 = maxLengthCreator(100);

const AddMessageForm: FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormPropsType> & AddMessageFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddMessageFormValuesTypeKeys>( "newMessageBody", "NewMessage", Textarea, [requiredField, maxLength10])}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const ReduxAddMessageForm = reduxForm<AddMessageFormValuesType, AddMessageFormPropsType>({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default ReduxAddMessageForm;

type AddMessageFormValuesType = {
    newMessageBody: string
}
type AddMessageFormPropsType = {}
type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormValuesType, string>