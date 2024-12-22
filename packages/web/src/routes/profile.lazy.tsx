import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col h-dvh overscroll-none">
      <div className="w-full bg-primary text-primary-foreground font-semibold p-2 flex flex-row">
        <div className="flex-1">Stagetalk</div>
      </div>
      <div className="flex flex-col flex-1 overflow-x-scroll p-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>Your profile...</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Team</CardTitle>
          </CardHeader>
          <CardContent>Your Team...</CardContent>
        </Card>
      </div>
    </div>
  );
}
