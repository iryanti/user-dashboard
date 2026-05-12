export default function UsersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="animate-pulse">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="flex border-b border-gray-100 px-6 py-5"
            >
              <div className="h-4 w-1/4 rounded bg-gray-200" />

              <div className="ml-6 h-4 w-1/3 rounded bg-gray-200" />

              <div className="ml-6 h-4 w-1/5 rounded bg-gray-200" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}