"use client";

export default function OptionDesign({ designData }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-500">
        Design
      </label>

      <select className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[14px] outline-none focus:border-[#198754] focus:ring-4 focus:ring-[#aaf485]/60">
        <option>Select door design</option>
        {designData?.map((item) => (
            <option key={item._id} value={item.designValue}>
              {item.designName}
            </option>
          ))}
      </select>
    </div>
  );
}
