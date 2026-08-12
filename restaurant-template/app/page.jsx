import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import TabSection from '@/components/TabSection';
import { MdDeliveryDining } from 'react-icons/md';
import { FaAward } from 'react-icons/fa';
import { PiShoppingBagOpenFill } from 'react-icons/pi';
import FoodMenuSlider from '@/components/FoodMenuSlider';
import { IoMdTime } from 'react-icons/io';
import { MdOutlineWifiCalling3, MdEmail } from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import BookingForm from '@/components/BookingForm';
import SocialMedia from '@/components/SocialMedia';
import Review from '@/components/Review';

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r min-h-screen from-[#BD1F17] to-[#A51D13] flex justify-center items-center lg:px-12 mx-auto overflow-hidden sm:py-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-6 max-w-7xl justify-center items-center">
          <div className="col-span-4 items-center text-center lg:text-start z-20 mb-6">
            <div>
              <h1 className="font-bebas font-medium text-white text-3xl sm:text-5xl md:text-[66px] lg:text-8xl 2xl:text-9xl lg:bg-[#BD1F17] lg:bg-opacity-60">
                TASTE THE AUTHENTIC SAUDI CUISINE
              </h1>
              <p className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl my-9">
                Among the best Saudi chefs in the world, <br /> serving you
                something beyond flavor.
              </p>
              <HeroSection className="" />
            </div>
          </div>

          {/* Main Image Container */}
          <div className="relative w-[300px] sm:w-[500px] lg:w-[700px] h-auto mx-auto overflow-visible">
            <Image
              src="/hero.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="w-full h-full object-contain z-0 lg:relative lg:right-56"
            />

            {/* Prop Image Positioned Absolutely */}
            <Image
              src="/off.svg"
              alt="Prop Image"
              width={150}
              height={150}
              className="absolute -bottom-2 -right-4 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-8 lg:-bottom-4 lg:right-48 w-16 sm:w-20 md:w-24 lg:w-28 z-20"
            />
          </div>
        </div>
      </section>

      {/* About  */}
      <section id="about">
        <div className="relative overflow-hidden"></div>
        <div className="flex justify-center items-center my-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl justify-center items-center lg:mx-10">
            <div className="object-cover w-full h-full">
              {/* Main Image Container */}
              <div className="relative">
                <Image
                  src="/about.png"
                  alt="Hero Image"
                  width={600}
                  height={600}
                  className="w-full h-full"
                />

                {/* Prop Image Positioned Absolutely */}
                <Image
                  src="/market.svg"
                  alt="Prop Image"
                  width={250}
                  height={250}
                  className="absolute -top-4 left-2 sm:-top-4 sm:left-4 md:-top-4 md:left-4 lg:-top-6 lg:left-6 w-40 sm:w-44 md:w-48 lg:w-60 z-20"
                />
              </div>
            </div>
            <div className="flex place-self-start">
              <TabSection />
            </div>
          </div>
        </div>
        {/* 3 icons */}
        <div className="flex justify-center items-center mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-black gap-4 max-w-7xl w-full">
            <div className="flex items-center space-x-4 ml-8">
              <MdDeliveryDining className="shadow-lg rounded-full p-6 text-8xl text-[#BD1F17]" />
              <div className="text-left">
                <h1 className="text-3xl text-black px-2 font-bebas font-semibold">
                  FAST DELIVERY
                </h1>
                <p className="px-2">Within 30 Minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <FaAward className="shadow-lg rounded-full p-6 text-8xl text-[#BD1F17]" />
              <div className="text-left">
                <h1 className="text-3xl text-black px-2 font-bebas font-semibold">
                  ABSOLUTE DINING
                </h1>
                <p className="px-2">Best buffet restaurant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <PiShoppingBagOpenFill className="shadow-lg rounded-full p-6 text-8xl text-[#BD1F17]" />
              <div className="text-left">
                <h1 className="text-3xl text-black px-2 font-bebas font-semibold">
                  PICKUP DELIVERY
                </h1>
                <p className="px-2">Grab your food order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu  */}
      <section id="menu" className="bg-[#FBF7F2] py-20">
        {/* prop image  */}
        <div className="absolute -left-72 hidden xl:block">
          <Image
            src="/cap.png"
            alt="Hero Image"
            width={500}
            height={500}
            className=""
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 max-w-7xl">
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <p className="text-[#BD1F17] font-semibold text-center sm:text-left">
                🍕 Crispy, Every Bite Taste
              </p>
              <h1 className="text-3xl lg:text-4xl font-bebas font-semibold text-black my-2 text-center sm:text-left ">
                POPULAR FOOD ITEMS
              </h1>
            </div>
          </div>
        </div>

        <div className="m-10">
          <FoodMenuSlider className="m-10 p-6" />
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="booking"
        className="relative py-10 px-4 sm:px-6 lg:px-8 bg-[url('/formbg.png')] bg-cover bg-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        {/* Form Container */}
        <div className="relative flex justify-center md:justify-start items-center p-8 lg:p-14 z-20 max-w-7xl mx-auto">
          <form className="bg-transparent p-6 w-full max-w-lg space-y-6 z-20">
            {/* Title and Subtitle */}
            <div className="text-white text-center md:text-left space-y-2">
              <p className="text-[#BD1F17] font-semibold text-lg sm:text-xl">
                🍕 BOOK NOW
              </p>
              <h1 className="text-2xl sm:text-4xl font-bebas font-semibold">
                BOOK YOUR TABLE
              </h1>
              <p className="text-base sm:text-lg">
                We are always ready to serve you the best dining experience.
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-white text-sm mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-transparent border border-white text-white p-2 rounded focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-white text-sm mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-transparent border border-white text-white p-2 rounded focus:outline-none"
                  placeholder="Your email"
                />
              </div>
            </div>

            {/* Reservation Date and Total People */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label
                  className="block text-white text-sm mb-2"
                  htmlFor="reservation-date"
                >
                  Reservation Date
                </label>
                <input
                  type="date"
                  id="reservation-date"
                  name="reservationDate"
                  className="w-full bg-transparent border border-white text-white p-2 rounded focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-white text-sm mb-2"
                  htmlFor="total-people"
                >
                  Total People
                </label>
                <input
                  type="number"
                  id="total-people"
                  name="totalPeople"
                  className="w-full bg-transparent border border-white text-white p-2 rounded focus:outline-none"
                  placeholder="Number of people"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-white text-sm mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-transparent border border-white text-white p-2 rounded focus:outline-none"
                placeholder="Your message"
                rows="4"
              ></textarea>
            </div>

            {/* Book Now Button */}
            <BookingForm />
          </form>
        </div>
      </section>

      {/* Review Section */}
      <section id="review" className="bg-[#FBF7F2] py-20">
        <div className="flex justify-center items-center">
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 max-w-7xl px-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <p className="text-[#BD1F17] font-semibold text-center sm:text-left">
                🍕 Crispy, Every Bite Taste
              </p>
              <h1 className="uppercase text-3xl sm:text-4xl font-semibold text-black my-2 text-center sm:text-left font-bebas">
                What Some of my Customers Say
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl justify-center items-center bg-[#FEBF00] bg-full">
            {/* Review */}

            <div>
              <Review />
            </div>

            {/* Video */}
            <div className="flex justify-center items-center h-full overflow-hidden col-span-2">
              <div className="relative w-full h-full">
                <video
                  className="object-cover w-full h-full pointer-events-none"
                  autoPlay
                  loop
                  muted
                  controls={false}
                  playsInline
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-0 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer  */}
      <section
        id="contact"
        className="relative text-white text-center py-24 px-4 sm:px-6 lg:px-8 bg-[url('/contactbg.png')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-bebas px-4 md:px-0 mb-8">
            WE ARE READY TO GIVE YOU THE BEST DINING EXPERIENCE
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <IoMdTime className="text-3xl md:text-4xl mb-1 text-[#FEBF00]" />
              <h2 className="text-lg md:text-xl font-semibold">
                OPENING HOURS
              </h2>
              <p>Monday-Sunday</p>
              <p>9:00 AM to 11:30 PM</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <MdOutlineWifiCalling3 className="text-3xl md:text-4xl mb-1 text-[#FEBF00]" />
              <h2 className="text-lg md:text-xl font-semibold">LETS TALK</h2>
              <p>Phone: +880181234567</p>
              <p>Email: shohorabhshawon@gmail.com</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <MdEmail className="text-3xl md:text-4xl mb-1 text-[#FEBF00]" />
              <h2 className="text-lg md:text-xl font-semibold">BOOK A TABLE</h2>
              <p>Phone: +880181234567</p>
              <p>Email: shohorabhshawon@gmail.com</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <IoLocation className="text-3xl md:text-4xl mb-1 text-[#FEBF00]" />
              <h2 className="text-lg md:text-xl font-semibold">OUR ADDRESS</h2>
              <p>Uttara, Dhaka</p>
              <p>Sector 7</p>
            </div>
          </div>
          <div>
            <SocialMedia />
          </div>
          <p className="text-md md:text-lg mt-4">© 2024 All Rights Reserved</p>
        </div>
      </section>
    </div>
  );
}
