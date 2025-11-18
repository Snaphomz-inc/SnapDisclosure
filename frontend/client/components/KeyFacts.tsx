import { fmtCurr } from "@/lib/utils";

interface KeyFactsProps {
  loanAmount?: number;
  rate?: number;
  apr?: number;
  termYears?: number;
  monthlyPayment?: number;
  cashToCloseAmount?: number;
  cashToCloseDirection?: string;
  prepaymentPenalty?: boolean | { has?: boolean };
  balloonPayment?: boolean | { has?: boolean };
  loanProduct?: string;
  loanType?: string;
}

export function KeyFacts({
  loanAmount,
  rate,
  apr,
  termYears,
  monthlyPayment,
  cashToCloseAmount,
  cashToCloseDirection,
  prepaymentPenalty,
  balloonPayment,
  loanProduct,
  loanType
}: KeyFactsProps) {
  const hasPrepaymentPenalty = typeof prepaymentPenalty === 'boolean'
    ? prepaymentPenalty
    : prepaymentPenalty?.has || false;

  const hasBalloonPayment = typeof balloonPayment === 'boolean'
    ? balloonPayment
    : balloonPayment?.has || false;

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div>
          <span className="block text-xs text-white/60">Loan Amount</span>
          <span className="text-lg font-semibold text-white">{fmtCurr(loanAmount)}</span>
        </div>
        <div>
          <span className="block text-xs text-white/60">Interest Rate</span>
          <span className="text-lg font-semibold text-white">{rate ?? "—"}%</span>
        </div>
        <div>
          <span className="block text-xs text-white/60">APR</span>
          <span className="text-lg font-semibold text-white">{apr ?? "—"}%</span>
        </div>
        <div>
          <span className="block text-xs text-white/60">Monthly P&I</span>
          <span className="text-lg font-semibold text-white">{fmtCurr(monthlyPayment)}</span>
        </div>
        <div>
          <span className="block text-xs text-white/60">Term</span>
          <span className="text-lg font-semibold text-white">{termYears ?? "—"} years</span>
        </div>
        <div>
          <span className="block text-xs text-white/60">Loan Type</span>
          <span className="text-lg font-semibold text-white">
            {loanProduct ?? "—"} {loanType ? `(${loanType})` : ""}
          </span>
        </div>
        <div>
          <span className="block text-xs text-white/60">Cash to Close</span>
          <span className="text-lg font-semibold text-white">
            {fmtCurr(cashToCloseAmount)} {cashToCloseDirection ? `(${cashToCloseDirection.replace("_", " ")})` : ""}
          </span>
        </div>
      </div>

      {(hasPrepaymentPenalty || hasBalloonPayment) && (
        <div className="mt-4 flex flex-col gap-2">
          {hasPrepaymentPenalty && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 flex gap-3 items-start backdrop-blur-sm">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <span className="text-sm text-orange-100 leading-relaxed">
                <strong>Prepayment Penalty:</strong> This loan has a prepayment penalty. You may be charged a fee if you pay off or refinance early.
              </span>
            </div>
          )}
          {hasBalloonPayment && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 flex gap-3 items-start backdrop-blur-sm">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <span className="text-sm text-orange-100 leading-relaxed">
                <strong>Balloon Payment:</strong> This loan requires a large final payment. Make sure you understand when it's due and how you'll pay it.
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
