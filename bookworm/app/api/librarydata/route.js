const FeedParser = require("feedparser");
import fetch from "node-fetch";
import { NextResponse } from "next/server";

function parseFeed() {
  return new Promise((resolve, reject) => {
    const events = [];

    const parser = new FeedParser();

    fetch("https://eservice.nlb.gov.sg/rss/libraries")
      .then((res) => {
        if (!res.ok) {
          return reject(new Error(`Bad status code: ${res.status}`));
        }
        res.body.pipe(parser);
      })
      .catch((err) => reject(err));

    parser.on("error", (err) => {
      return reject(err);
    });

    parser.on("end", () => {
      return resolve(events);
    });

    parser.on("readable", () => {
      let item = parser.read();

      while (item) {
        events.push(item);
        item = parser.read();
      }
    });
  });
}

export async function GET() {
  const libData = [];
  try {
    const data = await parseFeed();
    for (const item of data) {
      if (item.title.toLowerCase().includes("library")) {
        libData.push({
          libName: item.title,
          libAddress: item["rss:address"]["#"],
          libCoords: item["georss:point"]["#"].split(" ").map(Number),
          libOpenHours: item["rss:operatinghours"]["#"],
        });
      }
    }
    return NextResponse.json(libData);
  } catch {
    return NextResponse.json({ error: "libData not ready" });
  }
}
