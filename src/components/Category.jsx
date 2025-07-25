import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const Category = () => {
  const categories = [
    "Web Developer",
    "Flutter Developer",
    "React.js",
    "Full Stack Developer",
    "Laravel Developer",
    "Next.js Developer",
    "React Native",
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Browse Job Categories
      </h2>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-4xl px-4">
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 px-2" key={index}>
                <Button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-semibold">
                  {category}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Category;
