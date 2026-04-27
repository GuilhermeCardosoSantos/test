export function SignInSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-full animate-pulse sm:mt-10">

            <div className="h-12 bg-(--border) rounded-full" />

            <div className="h-12 bg-(--border) rounded-full" />

            <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2">
                <div className="h-4 w-32 bg-(--border) rounded" />
                <div className="h-4 w-32 sm:w-24 bg-(--border) rounded" />
            </div>

            <div className="h-10 bg-(--border) rounded mt-4" />

        </div>
    )
}