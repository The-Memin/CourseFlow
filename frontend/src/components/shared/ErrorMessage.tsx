import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load the requested information. Please try again later.",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
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