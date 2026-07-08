import { SearchX } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = "Not found",
  message = "The requested resource doesn't exist or is no longer available.",
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {message}
      </p>
    </div>
  );
}