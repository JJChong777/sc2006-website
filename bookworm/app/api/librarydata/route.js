import { NextResponse } from "next/server";

const parser = require("rss-url-parser");

const RSSLibrariesURL = "https://eservice.nlb.gov.sg/rss/libraries";

export async function GET() {
  const res = await parser(RSSLibrariesURL);

  return NextResponse.json(res);
}
