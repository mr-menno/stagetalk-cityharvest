import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { v4 as uuid } from "uuid";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

let deviceId = localStorage.getItem("deviceId") as string;
if (!deviceId) {
  deviceId = uuid();
  localStorage.setItem("deviceId", deviceId);
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexAuthProvider>
  </StrictMode>
);
