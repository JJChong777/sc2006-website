import { NextResponse } from "next/server";
import fetch from "node-fetch";
require("dotenv").config();

async function getBooks() {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", process.env.NLB_API_KEY);
  myHeaders.append("X-App-Code", process.env.NLB_APP_CODE);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://openweb.nlb.gov.sg/api/v2/Catalogue/GetTitles?Keywords=Divergent",
    requestOptions
  );

  const data = await response.json();

  return data;
}

export async function GET() {
  const bookData = [];
  const data = await getBooks();
  data["titles"].forEach((resource) => {
    if (resource["format"]["name"] === "Book") {
      bookData.push(resource);
    }
  });
  return NextResponse.json(bookData);
}
