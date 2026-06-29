import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function CourseFilters({ search, status, onSearchChange, onStatusChange, }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Search course..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
      />

      <select className="h-10 rounded-md border bg-background px-3" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="ALL">
          All
        </option>

        <option value="NOT_STARTED">
          Not Started
        </option>

        <option value="IN_PROGRESS">
          In Progress
        </option>

        <option value="COMPLETED">
          Completed
        </option>

        <option value="PAUSED">
          Paused
        </option>
      </select>
    </div>
  );
}