"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function MapPage() {
  return (
    <>
      <div className="container p-32">
        <Map />
      </div>
    </>
  );
}
