
import Image from "next/image";


const content = [
  {
    title: "Our Mission",
    description:
      "To provide a warm, safe, and nurturing home-away-from-home where every child feels loved, valued, and supported. We encourage learning through play, creativity, meaningful connections, and everyday discoveries while supporting each child's unique growth and development.",
  },
  {
    title: "Our Vision",
    description:
      "To create a joyful and inclusive learning environment where little ones build confidence, develop lifelong skills, explore their curiosity, and grow into happy, independent learners. We strive to give every child a strong foundation for a bright future.",
  },
  {
    title: "Our Story",
    description:
      "Founded by Indu Bala, a mother of three and a Level 3 Early Childhood Educator, EarlySteps Dayhome was created from a genuine passion for nurturing young minds. With years of childcare experience, we offer families a caring home environment filled with meaningful play, wholesome meals, bilingual communication, and opportunities to learn, explore, and grow.",
  },
];


export default function OurStory() {
  return (
    <section className="w-full bg-[#FDF9F6]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* Left Content */}
          <div className="flex flex-col gap-7 md:gap-8 order-2 lg:order-1">
            {content.map((item, index) => (
              <div key={index} className="space-y-3">
                <h2 className="font-nunito text-2xl sm:text-[28px] font-bold leading-tight text-[#244730]">
                  {item.title}
                </h2>

                <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#858995] max-w-[650px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[540px] overflow-hidden rounded-[28px] sm:rounded-[36px] order-1 lg:order-2">
            <Image
              src="/images/dayhome/dayhome-10.jpeg"
              alt="Children enjoying imaginative play together"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
