import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  value: number | string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}