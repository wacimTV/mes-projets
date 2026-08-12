'use client';
import React, { useEffect } from 'react';

function BookingForm() {
  useEffect(() => {
    let submit = document.getElementById('booknow');
    submit.addEventListener('click', function () {
      alert('Form Submission is under development');
    });
  }, []);

  return (
    <>
      <button
        type="submit"
        id="booknow"
        className="bg-[#FEBF00] text-black p-3 font-bold hover:bg-gray-200 transform duration-300 ease-in-out"
      >
        BOOK NOW
      </button>
    </>
  );
}

export default BookingForm;
