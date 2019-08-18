
import React from 'react'
import { Typography, CardContent, Card } from '@material-ui/core';
export default function Item(props) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">Item {props.number}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}