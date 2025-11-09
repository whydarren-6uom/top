import { ImageResponse } from "next/og";

// Image metadata
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Image generation
export default async function Icon() {
  // Direct Sanity CDN URL for your profile picture
  const profileImageUrl =
    "https://cdn.sanity.io/images/7zagsrvs/production/c9d666c1668f5bf13e195febf450f6dad9de9f4b-1128x1129.jpg";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
        }}
      >
        <img
          src={profileImageUrl}
          alt="Profile"
          width="32"
          height="32"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
