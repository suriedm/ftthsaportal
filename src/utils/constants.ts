import { IFibrePlan, IRowItem } from "./interfaces";

export const url = "https://stm-dev.intentio.co.za/api/portal";


export const rowItems:IRowItem[] = [
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

export const fibrePlans: IFibrePlan[] = [
    {
        size: "10 Mbp",
        amount: "R350",
        link: "/ten-megabytes",
        list: [
          "Free Installation.",
          "Free Router.",
          "Activation Fee: R399",
          "Monthly Payment: R350",
          "Total Payment: R749"
        ]
    },
    {
        size: "20 Mbp",
        amount: "R599",
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
    {
        size: "30 Mbp",
        amount: "R899",
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
    {
        size: "50 Mbp",
        amount: "R999",
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
    {
        size: "100 Mbp",
        amount: "R1199",
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
  ]