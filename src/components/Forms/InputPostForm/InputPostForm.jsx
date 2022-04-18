import React from "react";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";

const InputPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostArea"
                       placeholder="Enter new post"
                       component="textarea" />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const ReduxInputPostForm = reduxForm({form: "inputPostForm"})(InputPostForm)

export default ReduxInputPostForm;