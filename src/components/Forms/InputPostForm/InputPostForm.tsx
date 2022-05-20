import React, { FC } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { reduxForm } from "redux-form";
import { Textarea } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";

const maxLength10 = maxLengthCreator(300);

const InputPostForm: FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostArea"
                       placeholder="Enter new post"
                       component={Textarea}
                       validate={[requiredField, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const ReduxInputPostForm = reduxForm({form: "inputPostForm"})(InputPostForm)

export default ReduxInputPostForm;