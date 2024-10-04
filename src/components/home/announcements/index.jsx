import React from "react";
import SingleAnnouncements from "../singleAnnouncement";

const Announcements = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Every Announcement You Need
            </h1>
            <div class="h-1 w-20 bg-red-500 rounded"></div>
          </div>
          <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            We’re excited to announce our latest updates and events that aim to
            enhance your experience and foster connections within our community.
            Stay tuned for exciting announcements, exclusive offers, and
            valuable resources designed to support your journey. Join us as we
            embark on new adventures, celebrate our achievements, and continue
            to grow together. Your participation matters, and we can’t wait to
            share what’s in store!
          </p>
        </div>
        <div class="flex flex-wrap -m-4">
          <SingleAnnouncements/>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
