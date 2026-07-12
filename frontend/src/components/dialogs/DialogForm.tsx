

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
import { Loader2 } from "lucide-react";

interface Props{
    children: ReactNode,
    textButton: string,
    title: string,
    description: string,
    formId: string,
    isSubmitting: boolean,
    open: boolean,
    setOpen: (open: boolean) => void
}

export function DialogForm({
    children,
    textButton,
    title,
    description,
    formId,
    isSubmitting,
    open,
    setOpen
}: Props
){

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
                    <Button
                        type="submit"
                        form={formId}
                        className="cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (<Loader2 className="animate-spin mr-2 h-4 w-4"/>)}
                        {
                            isSubmitting
                            ? "Creating..."
                            : "Save Goal"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}