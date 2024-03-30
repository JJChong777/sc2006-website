import { NextResponse } from "next/server";
import fetch from "node-fetch";
require("dotenv").config();

async function getBooks(keyword) {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", process.env.NLB_API_KEY);
  myHeaders.append("X-App-Code", process.env.NLB_APP_CODE);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    `https://openweb.nlb.gov.sg/api/v2/Catalogue/GetTitles?Keywords=${keyword}`,
    requestOptions
  );

  const data = await response.json();

  return data;
}

export async function GET(request) {
  const bookData = [];
  const keyword = request.nextUrl.searchParams.get("keyword");
  if (!keyword)
    return NextResponse.json({
      error: "No keyword specified, try ?keyword={book name here}",
    });
  const data = await getBooks(keyword);
  data["titles"].forEach((resource) => {
    if (resource["format"]["name"] === "Book") {
      resource["bookCover"] = `https://covers.openlibrary.org/b/isbn/${resource[
        "isbns"
      ][0].slice(0, 13)}-L.jpg`;
      bookData.push(resource);
    }
  });
  return NextResponse.json(bookData);
}
