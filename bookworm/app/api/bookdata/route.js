import { NextResponse } from "next/server";
import fetch from "node-fetch";

async function getBooks() {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "oDFUaeOx`uaqwC4i5els^GB;W`>HD9OD");
  myHeaders.append("X-App-Code", "DEV-ChongJiejun");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://openweb.nlb.gov.sg/api/v2/Catalogue/GetTitles?Keywords=Singapore",
    requestOptions
  );

  const data = await response.json();

  return data;
}

export async function GET() {
  const data = await getBooks();
  return NextResponse.json(data);
}
