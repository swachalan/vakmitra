import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: () => <div className="pt-24 px-6 text-center"><h1 className="font-display text-4xl font-bold">Privacy Policy</h1><p className="mt-4 text-text-muted">Coming soon.</p></div>,
});
