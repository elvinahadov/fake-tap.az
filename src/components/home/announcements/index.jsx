import React, { useEffect, useState } from "react";
import SingleAnnouncements from "../singleAnnouncement";

const Announcements = ({ searchTerm }) => {
  const [data, setData] = useState([]);

  const fetchAnnouncements = async () => {
    const response = await fetch("http://localhost:3001/announcements");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Every Announcement You Need
            </h1>
            <div className="h-1 w-20 bg-red-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            We're excited to announce our latest updates and events that aim to
            enhance your experience and foster connections within our community.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {filteredData &&
            filteredData.map((item, index) => (
              <SingleAnnouncements
                key={index}
                title={item.title}
                description={item.description}
                image={item.imageUrl}
                price={item.price}
                location={item.location}
                id={item.id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
