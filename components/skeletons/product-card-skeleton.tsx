export function ProductCardSkeleton() {
    return (
        <div className="bg-(--card) border border-(--border) rounded-md p-3 flex flex-col gap-2 animate-pulse">

            <div className="flex flex-col items-center gap-1">
                <div className="h-3 w-3/4 bg-(--border) rounded" />
                <div className="h-2 w-1/2 bg-(--border) rounded" />
            </div>

            <div className="h-35 bg-(--border) rounded" />

            <div className="h-6 bg-(--border) rounded" />

            <div className="h-3 bg-(--border) rounded" />
            <div className="h-3 w-5/6 bg-(--border) rounded" />

            <div className="flex gap-1 mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-(--border) rounded-full" />
                ))}
            </div>

            <div className="flex flex-col items-end gap-1 mt-2">
                <div className="h-2 w-16 bg-(--border) rounded" />
                <div className="h-4 w-20 bg-(--border) rounded" />
            </div>

            <div className="h-8 bg-(--border) rounded mt-2" />

        </div>
    )
}