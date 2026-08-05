export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">{children}</h3>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-700">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">{children}</ul>;
}
