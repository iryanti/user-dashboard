'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  return (
    <main className="space-y-4 p-6">
      <h2 className="text-xl font-bold">
        Something went wrong
      </h2>

      <p>{error.message}</p>

      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}