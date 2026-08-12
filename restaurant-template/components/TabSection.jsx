'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineWifiCalling3 } from 'react-icons/md';

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('About');

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <div>
            <h1 className="text-4xl text-black mb-4 uppercase font-bebas font-semibold">
              Exceptional culinary experience and delicious food
            </h1>
            <p className="text-black">
              Welcome to the About section! Here you can share details about
              yourself or your project. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Velit, aperiam voluptatem nostrum amet at
              repellendus minima maiores perspiciatis mollitia deleniti aliquam
              placeat dolor voluptatum reprehenderit labore eligendi magni
              aspernatur sed! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Natus laborum dolores
            </p>

            <div className="flex justify-start items-center mt-6">
              <div className="py-6 pr-6">
                <Link href="#about">
                  <button className="bg-[#FEBF00] text-black font-bold px-4 py-3">
                    ABOUT MORE
                  </button>
                </Link>
              </div>
              <MdOutlineWifiCalling3 className="flex justify-center items-center text-xl text-[#BD1F17]" />
              <p className="text-xl font-bold text-black">+8801812345678</p>
            </div>
          </div>
        );
      case 'Experience':
        return (
          <div>
            <h1 className="text-4xl font-bold text-black mb-4 uppercase font-bebas font-semibold">
              Experience
            </h1>
            <p className="text-black">
              Experience section: List your work experience, skills, and
              accomplishments here. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatum tenetur rem obcaecati, inventore vel
              impedit vero nulla cumque fuga a cupiditate quaerat libero
              delectus sapiente velit alias officiis nostrum ducimus. Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ullam
              vel modi autem laborum maxime voluptates nemo ea, vitae nisi
              incidunt aperiam tempore sapiente consequuntur molestiae rerum
              iste laudantium libero!
            </p>
          </div>
        );
      case 'Contact':
        return (
          <div>
            <h1 className="text-4xl font-bold text-black mb-4 uppercase font-bebas font-semibold">
              Contact
            </h1>
            <p className="text-black">
              Contact section: Provide your contact information or a form for
              others to reach you. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Corrupti corporis enim, possimus cum illo
              commodi repellat quod in aliquid temporibus ab? Necessitatibus
              tenetur commodi, minus illo quae nesciunt doloremque placeat!
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
              laboriosam consequatur
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 md:mt-6 lg:mt-0 md:px-4 lg:px-6">
      {/* Tab buttons */}
      <div className="flex justify-start items-start space-x-4 mb-4 border-b border-[#BD1F17]">
        {['About', 'Experience', 'Contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 transition-colors ${
              activeTab === tab
                ? 'bg-[#BD1F17] text-white font-semibold'
                : 'text-gray-900 hover:text-[#BD1F17]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">{renderContent()}</div>
    </div>
  );
}
