import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pen, Trash2Icon } from "lucide-react";

import { useState, type ReactNode } from "react";

import { DeleteDialog } from "./DeleteDialog";

export function DropdownButton({ children, deleteAction }: { children: ReactNode; deleteAction: () => void }) {
  const [open, setOpen] = useState(false);

  const onChangeOpen = () => {
    setOpen(preview => !preview);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
          >
            {children}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Pen />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              variant="destructive"
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              <Trash2Icon />
              Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        title="Delete Goal?"
        target="goal"
        open={open}
        setOpen={onChangeOpen}
        onDelete={deleteAction}
      />
    </>
  );
}
