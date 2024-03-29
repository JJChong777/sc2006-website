"use client";

import dynamic from "next/dynamic";

// in a world where cors isn't an issue this would be the data I get
const libData = [
  {
    libName: "Ang Mo Kio Public Library",
    libAddress: "4300 Ang Mo Kio Avenue 6   Singapore 569842",
    libCoords: ["1.374784", "103.845581"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Bedok Public Library",
    libAddress:
      "11 Bedok North Street 1 Heartbeat@Bedok #02-03 & #03-04 Singapore 469662",
    libCoords: ["1.326971", "103.931664"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Bishan Public Library",
    libAddress: "5 Bishan Place  #01-01 Singapore 579841",
    libCoords: ["1.349844", "103.848840"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Bukit Batok Public Library",
    libAddress: "1 Bukit Batok Central Link West Mall #03-01 Singapore 658713",
    libCoords: ["1.349491", "103.749285"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Bukit Panjang Public Library",
    libAddress:
      "1 Jelebu Road Bukit Panjang Plaza #04-04 & 16/17 Singapore 677743",
    libCoords: ["1.379930", "103.764350"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Cheng San Public Library",
    libAddress: "90 Hougang Avenue 10 Hougang Mall #03-11 Singapore 538766",
    libCoords: ["1.372566", "103.893775"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Choa Chu Kang Public Library",
    libAddress:
      "21 Choa Chu Kang Ave 4 Lot One Shoppers' Mall #04-01/02 and #05-06 Singapore 689812",
    libCoords: ["1.384953", "103.745039"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Clementi Public Library",
    libAddress:
      "3155 Commonwealth Avenue West The Clementi Mall #05-13/14/15 Singapore 129588",
    libCoords: ["1.315056", "103.764306"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  // {
  //   libName: "Former Ford Factory",
  //   libAddress: "351 Upper Bukit Timah Rd   Singapore 588192",
  //   libCoords: ["1.352677", "103.769262"],
  //   libOpenHours: undefined,
  // },
  {
    libName: "Geylang East Public Library",
    libAddress: "50 Geylang East Ave 1   Singapore 389777",
    libCoords: ["1.317437", "103.885837"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Jurong Regional Library",
    libAddress: "21 Jurong East Central 1   Singapore 609732",
    libCoords: ["1.332888", "103.739243"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Jurong West Public Library",
    libAddress: "60 Jurong West Central 3  #01-03 Singapore 648346",
    libCoords: ["1.340630", "103.704512"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "library@chinatown",
    libAddress: "133 New Bridge Road Chinatown Point #04-12 Singapore 059413",
    libCoords: ["1.285255", "103.844943"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "library@esplanade",
    libAddress: "8 Raffles Avenue  #03-01 Singapore 039802",
    libCoords: ["1.289406", "103.855770"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "library@harbourfront",
    libAddress:
      "1 Harbourfront Walk VivoCity #03-05 (Lobby F) Singapore 098585",
    libCoords: ["1.264305", "103.822309"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "library@orchard",
    libAddress:
      "277 Orchard Road orchardgateway #03-12 / #04-11 Singapore 238858",
    libCoords: ["1.300626", "103.840191"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  // {
  //   libName: "National Archives of Singapore",
  //   libAddress: "1 Canning Rise   Singapore 179868",
  //   libCoords: ["1.293511", "103.848352"],
  //   libOpenHours: undefined,
  // },
  {
    libName: "National Library / Lee Kong Chian Reference Library",
    libAddress: "100 Victoria Street   Singapore 188064",
    libCoords: ["1.297196", "103.854287"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Pasir Ris Public Library",
    libAddress:
      "1 Pasir Ris Central St 3 White Sands #04-01/06 Singapore 518457",
    libCoords: ["1.372351", "103.949440"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Queenstown Public Library",
    libAddress: "53 Margaret Drive   Singapore 149297",
    libCoords: ["1.298706", "103.805520"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Sembawang Public Library",
    libAddress: "30 Sembawang Drive Sun Plaza #05-01 Singapore 757713",
    libCoords: ["1.448190", "103.819499"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Sengkang Public Library",
    libAddress:
      "1 Sengkang Square Compass One #03-28 & #04-19 Singapore 545078",
    libCoords: ["1.391322", "103.894688"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Serangoon Public Library",
    libAddress: "23 Serangoon Central NEX #04-82/83 Singapore 556083",
    libCoords: ["1.350639", "103.871813"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  {
    libName: "Singapore Botanic Gardens’ Library",
    libAddress:
      "1 Cluny Rd, Level 1, Botany Centre, Tanglin Entrance, Singapore Botanic Gardens,   Singapore 259569",
    libCoords: ["1.308466", "103.817947"],
    libOpenHours: "Mon - Fri: 09:00 AM - 05:00 PM",
  },
  {
    libName: "Tampines Regional Library",
    libAddress: "1 Tampines Walk Our Tampines Hub #02-01 Singapore 528523",
    libCoords: ["1.352391", "103.940821"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "The LLiBrary",
    libAddress:
      "11 Eunos Road 8  Lifelong Learning Institute #03-02 Singapore 408601",
    libCoords: ["1.319717", "103.892431"],
    libOpenHours: "Mon - Sat: 08:30 AM - 06:00 PM",
  },
  {
    libName: "Toa Payoh Public Library",
    libAddress: "6 Toa Payoh Central   Singapore 319191",
    libCoords: ["1.333618", "103.850969"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Woodlands Regional Library",
    libAddress: "900 South Woodlands Drive  #01-03 Singapore 730900",
    libCoords: ["1.435030", "103.786928"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Yishun Public Library",
    libAddress:
      "930 Yishun Ave 2 North Wing, Northpoint City #04-01 Singapore 769098",
    libCoords: ["1.429709", "103.835803"],
    libOpenHours: "Mon - Sun: 11:00 AM - 09:00 PM",
  },
  // {
  //   libName: "Book Dispenser @ Marine Parade",
  //   libAddress: "6 Marine Parade Central   Singapore 449411",
  //   libCoords: ["0.000000", "0.000000"],
  //   libOpenHours: undefined,
  // },
  {
    libName: "Central Public Library",
    libAddress: "100 Victoria Street National Library Board  Singapore 188064",
    libCoords: ["1.297414", "103.854235"],
    libOpenHours: "Mon - Sun: 10:00 AM - 09:00 PM",
  },
  {
    libName: "Punggol Regional Library",
    libAddress: "1 Punggol Drive One Punggol #01-12 Singapore 828629",
    libCoords: ["1.40870", "103.904990"],
    libOpenHours: "Mon - Sun: 12:00 PM - 09:00 PM",
  },
];

const Map = dynamic(() => import("@/components/map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function MapPage() {
  return (
    <>
      <div className="container p-32">
        <Map libData={libData} />
      </div>
    </>
  );
}
