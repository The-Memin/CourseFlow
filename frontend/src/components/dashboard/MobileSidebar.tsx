import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { Dialog } from "radix-ui";

import NavItems from "./NavItems";

export default function MobileSidebar() {
  return (
    <Sheet>
      <Dialog.Title/>
      <Dialog.Description/>
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="mt-8">
          <NavItems />
        </div>
      </SheetContent>
    </Sheet>
  );
}