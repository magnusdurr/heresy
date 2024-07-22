import {Dialog, Stack, Typography} from "@mui/material";
import React from "react";

type HeresyDialogProps = {
    title: string,
    subtitle?: string,
    isOpen: boolean
    closeFunction: () => void
}

export function HeresyDialog({
                                 title,
                                 subtitle,
                                 isOpen,
                                 closeFunction,
                                 children
                             }: React.PropsWithChildren<HeresyDialogProps>) {
    return (
        <Dialog fullWidth
                maxWidth="md"
                sx={{m: 0, p: 0}}
                open={isOpen}
                onClose={closeFunction}>
            <Stack direction="column" spacing={1} sx={{m: 1}}>
                <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                    {title}
                    {subtitle && <><br/><small>{subtitle}</small></>}
                </Typography>
                {children}
            </Stack>
        </Dialog>
    )
}