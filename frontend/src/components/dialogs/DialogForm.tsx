import { useState } from "react";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { ReactNode } from "react";

interface Props{
    children: ReactNode,
    textButton: string,
    title: string,
    description: string,
    formId: string
}

export function DialogForm({ children, textButton, title, description, formId }: Props){
    const [open, setOpen] = useState(false);

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">{textButton}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                <Button className="cursor-pointer" onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                <Button type="submit" form={formId} className="cursor-pointer" >Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}