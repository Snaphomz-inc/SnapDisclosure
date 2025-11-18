import { useState } from "react";
import { FileInfo, SummaryPoint } from "@shared/api";
import { cn } from "@/lib/utils";

interface FileListDisplayProps {
  files: FileInfo[];
  className?: string;
  onClose?: () => void;
}

export default function FileListDisplay({ files, className, onClose }: FileListDisplayProps) {
  const [expandedFile, setExpandedFile] = useState<FileInfo | null>(null);
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

  const handleFileClick = (file: FileInfo) => {
    setExpandedFile(file);
    setExpandedPoint(null);
  };

  const closeModal = () => {
    setExpandedFile(null);
    setExpandedPoint(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* File Cards */}
      <div className="rounded-3xl bg-[#f5ebe5] p-8 border border-[#f1ded4] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h3 className="text-[#1a1108] text-2xl font-semibold mt-2">
            {files.length} {files.length === 1 ? "file" : "files"} uploaded
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#f9a66a] to-[#f46c3a] hover:from-[#fbb483] hover:to-[#f77d4c] transition-colors"
            >
              Upload Another
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <article
              key={file.file_name || `${index}`}
              onClick={() => handleFileClick(file)}
              className="group relative rounded-2xl border bg-[#fdf7f3] p-6 shadow transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <h3 className="text-lg font-bold text-black mb-3">{file.title || file.file_name}</h3>

              {file.points && file.points.length > 0 ? (
                <ul className="space-y-3">
                  {file.points.map((p: SummaryPoint, i: number) => (
                    <li
                      key={i}
                      className={cn(
                        "flex items-start gap-2 p-3 rounded-lg border transition-all duration-300",
                        p.is_red_flag
                          ? "border-red-500 bg-red-50 shadow-md hover:shadow-red-300 hover:scale-[1.02]"
                          : "border-transparent hover:bg-[#f6efea]"
                      )}
                    >
                      {p.is_red_flag && (
                        <span className="text-red-600 mt-0.5 shrink-0 text-xl">⚠️</span>
                      )}
                      <div>
                        <p
                          className={cn(
                            "font-semibold mb-1",
                            p.is_red_flag ? "text-red-700" : "text-gray-800"
                          )}
                        >
                          {p.title}
                          {p.is_red_flag && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full">
                              RED FLAG
                            </span>
                          )}
                        </p>
                        <p
                          className={cn(
                            "text-sm leading-snug",
                            p.is_red_flag ? "text-red-800/80" : "text-gray-600"
                          )}
                        >
                          {p.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No summary available</p>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      {expandedFile && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(23,16,10,0.6)] backdrop-blur-sm px-4 py-10"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[#2f2932] text-[#f7f3ed] shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 px-4 py-2 text-xs font-semibold text-[#f7c29c] rounded-full border hover:bg-[#3a3440]"
            >
              Close
            </button>

            <div className="px-10 py-12 space-y-6 max-h-[70vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4">{expandedFile.file_name}</h3>

              {expandedFile.points && expandedFile.points.length > 0 ? (
                <ul className="space-y-4">
                  {expandedFile.points.map((p: SummaryPoint, i: number) => (
                    <li
                      key={i}
                      className={cn(
                        "border rounded-lg p-4 transition-colors",
                        p.is_red_flag
                          ? "border-red-500 bg-[#4a1f1f] hover:bg-[#5c2a2a]"
                          : "border-[#4b434f] bg-[#3a3440] hover:bg-[#423b48]"
                      )}
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setExpandedPoint(expandedPoint === i ? null : i)}
                      >
                        <div>
                          <p
                            className={cn(
                              "font-semibold mb-1",
                              p.is_red_flag ? "text-red-400" : "text-[#f7c29c]"
                            )}
                          >
                            {p.title}
                            {p.is_red_flag && (
                              <span className="ml-2 text-xs bg-red-700 text-white px-2 py-0.5 rounded-full">
                                RED FLAG
                              </span>
                            )}
                          </p>
                          <p className="text-[#f7f3ed]/80 text-sm">{p.summary}</p>
                        </div>
                        <span
                          className={cn(
                            "text-xl",
                            p.is_red_flag ? "text-red-400" : "text-[#f7c29c]"
                          )}
                        >
                          {expandedPoint === i ? "−" : "+"}
                        </span>
                      </div>

                      {expandedPoint === i && (
                        <p className="mt-3 text-sm text-[#f7f3ed]/90 border-t border-[#5b5360] pt-3">
                          {p.details}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No detailed points available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// import { useState } from "react";
// import { FileInfo, SummaryPoint } from "@shared/api";
// import { cn } from "@/lib/utils";

// interface FileListDisplayProps {
//   files: FileInfo[];
//   className?: string;
//   onClose?: () => void;
// }

// export default function FileListDisplay({ files, className, onClose }: FileListDisplayProps) {
//   const [expandedFile, setExpandedFile] = useState<FileInfo | null>(null);
//   const [expandedPoint, setExpandedPoint] = useState<number | null>(null);

//   const handleFileClick = (file: FileInfo) => {
//     setExpandedFile(file);
//     setExpandedPoint(null);
//   };

//   const closeModal = () => {
//     setExpandedFile(null);
//     setExpandedPoint(null);
//   };

//   return (
//     <div className={cn("w-full", className)}>
//       <div className="rounded-3xl bg-[#f5ebe5] p-8 border border-[#f1ded4] shadow-lg">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <h3 className="text-[#1a1108] text-2xl font-semibold mt-2">
//             {files.length} {files.length === 1 ? "file" : "files"} uploaded
//           </h3>
//           {onClose && (
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#f9a66a] to-[#f46c3a] hover:from-[#fbb483] hover:to-[#f77d4c] transition-colors"
//             >
//               Upload Another
//             </button>
//           )}
//         </div>

//         {/* File Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {files.map((file, index) => (
//             <article
//               key={file.file_name || `${index}`}
//               onClick={() => handleFileClick(file)}
//               className={cn(
//                 "group relative rounded-2xl border bg-[#fdf7f3] p-6 shadow transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
//               )}
//             >
//               <h3 className="text-lg font-bold text-black mb-2">{file.title || file.file_name}</h3>

//               {file.points && file.points.length > 0 ? (
//                 <ul className="space-y-2">
//                   {file.points.map((p: SummaryPoint, i: number) => (
//                     <li
//                       key={i}
//                       className={cn(
//                         "flex items-start gap-2",
//                         p.is_red_flag ? "text-red-700 font-semibold" : "text-gray-700"
//                       )}
//                     >
//                       <span className="text-lg leading-[1] mt-0.5">•</span>
//                       <span>
//                         {p.summary}
//                         {p.is_red_flag && (
//                           <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
//                             RED FLAG
//                           </span>
//                         )}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">No summary available</p>
//               )}
//             </article>
//           ))}
//         </div>
//       </div>

//       {/* Detailed Modal */}
//       {expandedFile && (
//         <div
//           className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(23,16,10,0.6)] backdrop-blur-sm px-4 py-10"
//           onClick={closeModal}
//         >
//           <div
//             className="relative w-full max-w-3xl rounded-2xl bg-[#2f2932] text-[#f7f3ed] shadow-lg overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-5 right-5 px-4 py-2 text-xs font-semibold text-[#f7c29c] rounded-full border hover:bg-[#3a3440]"
//             >
//               Close
//             </button>

//             <div className="px-10 py-12 space-y-6 max-h-[70vh] overflow-y-auto">
//               <h3 className="text-2xl font-bold mb-4">{expandedFile.file_name}</h3>

//               {expandedFile.points && expandedFile.points.length > 0 ? (
//                 <ul className="space-y-4">
//                   {expandedFile.points.map((p: SummaryPoint, i: number) => (
//                     <li
//                       key={i}
//                       className={cn(
//                         "border rounded-lg p-4 transition-colors",
//                         p.is_red_flag
//                           ? "border-red-500 bg-[#4a1f1f] hover:bg-[#5c2a2a]"
//                           : "border-[#4b434f] bg-[#3a3440] hover:bg-[#423b48]"
//                       )}
//                     >
//                       <div
//                         className="flex justify-between items-center cursor-pointer"
//                         onClick={() =>
//                           setExpandedPoint(expandedPoint === i ? null : i)
//                         }
//                       >
//                         <div>
//                           <p
//                             className={cn(
//                               "font-semibold",
//                               p.is_red_flag ? "text-red-400" : "text-[#f7c29c]"
//                             )}
//                           >
//                             {p.title}
//                             {p.is_red_flag && (
//                               <span className="ml-2 text-xs bg-red-700 text-white px-2 py-0.5 rounded-full">
//                                 RED FLAG
//                               </span>
//                             )}
//                           </p>
//                           <p className="text-[#f7f3ed]/80 text-sm">{p.summary}</p>
//                         </div>
//                         <span
//                           className={cn(
//                             "text-xl",
//                             p.is_red_flag ? "text-red-400" : "text-[#f7c29c]"
//                           )}
//                         >
//                           {expandedPoint === i ? "−" : "+"}
//                         </span>
//                       </div>

//                       {expandedPoint === i && (
//                         <p className="mt-3 text-sm text-[#f7f3ed]/90 border-t border-[#5b5360] pt-3">
//                           {p.details}
//                         </p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-400">No detailed points available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
