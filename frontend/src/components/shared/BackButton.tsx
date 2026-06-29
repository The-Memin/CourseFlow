import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    label: string,
    to: string
}

export default function BackButton({ label, to }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className="cursor-pointer"
    >
      <ArrowLeft />
        {label}
    </Button>
  );
}