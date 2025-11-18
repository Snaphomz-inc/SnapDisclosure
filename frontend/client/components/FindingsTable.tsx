import { StatusBadge } from "./StatusBadge";
import type { ReportItem } from "@shared/api";

interface FindingsTableProps {
  items: ReportItem[];
}

interface BpsAmount {
  amount: number | null;
  bps: number | null;
}

interface ExpectedRange {
  minBps: number;
  maxBps: number;
  minDollars: number | null;
  maxDollars: number | null;
  loanAmount?: number;
}

// Helper to parse BPS from observed value
function parseBpsAndAmount(observed?: string | number): BpsAmount {
  if (!observed) return { amount: null, bps: null };
  const match = String(observed).match(/\$?([\d,]+\.?\d*)\s*\(?([\d.]+)\s*bps\)?/);
  if (match) {
    return {
      amount: parseFloat(match[1].replace(/,/g, '')),
      bps: parseFloat(match[2])
    };
  }
  return { amount: typeof observed === 'number' ? observed : null, bps: null };
}

// Helper to get user-friendly description
function getUserFriendlyLabel(section: string, label: string): string {
  const mapping: Record<string, string> = {
    "Totals": "Math Check",
    "D + I equals J": "Total Costs Add Up Correctly",
    "A": "Lender Fees",
    "Origination Charges": "Lender Fees & Points",
    "B": "Required Services",
    "Services Borrower Did Not Shop For": "Required Third-Party Services",
    "C": "Optional Services",
    "Services Borrower Did Shop For": "Services You Could Shop For",
    "J": "Total Costs",
    "Total Closing Costs": "All Closing Costs Combined"
  };

  const sectionLabel = mapping[section] || section;
  const itemLabel = mapping[label] || label;

  if (section === "Totals") return itemLabel;
  return `${sectionLabel}: ${itemLabel}`;
}

// Helper to parse expected range from backend
function parseExpectedRange(expected?: string, observed?: string | number, computed?: { loan_amount?: number }): ExpectedRange | null {
  if (!expected) return null;

  // Try to extract BPS range: "18-40 bps (median: 29 bps)"
  const bpsMatch = expected.match(/([\d.]+)-([\d.]+)\s*bps/);
  if (bpsMatch) {
    const minBps = parseFloat(bpsMatch[1]);
    const maxBps = parseFloat(bpsMatch[2]);

    // Get loan amount from computed data if available
    const loanAmount = computed?.loan_amount;

    if (loanAmount) {
      // Convert BPS to dollar amounts
      const minDollars = (loanAmount * minBps) / 10000; // BPS to dollars
      const maxDollars = (loanAmount * maxBps) / 10000;

      return {
        minBps,
        maxBps,
        minDollars,
        maxDollars,
        loanAmount
      };
    }

    return {
      minBps,
      maxBps,
      minDollars: null,
      maxDollars: null
    };
  }

  return null;
}

// Helper to determine if a section is informational only (not benchmarked)
function isInformationalOnly(section: string): boolean {
  // Sections D, E, F, G, I are hardcoded as PASS in rules.py
  // H is now benchmarked as of the latest update
  return ["D", "E", "F", "G", "I"].includes(section);
}

// Helper to get plain English explanation with expected ranges
function getPlainEnglish(item: ReportItem): JSX.Element | string {
  const { amount, bps } = parseBpsAndAmount(item.observed);
  const note = item.note || "";
  const range = parseExpectedRange(item.expected, item.observed, item.computed);

  // For informational-only sections
  if (isInformationalOnly(item.section)) {
    return (
      <div>
        <div className="text-blue-600 text-sm flex items-center gap-1">ℹ️ Informational only (not benchmarked)</div>
        {item.note && <div className="text-gray-500 text-xs mt-1">{item.note}</div>}
      </div>
    );
  }

  // For arithmetic checks
  if (item.section === "Totals") {
    return item.status === "PASS"
      ? "✓ The numbers add up correctly"
      : "⚠️ The totals don't match (possible calculation error)";
  }

  // For fee comparisons with ranges
  if (range) {
    if (item.status === "PASS") {
      // Special case: $0 fees with custom note
      if (amount === 0 && note) {
        return (
          <div>
            <div>✓ {note}</div>
            <div className="text-sm text-gray-600 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
              Typical range: ${range.minDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} - ${range.maxDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>
        );
      }

      return (
        <div>
          <div>✓ Within normal range</div>
          <div className="text-sm text-gray-600 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
            Fair range: ${range.minDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} - ${range.maxDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
        </div>
      );
    }

    if (item.status === "FAIL" || item.status === "WARN") {
      const pct = note.match(/\+?(\d+)%/)?.[1];
      const pctNum = parseInt(pct || "0");
      const severity = pctNum > 200 ? "VERY HIGH" : pctNum > 100 ? "HIGH" : "Above normal";

      return (
        <div>
          <div className="font-semibold mb-1.5">⚠️ {severity} - {pct}% more than typical</div>
          <div className="text-sm text-gray-600 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
            Fair range: ${range.minDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} - ${range.maxDollars?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          {amount && range.maxDollars && (
            <div className="text-sm text-[#F57F2E] mt-1.5 font-semibold">
              You may be overpaying by ~${(amount - range.maxDollars).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          )}
        </div>
      );
    }
  }

  // Fallback for items without ranges
  if (note.includes("above median")) {
    const pct = note.match(/\+?(\d+)%/)?.[1];
    if (pct) {
      const pctNum = parseInt(pct);
      if (pctNum > 200) return `⚠️ VERY HIGH - You're paying ${pct}% more than typical`;
      if (pctNum > 100) return `⚠️ HIGH - You're paying ${pct}% more than typical`;
      if (pctNum > 50) return `Higher than typical by ${pct}%`;
      return `Slightly above average (${pct}% more)`;
    }
  }

  if (note.includes("below median")) {
    const pct = note.match(/(\d+)%/)?.[1];
    return `✓ Good deal - ${pct}% below typical`;
  }

  if (item.status === "PASS") {
    return "✓ Within normal range";
  }

  return note || "—";
}

export function FindingsTable({ items }: FindingsTableProps) {
  if (!items || items.length === 0) {
    return <p className="text-gray-500">No findings.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-2.5 text-left align-top w-[30%] text-gray-900 font-semibold">Fee Category</th>
            <th className="border-b border-gray-300 p-2.5 text-left align-top w-[20%] text-gray-900 font-semibold">You're Paying</th>
            <th className="border-b border-gray-300 p-2.5 text-left align-top w-[38%] text-gray-900 font-semibold">Assessment</th>
            <th className="border-b border-gray-300 p-2.5 text-center align-top w-[12%] text-gray-900 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => {
            const { amount, bps } = parseBpsAndAmount(it.observed);
            return (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-2.5 align-top break-words text-gray-900">
                  <strong>{getUserFriendlyLabel(it.section, it.label)}</strong>
                  <div className="text-xs text-gray-500 mt-0.5 font-normal">{it.section}</div>
                </td>
                <td className="border-b border-gray-300 p-2.5 align-top break-words text-gray-900">
                  {amount !== null ? (
                    <>
                      <strong>{typeof amount === 'number' ? `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : amount}</strong>
                      {bps && <div className="text-xs text-gray-500 mt-0.5 font-normal">{(bps / 100).toFixed(2)}% of loan</div>}
                    </>
                  ) : (it.observed ?? "—")}
                </td>
                <td className="border-b border-gray-300 p-2.5 align-top break-words text-gray-900">{getPlainEnglish(it)}</td>
                <td className="border-b border-gray-300 p-2.5 text-center align-top">
                  {isInformationalOnly(it.section) ? (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">INFO</span>
                  ) : (
                    <StatusBadge status={it.status} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
