import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";

const maxLength10 = maxLengthCreator(100);

const AddMessageForm: FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Enter your message'
                       name="newMessageBody"
                       component={Textarea}
                       validate={[requiredField, maxLength10]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const ReduxAddMessageForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default ReduxAddMessageForm;