interface StatusBadgeProps {
  status?: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = (status || "").toUpperCase();
  let cls = "inline-block px-3 py-1 rounded-full font-bold text-sm";
  let displayText = status || "—";

  if (s === "PASS") {
    cls += " bg-green-900 text-green-100";
    displayText = "All Good";
  } else if (s === "WARN") {
    cls += " bg-orange-50 text-orange-900";
    displayText = "Check Details";
  } else if (s === "FAIL") {
    cls += " bg-red-900 text-pink-200";
    displayText = "Needs Action";
  } else {
    cls += " bg-gray-200 text-gray-900";
  }

  return <span className={cls}>{displayText}</span>;
}
