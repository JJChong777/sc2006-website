const FeedParser = require("feedparser");
import fetch from "node-fetch";
import { NextResponse } from "next/server";

export async function parseFeed() {
  const events = []; // Create an empty array to store parsed items
  const data = [];
  const parser = new FeedParser();

  try {
    const response = await fetch("https://eservice.nlb.gov.sg/rss/libraries");

    if (!response.ok) {
      throw new Error(`Bad status code: ${response.status}`);
    }

    response.body.pipe(parser);

    parser.on("error", (err) => {
      console.error("Error during parsing:", err);
    });

    parser.on("readable", () => {
      let item;
      while ((item = parser.read()) !== null) {
        events.push(item);
      }
    });

    parser.on("end", () => {
      // console.log("Parsing complete:", events);

      // Process the parsed items here (e.g., loop and print specific properties)
      for (const item of events) {
        data.push({
          libName: item.title,
          libAddress: item["rss:address"]["#"],
          libCoords: item["georss:point"]["#"].split(" ").map(Number),
          libOpenHours: item["rss:operatinghours"]["#"],
        });
        // Access other properties like 'link', 'date', etc. based on your needs
      }
      return data;
    });
  } catch (error) {
    console.error("Error fetching or parsing feed:", error);
  }
}

export async function GET() {
  const data = await parseFeed();
  return NextResponse.json(data);
}
