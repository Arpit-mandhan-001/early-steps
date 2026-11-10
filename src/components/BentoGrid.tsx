
import Image from "next/image";

// Update image paths here
const images = {
  image1: "/images/dayhome/dayhome-1.jpeg",
  image2: "/images/dayhome/dayhome-15.jpeg",
  image3: "/images/dayhome/dayhome-16.jpeg",
  image4: "/images/dayhome/dayhome-22.jpeg",
  image5: "/images/dayhome/dayhome-20.jpeg",
  image6: "/images/dayhome/dayhome-50.jpeg",
  image7: "/images/dayhome/dayhome-39.jpeg",
  image8: "/images/dayhome/dayhome-7.jpeg",
  image16: "/images/dayhome/dayhome-4.jpeg",
  image9: "/images/dayhome/dayhome-42.jpeg",
  image10: "/images/dayhome/dayhome-33.jpeg",
  image11: "/images/dayhome/dayhome-10.jpeg",
  image12: "/images/dayhome/dayhome-44.jpeg",
  image13: "/images/dayhome/dayhome-19.jpeg",
  image14: "/images/dayhome/dayhome-2.jpeg",
  image15: "/images/dayhome/dayhome-11.jpeg",
};

const tiles = [
  // Top row
  { src: images.image1, desktop: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image2, desktop: "md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image3, desktop: "md:col-start-6 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image4, desktop: "md:col-start-8 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image5, desktop: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2", mobile: "col-span-2 row-span-1" },

  // Middle row
  { src: images.image6, desktop: "md:col-start-1 md:col-span-3 md:row-start-2 md:row-span-3", mobile: "col-span-2 row-span-2" },
  { src: images.image7, desktop: "md:col-start-4 md:col-span-3 md:row-start-3 md:row-span-2", mobile: "col-span-2 row-span-2" },
  { src: images.image8, desktop: "md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image16, desktop: "md:col-start-7 md:col-span-2 md:row-start-4 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image9, desktop: "md:col-start-9 md:col-span-2 md:row-start-3 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image10, desktop: "md:col-start-11 md:col-span-2 md:row-start-3 md:row-span-2", mobile: "col-span-1 row-span-2" },

  // Bottom row
  { src: images.image11, desktop: "md:col-start-1 md:col-span-4 md:row-start-5 md:row-span-2", mobile: "col-span-2 row-span-2" },
  { src: images.image12, desktop: "md:col-start-5 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image13, desktop: "md:col-start-7 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image14, desktop: "md:col-start-9 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image15, desktop: "md:col-start-11 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-2" },
];

export default function BentoGrid() {
  return (
    <section className="w-full">

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1400px]

          grid-cols-2
          grid-flow-dense
          auto-rows-[90px]
          gap-2

          sm:auto-rows-[120px]

          md:aspect-[496/257]
          md:grid-flow-row
          md:grid-cols-[repeat(12,minmax(0,1fr))]
          md:grid-rows-[repeat(6,minmax(0,1fr))]
          md:auto-rows-auto
          md:gap-[4px]
        "
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`
              relative
              min-h-0
              min-w-0
              overflow-hidden
              rounded-xl
              group
              ${tile.mobile}
              ${tile.desktop}
            `}
          >
            <Image
              src={tile.src}
              alt={`Interior design ${index + 1}`}
              fill
              unoptimized
              sizes="(max-width: 767px) 50vw, 25vw"
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />
          </div>
        ))}
      </div>

    </section>
  );
}
