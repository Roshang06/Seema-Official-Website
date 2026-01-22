"use client";
import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <p className="text-gray-400">Loading order information...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}