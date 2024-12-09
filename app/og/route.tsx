import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "News Atlas";
  let subtitle = url.searchParams.get("subtitle") || "Your daily news source";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            maxWidth: "800px",
            padding: "4rem",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {title}
          </h2>
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "500",
              color: "white",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {subtitle}
          </h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
