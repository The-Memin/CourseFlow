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

import { type ReactNode } from "react";

interface Props{
  children: ReactNode,
  onDeleteAction: () => void
}

export function DropdownButton({ children, onDeleteAction }: Props) {

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
              onClick={(e) => {
                e.stopPropagation();
              }}
              onSelect={(e) => {
                e.preventDefault();
                onDeleteAction();
              }}
              className="cursor-pointer"
              variant="destructive"
            >
              <Trash2Icon />
              Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
