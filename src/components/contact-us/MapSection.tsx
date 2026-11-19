
export default function MapSection() {
  return (
    <section className="w-full bg-[#FDF9F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">

        {/* Google Map */}
        <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#244730]/10 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2267.953397902958!2d-113.971854!3d51.086868499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371649624a825c1%3A0xad99f8c3a1b85c62!2s115%20Whitlock%20Close%20NE%2C%20Calgary%2C%20AB%20T1Y%204X2%2C%20Canada!5e1!3m2!1sen!2sin!4v1795065119141!5m2!1sen!2sin"
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

