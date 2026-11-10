
export default function MapSection() {
  return (
    <section className="w-full bg-[#FDF9F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">

        {/* Google Map */}
        <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#244730]/10 shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=whitehorn+calgary+alberta&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
            className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[500px]"
          />
        </div>

      </div>
    </section>
  );
}

