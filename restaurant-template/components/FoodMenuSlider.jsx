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
    image: '/pizza.png',
    title: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.',
  },
  {
    image: '/burger.png',
    title: 'Cheeseburger',
    description: 'Juicy beef patty with cheddar, lettuce, and tomato.',
  },
  {
    image: '/wings.png',
    title: 'Chicken Wings',
    description: 'Juicy crispy chicken wings.',
  },
  {
    image: '/frenchfry.png',
    title: 'French Fries',
    description: 'Crispy and delicious French fries.',
  },
  {
    image: '/cake.png',
    title: 'Chocolate Cake',
    description: 'Delicious chocolate cake with cream.',
  },
  {
    image: '/honeywings.png',
    title: 'Honey Wings',
    description: 'Juicy crispy chicken wings with honey glaze.',
  },
  {
    image: '/sushi.png',
    title: 'Sushi',
    description: 'Delicious sushi with fresh fish and rice.',
  },
  {
    image: '/icecream.png',
    title: 'Ice Cream',
    description: 'Delicious ice cream with chocolate and nuts.',
  },
  {
    image: '/coffee.png',
    title: 'Coffee',
    description: 'Delicious coffee with cream and sugar.',
  },
  {
    image: '/chickenfry.png',
    title: 'Chicken Fry',
    description: 'Crispy and delicious fried chicken.',
  },
];

const FoodMenuSlider = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
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
            <div className="flex flex-col items-center justify-center text-center mb-24 p-4 bg-white rounded-lg shadow-md h-full">
              <div className="flex justify-center items-center w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <hr className="w-20 h-2 mx-auto my-4 bg-red-600 border-0" />
              <h3 className="text-lg font-bold mt-4">{item.title}</h3>
              <h5 className="text-sm text-gray-600 line-clamp-1">
                {item.description}
              </h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodMenuSlider;
