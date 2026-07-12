import { useState } from "react";

export function useDeleteDialog(){
    const [open, setOpen] = useState<boolean>(false);
    const [selectedElementId, setSelectedElementId] = useState<string>();

    const openDeleteDialog = () => {
        setOpen(true);
    };

    const closeDeleteDialog = () => {
        setOpen(false);
    };

    return {
        open,
        openDeleteDialog,
        closeDeleteDialog,
        selectedElementId,
        setSelectedElementId
    };
}