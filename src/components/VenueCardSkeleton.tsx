function VenueCardSkeleton() {
  return (
    <div
      className="
        bg-white
        shadow-lg
        rounded-[20px]
        h-full
        w-full
        aspect-[3/4]
        overflow-hidden
        min-h-[380px]
        flex
        flex-col
        animate-pulse
      "
    >
      {/* Image */}
      <div className="aspect-[3/2] bg-secondary/70 w-full" />

      {/* Content */}
      <div className="flex flex-col p-5 flex-1 justify-between">
        {/* Top */}
        <div>
          <div className="flex justify-between items-start">
            <div className="h-7 w-[65%] bg-secondary/70 rounded-full" />

            <div className="h-5 w-10 bg-secondary/70 rounded-full ml-3 shrink-0" />
          </div>

          <div className="h-4 w-[45%] bg-secondary/70 rounded-full mt-3" />
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-12 bg-secondary/70 rounded-full" />

          <div className="h-5 w-24 bg-secondary/70 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default VenueCardSkeleton;
