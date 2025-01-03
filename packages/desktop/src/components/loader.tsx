import { LoaderIcon } from "lucide-react";
export default function Loader({ description }: { description: string }) {
  return (
    <div className="flex flex-col items-center justify-center animate-pulse">
      <LoaderIcon className="size-16 text-gray-200 animate-spin" />
      <div className="text-center text-gray-400">{description}</div>
    </div>
  );
}
