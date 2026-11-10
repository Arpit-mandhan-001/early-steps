import Image from "next/image";

const features = [
  {
    icon: "🏡",
    title: "Warm, Home-Based Care",
    description:
      "A safe, welcoming, and nurturing home environment where children feel comfortable, loved, and supported every day.",
  },
  {
    icon: "🎓",
    title: "Qualified Educator",
    description:
      "Led by a Level 3 Early Childhood Educator with 9 years of childcare experience and a passion for supporting early childhood development.",
  },
  {
    icon: "🎨",
    title: "Play & Discovery",
    description:
      "Age-appropriate toys, imaginative play, books, and hands-on exploration that encourage curiosity and learning.",
  },
  {
    icon: "🍎",
    title: "Healthy Meals & Snacks",
    description:
      "Nutritious lunch and two healthy snacks provided daily to keep little learners happy, nourished, and energized.",
  },
  {
    icon: "🧩",
    title: "Creative Activities",
    description:
      "Fun arts, crafts, storytelling, and interactive activities that inspire creativity, confidence, and self-expression.",
  },
  {
    icon: "🌿",
    title: "Outdoor Play & Growth",
    description:
      "Opportunities for outdoor play, movement, and exploration that support healthy development and active little minds.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FDF9F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-12">

          <p className="font-sans font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase text-[#CF7883] mt-2">
            A Happy Place to Grow
          </p>

          <h2 className="font-nunito font-extrabold text-[#244730] text-3xl sm:text-4xl md:text-5xl mt-3">
            Why Choose Early Steps?
          </h2>

          <p className="font-sans text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Thoughtful care for little learners. Our days are built around
            kindness, play, curiosity, and the comfort of a home environment.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Image */}
          <div className="relative min-h-[280px] sm:min-h-[420px] lg:min-h-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/dayhome/dayhome-4.jpeg"
              alt="Early Steps Dayhome welcoming playroom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#244730]/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10">
              <span className="text-white/80 font-sans text-xs sm:text-sm tracking-widest uppercase">
                Little hands, big dreams
              </span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#244730]/5 hover:shadow-md hover:border-[#CF7883]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl shrink-0">{feature.icon}</span>

                  <h3 className="font-nunito font-bold text-[#244730] text-lg sm:text-xl leading-tight">
                    {feature.title}
                  </h3>
                </div>

                <p className="font-sans text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Highlights */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 md:mt-10">
          {[
            { value: "9 Years", label: "Childcare Experience" },
            { value: "Level 3", label: "ECE Certification" },
            { value: "First Aid", label: "Certified" },
          ].map((item) => (
            <div
              key={item.label}
              className="group relative isolate overflow-hidden
        rounded-2xl p-7 sm:p-8 text-center
        border border-white/10
        bg-gradient-to-br from-[#315d3e] via-[#244730] to-[#142d1c]
        shadow-[0_15px_40px_rgba(0,0,0,0.15)]
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-[#c5dda9]/40
        hover:shadow-[0_25px_50px_rgba(20,60,30,0.3)]"
            >
              {/* Ambient glow */}
              <div
                className="absolute -top-16 -right-16
        w-40 h-40 rounded-full
        bg-[#c5dda9]/10 blur-3xl
        opacity-50 group-hover:opacity-100
        transition-opacity duration-700"
              />

              {/* Shine effect */}
              <div
                className="absolute inset-0 -translate-x-full
        bg-gradient-to-r from-transparent
        via-white/[0.08] to-transparent
        skew-x-[-20deg]
        group-hover:translate-x-full
        transition-transform duration-1000 ease-in-out"
              />

              {/* Top accent */}
              <div
                className="absolute top-0 left-1/2
        -translate-x-1/2 w-12 h-[2px]
        bg-gradient-to-r from-transparent
        via-[#c5dda9] to-transparent
        group-hover:w-24
        transition-all duration-500"
              />

              <div className="relative z-10">
                <h3
                  className="font-nunito font-extrabold
          text-white text-3xl sm:text-4xl
          tracking-tight
          transition-all duration-500
          group-hover:scale-105"
                >
                  {item.value}
                </h3>

                <p
                  className="font-sans text-white/70
          text-sm mt-3 tracking-wide
          transition-colors duration-500
          group-hover:text-white"
                >
                  {item.label}
                </p>

                <div
                  className="w-8 h-px bg-white/20
          mx-auto mt-5
          group-hover:w-46
          group-hover:bg-[#c5dda9]/70
          transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
