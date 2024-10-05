import React, { useEffect, useState } from "react";
import SingleCategory from "./singleCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3001/categories");
    const data = await response.json();
    setCategories(data);
    console.log(data, "data");
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-red-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-[40px] mb-2 sm:mb-0">
              All Categories
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-[40px] sm:pl-10 pl-0">
              Here is all the categories which is in our site, feel free to
              choose and explore.
            </p>
          </div>
        </div>
        <Link to={"/"}>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {categories &&
              categories.map((item, index) => (
                <SingleCategory
                  key={index}
                  name={item.name}
                  image={item.image}
                  id={item.id}
                />
              ))}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
