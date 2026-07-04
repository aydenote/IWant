import Header from '../../../_components/header/Header';

const LoadingBlock = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

export default function Loading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <LoadingBlock className="mb-6 h-9 w-24" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-lg border bg-gradient-card p-8 shadow-lg">
            <div className="space-y-4 border-b pb-6">
              <LoadingBlock className="h-9 w-2/3" />
              <LoadingBlock className="h-6 w-1/3" />
              <LoadingBlock className="h-5 w-full" />
              <LoadingBlock className="h-5 w-4/5" />
            </div>
            <div className="mt-6 space-y-8">
              <section className="space-y-3">
                <LoadingBlock className="h-7 w-32" />
                <LoadingBlock className="h-5 w-full" />
                <LoadingBlock className="h-5 w-full" />
                <LoadingBlock className="h-5 w-3/4" />
              </section>
              <section className="space-y-3">
                <LoadingBlock className="h-7 w-32" />
                <LoadingBlock className="h-28 w-full" />
              </section>
            </div>
          </div>
          <aside className="rounded-lg border bg-gradient-card p-6 shadow-card">
            <LoadingBlock className="mb-5 h-7 w-40" />
            <div className="space-y-4">
              <LoadingBlock className="h-20 w-full" />
              <LoadingBlock className="h-20 w-full" />
              <LoadingBlock className="h-20 w-full" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
