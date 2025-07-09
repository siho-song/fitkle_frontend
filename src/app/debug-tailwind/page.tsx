"use client";
import React, { useEffect, useRef, useState } from "react";

const debugClasses = [
  "bg-primary",
  "bg-primaryLight",
  "bg-primaryDark",
  "text-primary",
  "text-primaryLight",
  "text-primaryDark",
  "bg-limeOlive",
  "text-limeOlive",
  "border-primary",
  "border-limeOlive",
  "text-black",
  "bg-gray-100",
  "text-gray-500",
  "hover:bg-primary/80",
];

export default function DebugTailwindPage() {
  const divRef = useRef<HTMLDivElement>(null);
  const [computed, setComputed] = useState<any>({});

  useEffect(() => {
    if (divRef.current) {
      // 실제 적용된 className, computedStyle을 콘솔과 화면에 출력
      // eslint-disable-next-line no-console
      console.log("[Tailwind 디버그] className:", divRef.current.className);
      // eslint-disable-next-line no-console
      console.log(
        "[Tailwind 디버그] computed background:",
        window.getComputedStyle(divRef.current).backgroundColor
      );
      setComputed({
        background: window.getComputedStyle(divRef.current).backgroundColor,
        color: window.getComputedStyle(divRef.current).color,
        border: window.getComputedStyle(divRef.current).borderColor,
      });
    }
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS 디버깅</h1>
      <div
        ref={divRef}
        className="bg-primaryLight text-black p-6 rounded-lg shadow border-2 border-primary mb-4"
      >
        <div>bg-primaryLight + text-black + border-primary</div>
        <div className="text-xs mt-2 text-gray-500">
          실제 className: <code>{divRef.current?.className}</code>
        </div>
        <div className="text-xs mt-1 text-gray-500">
          computed background: <code>{computed.background}</code>
        </div>
        <div className="text-xs mt-1 text-gray-500">
          computed color: <code>{computed.color}</code>
        </div>
        <div className="text-xs mt-1 text-gray-500">
          computed border: <code>{computed.border}</code>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {debugClasses.map((cls) => (
          <div key={cls} className={`p-4 rounded shadow ${cls}`}>
            <span className="text-xs">{cls}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-sm text-gray-400">
        <div>Tailwind 적용이 안된다면:</div>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>tailwind.config.js의 content 경로 확인</li>
          <li>커스텀 색상/유틸리티가 tailwind.config.js에 등록되어 있는지 확인</li>
          <li>dev 환경에서는 Turbopack 버그로 커스텀 색상 적용이 안될 수 있음 (Next.js 15+)</li>
          <li>production 빌드(npm run build && npm start)에서는 정상 적용되는지 확인</li>
          <li>postcss.config.mjs, globals.css, tailwindcss 버전 등도 점검</li>
        </ul>
      </div>
    </div>
  );
} 