"use client";

import ApprovalAndNotes from "./ApprovalAndNotes";


/* =========================================================
   MAIN QUOTATION MODAL
========================================================= */

export default function QuotationModal({
  quotation,

  doorShutterQuotation = null,

  doorFrameQuotation = null,

  architraveQuotation = null,

  onClose,
}) {
  if (!quotation) {
    return null;
  }




  /* =======================================================
     MERGE ALL DYNAMIC DATA
  ======================================================== */

  const displayQuotation =
    mergeQuotationData(
      quotation,

      doorShutterQuotation,

      doorFrameQuotation,

      architraveQuotation
    );


  const {
    customer = {},
    configuration = [],
    items = [],
    commercial = {},
  } = displayQuotation;

console.log(
  "QUOTATION ORIENTATION:",
  doorShutterQuotation?.orientation
);

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/45
        p-4
        md:p-6
      "
    >

      <div
        className="
          flex
          h-[calc(100vh-32px)]
          w-full
          max-w-[1600px]
          flex-col
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-2xl
          md:h-[calc(100vh-48px)]
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className="
            shrink-0
            border-b
            border-gray-200
            bg-white
            px-5
            py-4
            md:px-7
          "
        >

          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-4
              lg:grid-cols-[1fr_auto_1fr]
            "
          >

            {/* LOGO */}

            <div className="flex items-center">

              <div className="flex items-center gap-2">

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-11
                    items-center
                    justify-center
                  "
                >

                  <div
                    className="
                      absolute
                      left-2
                      top-0
                      text-[42px]
                      font-black
                      leading-none
                      text-[#656565]
                    "
                  >
                    A
                  </div>


                  <div
                    className="
                      absolute
                      bottom-1
                      left-0
                      h-5
                      w-3
                      rounded-r
                      bg-[#8cc63e]
                    "
                  />

                </div>


                <div className="leading-none">

                  <div
                    className="
                      text-[30px]
                      font-bold
                      tracking-[-1.5px]
                      text-[#8cc63e]
                    "
                  >
                    abhimanya
                  </div>


                  <div
                    className="
                      mt-[-2px]
                      text-[18px]
                      font-semibold
                      tracking-[6px]
                      text-[#666666]
                    "
                  >
                    DOORS
                  </div>

                </div>

              </div>

            </div>


            {/* TITLE */}

            <div className="text-center">

              <h1
                className="
                  text-[22px]
                  font-extrabold
                  tracking-[-0.4px]
                  text-black
                  md:text-[28px]
                "
              >
                ESTIMATE / QUOTATION
              </h1>

            </div>


            {/* ACTIONS */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                lg:justify-end
              "
            >

              <button
                type="button"
                className="
                  rounded-md
                  bg-[#12b51b]
                  px-4
                  py-2.5
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                {displayQuotation.quoteNumber || "-"}
              </button>


              <button
                type="button"
                onClick={() =>
                  window.print()
                }
                className="
                  rounded-md
                  bg-[#12b51b]
                  px-4
                  py-2.5
                  text-[14px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#0d9515]
                "
              >

                <span className="mr-1">
                  ⬇
                </span>

                Download

              </button>


              <button
                type="button"
                className="
                  rounded-md
                  bg-[#12b51b]
                  px-4
                  py-2.5
                  text-[14px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#0d9515]
                "
              >
                Place Order
              </button>


              <button
                type="button"
                onClick={onClose}
                aria-label="Close quotation"
                className="
                  ml-1
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#ff4147]
                  text-3xl
                  font-light
                  text-[#2943d7]
                  shadow-sm
                  transition
                  hover:scale-105
                "
              >
                ×
              </button>

            </div>

          </div>

        </header>


        {/* =================================================
            SCROLLABLE CONTENT
        ================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-white
          "
        >

          <div
            className="
              px-5
              py-6
              md:px-9
            "
          >

            {/* CUSTOMER */}

            <CustomerDetails
              customer={customer}
            />


            {/* CONFIGURATION */}

            <SectionTitle>
              DOOR CONFIGURATION DETAILS
            </SectionTitle>


            <ConfigurationTable
              configuration={
                configuration
              }
            />


            {/* COST + COMMERCIAL */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]
              "
            >

              {/* ITEMS */}

              <div className="min-w-0">

                <SectionTitle>
                  ITEM-WISE COST BREAKDOWN
                </SectionTitle>


                <CostBreakdown
                  items={items}
                />

              </div>


              {/* COMMERCIAL */}

              <div className="min-w-0">

                <SectionTitle>
                  COMMERCIAL SUMMARY
                </SectionTitle>


                <CommercialSummary
                  commercial={
                    commercial
                  }
                />

              </div>

            </div>


            {/* TERMS */}

            <div className="mt-8">

              <SectionTitle>
                TERMS & CONDITIONS
              </SectionTitle>


              <TermsConditions
                left={
                  displayQuotation.termsLeft ||
                  []
                }
                right={
                  displayQuotation.termsRight ||
                  []
                }
              />


              <ApprovalAndNotes
                notes={
                  displayQuotation.notes ||
                  []
                }
              />

            </div>


            <div className="h-6" />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   COMMON HELPERS
========================================================= */

function normalizeLabel(
  value
) {
  return String(
    value ?? ""
  )
    .trim()
    .toLowerCase();
}


function toNumber(
  value
) {
  if (
    typeof value ===
    "number"
  ) {
    return Number.isFinite(
      value
    )
      ? value
      : 0;
  }


  const cleaned =
    String(
      value ?? ""
    )
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .trim();


  const number =
    Number(
      cleaned
    );


  return Number.isFinite(
    number
  )
    ? number
    : 0;
}


/* =========================================================
   SFT
========================================================= */

function formatSFT(
  value
) {
  return toNumber(
    value
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }
  );
}


/* =========================================================
   RFT
========================================================= */

function formatRFT(
  value
) {
  return toNumber(
    value
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }
  );
}


/* =========================================================
   ARCHITRAVE RFT
========================================================= */

function formatArchitraveRFT(
  value
) {
  return toNumber(
    value
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    }
  );
}


/* =========================================================
   MONEY
========================================================= */

function formatMoney(
  value
) {
  return toNumber(
    value
  ).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }
  );
}


/* =========================================================
   MM
========================================================= */

function formatMM(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }


  const numeric =
    String(value)
      .trim()
      .replace(
        /mm$/i,
        ""
      );


  return `${numeric} mm`;
}


/* =========================================================
   THICKNESS
========================================================= */

function formatThickness(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }


  const raw =
    String(value)
      .trim();


  const match =
    raw.match(
      /(?:DT[_-]?)?(\d+(?:\.\d+)?)/i
    );


  if (match) {
    return `${match[1]} mm`;
  }


  return raw;
}


/* =========================================================
   FRAME SECTION
========================================================= */

function formatFrameSection(
  configValue,
  dimensions
) {
  if (
    dimensions?.found
  ) {
    return `${dimensions.firstDimension} x ${dimensions.secondDimension} mm`;
  }


  return configValue || "-";
}



/* =========================================================
   DOOR SHUTTER CONFIGURATION
========================================================= */

function buildDoorShutterConfigurationRows(
  quotation
) {
  const config =
    quotation?.configuration ||
    {};

  const calculation =
    quotation?.calculation ||
    {};

  const wall =
    quotation?.wall ||
    {};

  const orientationName =
    quotation?.orientation?.doorOrientationName ||
    "-";

  return [

    [
      "Design",
      config.design || "-",

      "Sub Design",
      config.subDesign || "-",
    ],

    [
      "Model",
      config.model || "-",

      "Shade",
      config.shade || "-",
    ],

    [
      "Door Thickness",
      formatThickness(
        config.thickness
      ),

      "Door Wall Thickness",
      formatMM(
        wall.thickness
      ),
    ],

    [
      "Threshold",
      config.threshold || "-",

      "Door Orientation",
      orientationName,
    ],

  ];
}



/* =========================================================
   DOOR FRAME CONFIGURATION
========================================================= */

function buildDoorFrameConfigurationRows(
  quotation
) {
  const config =
    quotation?.configuration ||
    {};

  const frameIncluded =
    config.frameName ||
    config.frameValue ||
    "-";


  return [

    [
      "Frame Included",
      frameIncluded,

      "Frame Material",
      config.frameMaterial || "-",
    ],


    [
      "Frame Section",
      config.frameSectionSize || "-",

      "Frame Wall Height",
      formatMM(
        config.wallHeight
      ),
    ],


    [
      "Frame Wall Width",
      formatMM(
        config.wallWidth
      ),

      "",
      "",
    ],

  ];
}



/* =========================================================
   ARCHITRAVE CONFIGURATION
========================================================= */

function buildArchitraveConfigurationRows(
  quotation
) {
  const rows = [];

  /* -------------------------------------------------------
     FRONT
  ------------------------------------------------------- */

  const front =
    quotation?.front;

  if (front) {

    rows.push([

      "Architrave Front",

      `${front.pricing?.material ||
      "-"
      } - S${front.width ||
      "-"
      }`,

      "",
      "",

    ]);

  }


  /* -------------------------------------------------------
     BACK
  ------------------------------------------------------- */

  const back =
    quotation?.back;

  if (back) {

    rows.push([

      "Architrave Back",

      `${back.pricing?.material ||
      "-"
      } - S${back.width ||
      "-"
      }`,

      "",
      "",

    ]);

  }


  return rows;
}

/* =========================================================
   MERGE QUOTATION DATA
========================================================= */

function mergeQuotationData(
  quotation,
  doorShutterQuotation,
  doorFrameQuotation,
  architraveQuotation
) {
  /* =======================================================
     EXISTING ITEMS
  ======================================================== */

  const existingItems =
    Array.isArray(
      quotation?.items
    )
      ? quotation.items
      : [];


  let nextItems = [
    ...existingItems,
  ];


  /* =======================================================
     REMOVE OLD ARCHITRAVE MOCK ITEMS

     This prevents old mock rows such as:

     Architrave Front (S40)
     Architrave Back (S60)

     from staying in quotation.
  ======================================================== */

  nextItems =
    nextItems.filter(
      (item) => {

        const description =
          normalizeLabel(
            item?.description
          );


        const isArchitrave =
          description.startsWith(
            "architrave front"
          ) ||
          description.startsWith(
            "architrave back"
          );


        return !isArchitrave;
      }
    );


  /* =======================================================
     UPSERT ITEM
  ======================================================== */

  const upsertQuotationItem = ({
    quotationItem,
    fallbackId,
    fallbackDescription,
    quantityFormatter,
    rateUnit,
  }) => {

    if (!quotationItem) {
      return;
    }


    /* -----------------------------------------------------
       Find existing item
    ----------------------------------------------------- */

    const existingIndex =
      nextItems.findIndex(
        (item) => {

          const idMatch =
            item?.id ===
            fallbackId;


          const descriptionMatch =
            normalizeLabel(
              item?.description
            ) ===
            normalizeLabel(
              fallbackDescription
            );


          return (
            idMatch ||
            descriptionMatch
          );
        }
      );


    const existingItem =
      existingIndex >= 0
        ? nextItems[
        existingIndex
        ]
        : null;


    /* -----------------------------------------------------
       SL NO
    ----------------------------------------------------- */

    const maxSlNo =
      nextItems.length
        ? Math.max(
          ...nextItems.map(
            (item) =>
              Number(
                item?.slNo
              ) || 0
          )
        )
        : 0;


    const slNo =
      existingItem?.slNo ??
      maxSlNo + 1;


    /* -----------------------------------------------------
       RATE
    ----------------------------------------------------- */

    const rate =
      toNumber(
        quotationItem.rate
      );


    /* -----------------------------------------------------
       AMOUNT
    ----------------------------------------------------- */

    const amount =
      toNumber(
        quotationItem.amount
      );


    /* -----------------------------------------------------
       QUANTITY

       Door Shutter:
         SFT

       Door Frame:
         RFT

       Architrave:
         RFT
    ----------------------------------------------------- */

    const quantity =
      toNumber(
        quotationItem.quantity
      );


    /* -----------------------------------------------------
       CONFIGURED
    ----------------------------------------------------- */

    const priceConfigured =
      quotationItem.priceConfigured ??
      true;


    /* -----------------------------------------------------
       ITEM
    ----------------------------------------------------- */

    const mergedItem = {

      ...existingItem,

      ...quotationItem,

      id:
        fallbackId,

      slNo,

      description:
        quotationItem.description ||
        fallbackDescription,


      quantity:
        `${quantityFormatter(
          quantity
        )} ${rateUnit}`.trim(),


      rate:
        priceConfigured
          ? rate
          : 0,


      amount:
        priceConfigured
          ? formatMoney(
            amount
          )
          : formatMoney(
            0
          ),


      priceConfigured,


      badge:
        priceConfigured

          ? `₹ ${formatMoney(
            rate
          )}/${rateUnit}`

          : "Price Not Configured",
    };


    /* -----------------------------------------------------
       UPDATE / INSERT
    ----------------------------------------------------- */

    if (
      existingIndex >= 0
    ) {

      nextItems[
        existingIndex
      ] = mergedItem;

    } else {

      nextItems = [
        ...nextItems,
        mergedItem,
      ];

    }
  };


  /* =======================================================
     DOOR SHUTTER
  ======================================================== */

  upsertQuotationItem({

    quotationItem:
      doorShutterQuotation
        ?.quotationItem,

    fallbackId:
      "door-shutter",

    fallbackDescription:
      "Door Shutter",

    quantityFormatter:
      formatSFT,

    rateUnit:
      "SFT",
  });


  /* =======================================================
     DOOR FRAME
  ======================================================== */

  upsertQuotationItem({

    quotationItem:
      doorFrameQuotation
        ?.quotationItem,

    fallbackId:
      "wooden-frame",

    fallbackDescription:
      "Wooden Frame",

    quantityFormatter:
      formatRFT,

    rateUnit:
      "RFT",
  });


  /* =======================================================
     ARCHITRAVE FRONT
  ======================================================== */

  upsertQuotationItem({

    quotationItem:
      architraveQuotation
        ?.front
        ?.quotationItem,

    fallbackId:
      "architrave-front",

    fallbackDescription:
      "Architrave Front",

    quantityFormatter:
      formatArchitraveRFT,

    rateUnit:
      "RFT",
  });


  /* =======================================================
     ARCHITRAVE BACK
  ======================================================== */

  upsertQuotationItem({

    quotationItem:
      architraveQuotation
        ?.back
        ?.quotationItem,

    fallbackId:
      "architrave-back",

    fallbackDescription:
      "Architrave Back",

    quantityFormatter:
      formatArchitraveRFT,

    rateUnit:
      "RFT",
  });


  /* =======================================================
     EXISTING CONFIGURATION
  ======================================================== */

  const existingConfiguration =
    Array.isArray(
      quotation?.configuration
    )
      ? quotation.configuration
      : [];


  /* =======================================================
     DYNAMIC CONFIGURATION
  ======================================================== */

  const dynamicConfiguration = [

    /* Door Shutter */

    ...(
      doorShutterQuotation
        ? buildDoorShutterConfigurationRows(
          doorShutterQuotation
        )
        : []
    ),


    /* Door Frame */

    ...(
      doorFrameQuotation
        ? buildDoorFrameConfigurationRows(
          doorFrameQuotation
        )
        : []
    ),


    /* Architrave */

    ...(
      architraveQuotation
        ? buildArchitraveConfigurationRows(
          architraveQuotation
        )
        : []
    ),

  ];


  /* =======================================================
     REMOVE OLD MOCK CONFIGURATION
  ======================================================== */

  const dynamicLabels =
    new Set(
      dynamicConfiguration.flatMap(
        (row) => [

          normalizeLabel(
            row?.[0]
          ),

          normalizeLabel(
            row?.[2]
          ),

        ]
      )
    );


  const filteredMockConfiguration =
    existingConfiguration.filter(
      (row) => {

        const label1 =
          normalizeLabel(
            row?.[0]
          );

        const label2 =
          normalizeLabel(
            row?.[2]
          );


        /* ---------------------------------------------------
           REMOVE UNWANTED MOCK CONFIGURATION
        --------------------------------------------------- */

        const hiddenLabels = new Set([
          "effective sft",

          "frame threshold",
          "frame length",
          "frame rate",
          "frame amount",

          "front amount",
          "front length",
          "front rate",

          "back amount",
          "back length",
          "back rate",

          "finished door width",

          "finished height",
          "finished width",

          "wall height",
          "wall width",

          "frame included",
          "door orientation",
        ]);


        const hasHiddenLabel =
          hiddenLabels.has(label1) ||
          hiddenLabels.has(label2);


        if (
          hasHiddenLabel
        ) {
          return false;
        }


        /* ---------------------------------------------------
           REMOVE DUPLICATES REPLACED BY DYNAMIC DATA
        --------------------------------------------------- */

        return (
          !dynamicLabels.has(
            label1
          ) &&
          !dynamicLabels.has(
            label2
          )
        );
      }
    );
  /* =======================================================
 REBUILD SERIAL NUMBERS
======================================================== */

  nextItems = nextItems.map(
    (item, index) => ({
      ...item,
      slNo: index + 1,
    })
  );


  /* =======================================================
     COMMERCIAL
  ======================================================== */

  const commercial =
    calculateCommercialFromItems(
      nextItems,

      quotation?.commercial ||
      {}
    );


  /* =======================================================
     FINAL
  ======================================================== */

  return {

    ...quotation,

    configuration: [

      ...dynamicConfiguration,

      ...filteredMockConfiguration,

    ],

    items:
      nextItems,

    commercial,
  };
}


/* =========================================================
   COMMERCIAL CALCULATION
========================================================= */

function calculateCommercialFromItems(
  items,
  existingCommercial = {}
) {
  /* =======================================================
     SUBTOTAL A
  ======================================================== */

  const subtotalA =
    items.reduce(
      (total, item) => {

        return (
          total +
          toNumber(
            item?.amount
          )
        );

      },
      0
    );


  /* =======================================================
     TRANSPORT
  ======================================================== */

  const transportCharges =
    toNumber(
      existingCommercial
        ?.transportCharges
    );


  /* =======================================================
     DEALER MARGIN
  ======================================================== */

  const dealerMargin =
    toNumber(
      existingCommercial
        ?.dealerMargin
    );


  /* =======================================================
     SUBTOTAL B
  ======================================================== */

  const subtotalB =
    subtotalA +
    transportCharges +
    dealerMargin;


  /* =======================================================
     GST
  ======================================================== */

  const gst =
    subtotalB *
    0.18;


  /* =======================================================
     GRAND TOTAL
  ======================================================== */

  const grandTotal =
    subtotalB +
    gst;


  return {

    ...existingCommercial,

    subtotalA:
      formatMoney(
        subtotalA
      ),

    transportCharges:
      formatMoney(
        transportCharges
      ),

    dealerMarginLabel:
      existingCommercial
        ?.dealerMarginLabel ||
      "Dealer Margin",

    dealerMargin:
      formatMoney(
        dealerMargin
      ),

    subtotalB:
      formatMoney(
        subtotalB
      ),

    gst:
      formatMoney(
        gst
      ),

    grandTotal:
      formatMoney(
        grandTotal
      ),
  };
}


/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  children,
}) {
  return (

    <div
      className="
        flex
        h-[40px]
        items-center
        bg-[#12b51b]
        px-4
      "
    >

      <h2 className="text-[15px] font-bold text-white">
        {children}
      </h2>

    </div>

  );
}


/* =========================================================
   CUSTOMER DETAILS
========================================================= */

function CustomerDetails({
  customer,
}) {
  return (

    <div
      className="
        mb-8
        grid
        grid-cols-1
        gap-x-10
        gap-y-5
        md:grid-cols-3
      "
    >

      {/* LEFT */}

      <div className="space-y-5">

        <InfoRow
          icon="▣"
          label="Date:"
          value={
            customer?.date
          }
        />


        <InfoRow
          icon="◷"
          label="Quote Validity:"
          value={
            customer?.quoteValidity
          }
        />


        <InfoRow
          icon="♙"
          label="Sales Exec:"
          value={
            customer?.salesExec
          }
          bold
        />

      </div>


      {/* CENTER */}

      <div className="space-y-5">

        <InfoRow
          icon="♟"
          label="Customer Name:"
          value={
            customer?.customerName
          }
        />


        <InfoRow
          icon="▦"
          label="Project Name:"
          value={
            customer?.projectName
          }
        />


        <InfoRow
          icon="⌕"
          label="Contact Number:"
          value={
            customer?.contactNumber
          }
        />

      </div>


      {/* RIGHT */}

      <div className="space-y-5">

        <InfoRow
          icon="⌖"
          label="Billing Address:"
          value={
            customer?.billingAddress
          }
        />


        <InfoRow
          icon="▱"
          label="Shipping Address:"
          value={
            customer?.shippingAddress
          }
        />

      </div>

    </div>

  );
}


/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon,
  label,
  value,
  bold = false,
}) {
  return (

    <div
      className="
        grid
        grid-cols-[150px_minmax(0,1fr)]
        items-start
        gap-2
        text-[14px]
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-[#6a6a6a]
        "
      >

        <span className="w-4 text-center text-[15px]">
          {icon}
        </span>


        <span>
          {label}
        </span>

      </div>


      <div
        className={`
          border-b
          border-dashed
          border-gray-300
          pb-1
          text-[#303030]
          ${bold
            ? "font-bold"
            : "font-medium"
          }
        `}
      >
        {value}
      </div>

    </div>

  );
}


/* =========================================================
   CONFIGURATION TABLE
========================================================= */

function ConfigurationTable({
  configuration,
}) {
  /*
  |--------------------------------------------------------------------------
  | FLATTEN ALL NON-EMPTY LABEL/VALUE PAIRS
  |--------------------------------------------------------------------------
  */

  const pairs = [];

  configuration.forEach((row) => {
    const [
      label1,
      value1,
      label2,
      value2,
    ] = row;

    if (
      label1 &&
      String(label1).trim() !== ""
    ) {
      pairs.push([
        label1,
        value1,
      ]);
    }

    if (
      label2 &&
      String(label2).trim() !== ""
    ) {
      pairs.push([
        label2,
        value2,
      ]);
    }
  });


  /*
  |--------------------------------------------------------------------------
  | CREATE 2 PAIRS PER ROW
  |--------------------------------------------------------------------------
  */

  const rows = [];

  for (
    let i = 0;
    i < pairs.length;
    i += 2
  ) {
    rows.push([
      pairs[i],
      pairs[i + 1] || null,
    ]);
  }


  return (
    <div
      className="
        overflow-hidden
        border
        border-gray-200
      "
    >

      {rows.map(
        (
          row,
          index
        ) => {

          const firstPair =
            row[0];

          const secondPair =
            row[1];


          return (
            <div
              key={index}
              className="
                grid
                grid-cols-[1fr_1fr_1fr_1fr]
                border-b
                border-gray-200
                last:border-b-0
              "
            >

              {/* =================================================
                  FIRST LABEL
              ================================================== */}

              <div
                className="
                  bg-[#fbfbfb]
                  px-3
                  py-3
                  text-[14px]
                  text-[#606060]
                "
              >
                {firstPair?.[0]}
              </div>


              {/* =================================================
                  FIRST VALUE
              ================================================== */}

              <div
                className="
                  border-l
                  border-gray-200
                  bg-white
                  px-3
                  py-3
                  text-[14px]
                  font-semibold
                  text-[#008c91]
                "
              >
                {firstPair?.[1]}
              </div>


              {/* =================================================
                  SECOND LABEL
              ================================================== */}

              <div
                className="
                  border-l
                  border-gray-200
                  bg-[#fbfbfb]
                  px-3
                  py-3
                  text-[14px]
                  text-[#606060]
                "
              >
                {secondPair?.[0] || ""}
              </div>


              {/* =================================================
                  SECOND VALUE
              ================================================== */}

              <div
                className="
                  border-l
                  border-gray-200
                  bg-white
                  px-3
                  py-3
                  text-[14px]
                  font-semibold
                  text-[#008c91]
                "
              >
                {secondPair?.[1] || ""}
              </div>

            </div>
          );
        }
      )}

    </div>
  );
}


/* =========================================================
   COST BREAKDOWN
========================================================= */

function CostBreakdown({
  items,
}) {

  const subtotal =
    items.reduce(
      (total, item) => {

        return (
          total +
          toNumber(
            item?.amount
          )
        );

      },
      0
    );


  return (

    <div
      className="
        overflow-hidden
        border
        border-gray-200
      "
    >

      {/* HEADER */}

      <div
        className="
          grid
          grid-cols-[75px_minmax(0,1fr)_145px_175px]
          border-b
          border-gray-200
          bg-white
          text-[14px]
          font-semibold
          text-[#252525]
        "
      >

        <div className="px-3 py-3">
          Sl No
        </div>


        <div className="px-3 py-3">
          Item Description
        </div>


        <div className="px-3 py-3 text-center">
          SFT/RFT
        </div>


        <div className="px-3 py-3 text-right">
          Amount (₹)
        </div>

      </div>


      {/* ITEMS */}

      {items.map(
        (item, index) => (

          <div
            key={
              item?.id ||
              item?.slNo ||
              index
            }
            className="
              grid
              grid-cols-[75px_minmax(0,1fr)_145px_175px]
              border-b
              border-gray-200
              text-[14px]
              text-[#454545]
            "
          >

            <div className="px-3 py-4 text-center">
              {item?.slNo || index + 1}
            </div>


            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                px-3
                py-4
              "
            >

              <span>
                {item?.description}
              </span>


              {item?.badge && (

                <span
                  className={`
                    rounded-md
                    px-2
                    py-1
                    text-[11px]
                    font-bold
                    ${item?.priceConfigured
                      ? "bg-[#e5f8df] text-[#157347]"
                      : "bg-[#ffbd19] text-black"
                    }
                  `}
                >
                  {item.badge}
                </span>

              )}

            </div>


            <div className="px-3 py-4 text-center">

              <span className="border-b border-dashed border-gray-300 pb-1">
                {item?.quantity}
              </span>

            </div>


            <div className="px-3 py-4 text-right">
              {item?.amount}
            </div>

          </div>

        )
      )}


      {/* SUBTOTAL */}

      <div
        className="
          grid
          grid-cols-[75px_minmax(0,1fr)_145px_175px]
          bg-[#f5f5f5]
          font-bold
        "
      >

        <div />

        <div />

        <div className="px-3 py-4 text-right">
          SUBTOTAL (A)
        </div>

        <div
          className="
            px-3
            py-4
            text-right
            text-[#008c91]
          "
        >

          {formatMoney(
            subtotal
          )}

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   COMMERCIAL SUMMARY
========================================================= */

function CommercialSummary({
  commercial,
}) {
  return (

    <div
      className="
        overflow-hidden
        border
        border-gray-200
      "
    >

      <SummaryRow
        label="Subtotal (A)"
        value={`₹ ${commercial?.subtotalA ||
          "0.000"
          }`}
      />


      <SummaryRow
        label="Transport Charges"
        value={`₹ ${commercial?.transportCharges ||
          "0.000"
          }`}
      />


      <SummaryRow
        label={
          commercial?.dealerMarginLabel ||
          "Dealer Margin"
        }
        value={`₹ ${commercial?.dealerMargin ||
          "0.000"
          }`}
      />


      <div
        className="
          grid
          grid-cols-[1fr_auto]
          border-b
          border-gray-200
          bg-[#f4f4f4]
        "
      >

        <div className="px-4 py-4 text-[15px] font-bold">
          Sub Total (B)
        </div>


        <div
          className="
            min-w-[170px]
            px-4
            py-4
            text-right
            text-[15px]
            font-bold
          "
        >
          ₹ {
            commercial?.subtotalB ||
            "0.000"
          }
        </div>

      </div>


      <SummaryRow
        label="GST @ 18%"
        value={`₹ ${commercial?.gst ||
          "0.000"
          }`}
      />


      {/* GRAND TOTAL */}

      <div
        className="
          grid
          grid-cols-[1fr_auto]
          bg-[#12b51b]
          text-white
        "
      >

        <div
          className="
            px-4
            py-4
            text-[16px]
            font-bold
          "
        >
          GRAND TOTAL (B + GST)
        </div>


        <div
          className="
            min-w-[190px]
            px-4
            py-4
            text-right
            text-[16px]
            font-bold
          "
        >
          ₹ {
            commercial?.grandTotal ||
            "0.000"
          }
        </div>

      </div>

    </div>

  );
}


/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
}) {
  return (

    <div
      className="
        grid
        grid-cols-[1fr_auto]
        border-b
        border-gray-200
      "
    >

      <div
        className="
          px-4
          py-4
          text-[14px]
          text-[#444]
        "
      >
        {label}
      </div>


      <div
        className="
          min-w-[170px]
          border-l
          border-gray-200
          px-4
          py-4
          text-right
          text-[14px]
          font-medium
          text-[#444]
        "
      >
        {value}
      </div>

    </div>

  );
}


/* =========================================================
   TERMS
========================================================= */

function TermsConditions({
  left,
  right,
}) {
  return (

    <div
      className="
        border
        border-gray-200
        px-5
        py-5
      "
    >

      <div
        className="
          grid
          grid-cols-1
          gap-x-14
          gap-y-5
          md:grid-cols-2
        "
      >

        {/* LEFT */}

        <div className="space-y-4">

          {Array.isArray(left) &&
            left.map(
              (item, index) => (

                <TermRow
                  key={index}
                  {...item}
                />

              )
            )}

        </div>


        {/* RIGHT */}

        <div className="space-y-4">

          {Array.isArray(right) &&
            right.map(
              (item, index) => (

                <TermRow
                  key={index}
                  {...item}
                />

              )
            )}

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   TERM ROW
========================================================= */

function TermRow({
  title,
  text,
}) {
  return (

    <div
      className="
        flex
        items-start
        gap-3
        text-[13px]
        leading-6
        text-[#666]
      "
    >

      <div
        className="
          mt-[3px]
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-[#12b51b]
          text-[9px]
          font-bold
          text-[#12b51b]
        "
      >
        ✓
      </div>


      <div>

        <span className="font-bold text-[#555]">
          {title}
        </span>


        <span className="ml-1">
          {text}
        </span>

      </div>

    </div>

  );
}