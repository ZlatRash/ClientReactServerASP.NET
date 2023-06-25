import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {observer} from "mobx-react";

interface ITextFieldEditorFeature {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextFieldEditorFeature: FC<ITextFieldEditorFeature> = ({value, onChange}) => {
    return (
        <TextField size="small"
                   value={value}
                   type={typeof value === "number" ? "number" : "text"}
                   onChange={onChange}/>
    );
};

export default observer(TextFieldEditorFeature);