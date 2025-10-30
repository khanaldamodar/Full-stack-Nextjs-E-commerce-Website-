"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// Dynamically import Swagger UI (client only)
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <div style={{ height: "100vh" }} className="swagger-container bg-white">
      {/* Fetches from your /api/swagger endpoint */}
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
