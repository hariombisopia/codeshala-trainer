// Session view manages its own layout — no bottom nav padding needed
export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>
}
