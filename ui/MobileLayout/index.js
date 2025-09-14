"use client";

import { MobileHeader } from "../../ui";
import { useMobileHeader } from "../../store";
import { usePathname } from "next/navigation";

export function MobileLayout({ children }) {
  const { left, right, middle } = useMobileHeader();
  const pathname = usePathname();

  const isMobileHeaderNotInitialized =
    left === undefined && right === undefined && middle === undefined;

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="flex flex-col gap-y-4 min-h-dvh">
      {isMobileHeaderNotInitialized ? (
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-24 h-5 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>
      ) : (
        <MobileHeader
          leftElement={left ?? <div />}
          middleElement={middle ?? <div />}
          rightElement={right ?? <div />}
        />
      )}
      {children}
    </div>
  );
}
