import React from "react";

const SkeletonLoader = React.memo(() => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <li className="flex items-center gap-3 p-2" key={index}>
        <div className="w-12 h-12 bg-slate-200"></div>
        <div className="flex-1 h-5 bg-slate-200 rounded"></div>
      </li>
    ))}
  </>
));

SkeletonLoader.displayName = "SkeletonLoader";

export default SkeletonLoader;
