export default function Loading() {
  return (
    <div className="px-4 py-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Loading Products...
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
          >
            <div className="relative w-full h-32 bg-gray-200 rounded-md overflow-hidden">
              <div className="absolute inset-0 animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-3 w-2/3 bg-gray-200 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              </div>
              <div className="h-3 w-1/2 bg-gray-200 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              </div>
            </div>

            <div className="mt-4 h-4 w-1/3 bg-gray-200 rounded-md relative overflow-hidden">
              <div className="absolute inset-0 animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
