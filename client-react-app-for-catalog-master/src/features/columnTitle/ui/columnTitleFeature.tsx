import React, {FC} from 'react';
import {TableCell, TableHead, TableRow} from "@mui/material";

interface IColumnTitleFeature {
    titles: string[];
}

const ColumnTitleFeature: FC<IColumnTitleFeature> = ({titles}) => {
    return (
        <TableHead style={{width:"100%"}}>
            <TableRow>
                {titles.map(value =>
                    <TableCell key={value}>{value}</TableCell>
                )}
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ColumnTitleFeature;