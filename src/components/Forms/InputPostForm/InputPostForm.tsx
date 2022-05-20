import React, { FC } from "react";
import { InjectedFormProps } from "redux-form";
import { reduxForm } from "redux-form";
import { createField, Textarea } from "../../../common/formsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../validators";

const maxLength10 = maxLengthCreator(300);

const InputPostForm: FC<InjectedFormProps<InputPostFormValuesType, InputPostFormPropsType> & InputPostFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<InputPostFormValuesTypeKeys>( "newPostArea", "Enter new post", Textarea, [requiredField, maxLength10])}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const ReduxInputPostForm = reduxForm<InputPostFormValuesType, InputPostFormPropsType>({form: "inputPostForm"})(InputPostForm)

export default ReduxInputPostForm;

export type InputPostFormValuesType = {
    newPostArea: string
}
type InputPostFormPropsType = {}
type InputPostFormValuesTypeKeys = Extract<keyof InputPostFormValuesType, string>