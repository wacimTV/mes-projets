'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const foodItems = [
  {
    image: '/profile.jpg',
    name: 'Shohorab H Shawon',
    location: 'Uttara, Dhaka, Bangladesh',
    review:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.',
  },
  {
    image: '/profile.jpg',
    name: 'Shohorab',
    location: 'Dhaka',
    review:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. ❤️❤️❤️ ',
  },
  {
    image: '/profile.jpg',
    name: 'H Shawon',
    location: 'Bangladesh',
    review:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.',
  },
  {
    image: '/profile.jpg',
    name: 'Shawon',
    location: 'Dhaka, Bangladesh',
    review:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates 💕.',
  },
];

const Review = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        style={{
          '--swiper-navigation-color': '#BD1F17',
          '--swiper-navigation-size': '24px',
          '--swiper-pagination-color': '#BD1F17',
          '--swiper-pagination-bullet-inactive-color': '#ddd',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
        }}
      >
        {foodItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="pt-8 px-8 col-span-1 flex flex-col justify-center space-y-4">
              <p className="font-medium text-xl">
                <span className="text-4xl font-serif text-wrap">&quot;</span>
                {item.review}
              </p>
              <div className="flex justify-between items-center pt-32">
                <div>
                  <h1 className="text-xl font-bold uppercase">{item.name}</h1>
                  <h2 className="font-medium">{item.location}</h2>
                </div>
                <div>
                  <Image
                    src={item.image}
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-end">
                  <hr className="w-10 h-1 bg-red-700 border-0" />
                </div>
                <hr className="w-full h-0.5 mx-auto mb-4 bg-black border-0" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
