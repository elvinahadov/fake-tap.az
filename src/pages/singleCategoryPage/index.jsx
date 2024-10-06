import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleAnnouncements from "../../components/home/singleAnnouncement/index.jsx";

const SingleCategoryPage = () => {
  const { categoryId } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(""); // State to store category title

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/announcements?categoryId=${categoryId}`
        );
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/categories/${categoryId}`
        );
        const data = await response.json();
        setCategoryTitle(data.name);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchAnnouncements();
    fetchCategory();
  }, [categoryId]);

  return (
    <section className="text-gray-600 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 justify-between">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Announcements for Category
            </h1>
            <p className="sm:text-3xl text-2xl font-medium title-font mb-2 text-red-900">
              {categoryTitle}
            </p>
            <div className="h-1 w-20 bg-red-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Check out all the announcements available in this category. Find the
            latest offers, events, and updates tailored just for you!
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <SingleAnnouncements
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.imageUrl}
                price={item.price}
                location={item.location}
                id={item.id}
              />
            ))
          ) : (
            <p>No announcements found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleCategoryPage;
