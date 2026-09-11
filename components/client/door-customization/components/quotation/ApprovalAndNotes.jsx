"use client";

export default function ApprovalAndNotes({
  notes = [],
}) {
  return (
    <div className="mt-8 border-t border-[#e5e5e5] pt-7">

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

        {/* =====================================================
            CUSTOMER APPROVAL
        ====================================================== */}
        <div>
          <h3 className="mb-10 text-[13px] font-bold text-[#252525]">
            CUSTOMER APPROVAL
          </h3>

          <ApprovalField label="Name:" />

          <ApprovalField label="Signature:" />

          <ApprovalField label="Date:" />
        </div>

        {/* =====================================================
            AUTHORIZED SIGNATURE
        ====================================================== */}
        <div>
          <h3 className="mb-10 text-[13px] font-bold text-[#252525]">
            AUTHORIZED SIGNATURE
          </h3>

          <ApprovalField label="Name:" />

          <ApprovalField label="Signature:" />

          <ApprovalField label="Date:" />
        </div>

        {/* =====================================================
            NOTES
        ====================================================== */}
        <div>
          <h3 className="mb-6 text-[13px] font-bold text-[#252525]">
            NOTES
          </h3>

          <ul className="space-y-2 pl-4 text-[13px] leading-5 text-[#666]">
            {notes.map((note, index) => (
              <li key={index} className="list-disc">
                {note}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}


/* =============================================================
   APPROVAL FIELD
============================================================= */

function ApprovalField({ label }) {
  return (
    <div className="mb-7 flex items-end gap-1 text-[13px] text-[#666]">

      <span className="shrink-0">
        {label}
      </span>

      <div className="h-[24px] flex-1 border-b border-dashed border-[#cfcfcf]" />
    </div>
  );
}