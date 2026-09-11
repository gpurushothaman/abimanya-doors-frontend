const quotationMockData = {
  quoteNumber: "EST-2026-8590",

  customer: {
    date: "18-Aug-2026",
    quoteValidity: "30 Days",
    salesExec: "Arun Kumar",

    customerName: "Mr. Ramesh Kumar",
    projectName: "Lake View Apartments",
    contactNumber: "+91 99999 99999",

    billingAddress: "Chennai, Tamil Nadu - 600001",
    shippingAddress: "Chennai, Tamil Nadu - 600001",
  },

  configuration: [
    ["Door Location", "Not Selected", "Frame Included", "full"],

    ["Door Design", "laminate", "Frame Type", "solidWoodJamb"],

    ["Door Sub Design", "elite", "Frame Option", "Africanteak"],

    ["Door Model", "LE_1", "Threshold", "Yes"],

    ["Door Shade", "LE_1_european_walnut", "Jamb Location", "Front"],

    ["Door Thickness", "45", "Architrave - Front", "S40"],

    ["Door Orientation", "RHS", "Architrave - Back", "S60"],

    ["Wall Size (HxWxT)", "2000 x 1000 x 140 mm", "Quantity", "1"],

    ["Finished Door Height", "1898 mm", "Effective SFT", "18.34605"],

    ["Finished Door Width", "898 mm", "", ""],
  ],

  items: [
    {
      slNo: 1,
      description: "Door Shutter",
      quantity: "18.34605",
      unit: "SFT",
      amount: "15,649.182",
    },

    {
      slNo: 2,
      description: "Wooden Frame",
      badge: "Price Not Configured",
      quantity: "19.68504",
      unit: "RFT",
      amount: "0",
    },

    {
      slNo: 3,
      description: "Architrave Front (S40)",
      quantity: "16.65026",
      unit: "RFT",
      amount: "1,914.78",
    },

    {
      slNo: 4,
      description: "Architrave Back (S60)",
      quantity: "16.84711",
      unit: "RFT",
      amount: "2,712.385",
    },

    {
      slNo: 5,
      description: "Jamb (Front)",
      quantity: "19.68504",
      unit: "RFT",
      amount: "9,842.52",
    },

    {
      slNo: 6,
      description: "Hardware & Accessories",
      badge: "Price Not Configured",
      quantity: "1",
      unit: "NOS",
      amount: "0",
    },
  ],

  commercial: {
    subtotalA: "30,118.867",
    transportCharges: "1,500",
    dealerMargin: "3,012.00",
    dealerMarginLabel: "Dealer Margin (10%)",
    subtotalB: "34,630.867",
    gst: "6,234.00",
    grandTotal: "40,864.867",
  },

  termsLeft: [
    {
      title: "Quotation Validity:",
      text: "Valid for 30 days from the date of issue.",
    },
    {
      title: "Payment Terms:",
      text: "50% advance along with PO. Balance 50% prior to dispatch.",
    },
    {
      title: "Delivery & Execution:",
      text: "As per approved drawings, BOQ and site readiness.",
    },
    {
      title: "Scope of Work:",
      text: "Limited to BOQ. Transport / unloading / shifting / installation under client scope unless agreed.",
    },
  ],

  termsRight: [
    {
      title: "Natural Material Variation:",
      text: "Shade / grain variation is natural.",
    },
    {
      title: "Drawings & Job Sheet:",
      text: "Production after approval. Changes after approval are chargeable.",
    },
    {
      title: "Measurement Tolerance:",
      text: "±10 mm allowed.",
    },
    {
      title: "Delays & Force Majeure:",
      text: "Company not liable.",
    },
  ],
   notes: [
    "Prices are inclusive of material & standard finishing.",
    "Transportation and taxes as mentioned.",
    "Delivery timeline: 15 - 25 working days from date of approval.",
  ],
};

export default quotationMockData;