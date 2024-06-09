import { IFibrePlan, IRowItem, plans } from "./interfaces";

export const url = "https://stm-dev.intentio.co.za/api/portal";


export const rowItems: IRowItem[] = [
  {
    link: "/ten-megabytes",
    image: "Recharge-Blue-Icon",
    title: "Recharge"
  },
  {
    link: "/fibreplane",
    image: "Fibre_Plans-Blue Icon",
    title: "Fibre Plans"
  },
  {
    link: "/hundred-megabytes",
    image: "Check-coverage-Sign up -Blue Icon",
    title: "Check Coverage"
  },

];

export const fibrePlans: Record<plans, IFibrePlan> = {
  10: {
    productId: 1,
    size: "10 Mbps",
    amount: "350",
    activation: "399",
    link: "/ten-megabytes",
    list: [
      "Free Installation.",
      "Free Router.",
      "Activation Fee: R399",
      "Monthly Payment: R350",
      "Total Payment: R749"
    ]
  },
  20: {
    productId: 2,
    size: "20 Mbps",
    amount: "599",
    activation: "399",
    link: "/twenty-megabytes",
    list: [
      "Free Installation.",
      "Free Router.",
      "Free Connection.",
      "Activation Fee: R399",
      "Monthly Payment: R599",
      "Total Payment: R898"
    ]
  },
  30: {
    productId: 6,
    size: "30 Mbps",
    amount: "899",
    activation: "399",
    link: "/thirty-megabytes",
    list: [
      "Free Installation.",
      "Free Router.",
      "Free Connection.",
      "Activation Fee: R399",
      "Monthly Payment: R899",
      "Total Payment: R1098"
    ]
  },
  50: {
    productId: 3,
    size: "50 Mbps",
    amount: "999",
    activation: "399",
    link: "/fifty-megabytes",
    list: [
      "Free Installation.",
      "Free Router.",
      "Free Connection.",
      "Activation Fee: R399",
      "Monthly Payment: R999",
      "Total Payment: R1898"
    ]
  },
  100: {
    productId: 4,
    size: "100 Mbps",
    amount: "1199",
    activation: "999",
    link: "/hundred-megabytes",
    list: [
      "Free Installation.",
      "Free Router.",
      "Free Connection.",
      "Activation Fee: R999",
      "Monthly Payment: R1199",
      "Total Payment: R2198"
    ]
  },
}
export const planRoles = [
  "FTTHSA OFFICES",
  "WCSS",
  "VAR 1",
  "VAR 2",
  "VAR 3",
  "Tumelo",
  "Maggy",
  "Eunice",
  "Themba",
  "Tshiko",
  "Tishan",
  "Lloyd",
  "April",
  "Joel",
  "Thembinkosi",
  "Samual",
  "Calvin",
  "Michelle",
  "Sakhile",
];

export const complexBuildings = ["Larosa 52 Abel Rd,Berea",
  "Ridge Plaza 50 Primrose Terrace, Berea",
  "The Mark 32 Oreilly Street,Berea",
  "Toward Close 60 Hillbrow St,Berea",
  "Collette Court 66 Hillbrow Street, Berea",
  "Devemport 50 OReilly Rd, Berea",
  "Patberne 31 Claim Str, Berea ",
  "Sorrento Olivia Str,Berea ",
  "11 Olivia 11 Olivia Rd,Berea ",
  "Agin Court 6 Hadfield Rd, Berea ",
  "Aintree 44 Oreilly & Thudhope St, Berea ",
  "Algarve Flats 44 Oreilly Thudhope St,Berea",
  "Amlah Court Jager Str, Berea",
  "Andy Bostonian Hotel 29 Abel Rd, Berea",
  "Annper Heights 42 Catherine Ave, Berea ",
  "Arvin Court Oreilly rd , Berea ",
  "Ayoba Court Olivia Street, Berea ",
  "Barnato View Barnato Str, Berea ",
  "Berea Gardens Barnato & Beatrice, Berea",
  "Bergsig Flats Cnr Fife str & Bernado ",
  "Camelot Cnr Fife str & Bernado ",
  "Cardiff Arms Abel Rd, Berea ",
  "425 Windsor Place,48 Dukes Ave, windsor East ",
  "Aandrus,45 Lords Ave, Windsor East ",
  "Afroula,74 Viscounts Ave, Windsr East ",
  "8th on Eileen,8 Eileen Rd, Blairgowrie, Randburg ",
  "Apartments on Oak,352 Oak Ave, Randburg"];

export const planCities = [
  "Randburg CBD",
  "Strydom Park",
  "Windsor East",
  "Windsor West",
  "Hillbrow Johannesburg",
  "Berea Johannesburg",
]