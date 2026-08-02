"use client";

export default function OptionLocation({ locationData }) {
  return (
    <details
      open
      className="group/item mt-2 overflow-hidden rounded-xl bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
        <span className="text-[16px] font-medium">Locations</span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-gray-500 transition-transform group-open/item:rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      <div className="border-t border-gray-100 px-5 pb-5 pt-4">
        <label className="mb-2 block text-[12px] font-medium text-gray-500">
          Door Location
        </label>

        <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-[14px] outline-none transition focus:border-[#198754] focus:bg-white focus:ring-4 focus:ring-[#aaf485]/60">
          <option>Select door location</option>
          {locationData?.map((item) => (
            <option key={item._id} value={item.doorLocationValue}>
              {item.doorLocationName}
            </option>
          ))}
        </select>
      </div>
    </details>
  );
}
