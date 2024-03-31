import { NextResponse } from "next/server";
import fetch from "node-fetch";
require("dotenv").config();

async function getAvailabilityInfo(ISBN) {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", process.env.NLB_API_KEY);
  myHeaders.append("X-App-Code", process.env.NLB_APP_CODE);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    `https://openweb.nlb.gov.sg/api/v2/Catalogue/GetAvailabilityInfo?ISBN=${ISBN}`,
    requestOptions
  );

  const data = await response.json();

  return data;
}

export async function GET(request) {
  const ISBN = request.nextUrl.searchParams.get("ISBN");
  if (!ISBN)
    return NextResponse.json({
      error: "No keyword specified, try ?ISBN={book ISBN here}",
    });
  const data = await getAvailabilityInfo(ISBN);
  return NextResponse.json(data);
}
