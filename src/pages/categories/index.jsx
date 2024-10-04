import React from 'react'
import SingleCategory from './singleCategory'

const Categories = () => {
  return (
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col">
      <div class="h-1 bg-gray-200 rounded overflow-hidden">
        <div class="w-24 h-full bg-red-500"></div>
      </div>
      <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-[40px] mb-2 sm:mb-0">All Categories</h1>
        <p class="sm:w-3/5 leading-relaxed text-[40px] sm:pl-10 pl-0">Here is all the categories which is in our site, feel free to choose and explore.</p>
      </div>
    </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        <SingleCategory/>
        <SingleCategory/>
        <SingleCategory/>
    </div>
  </div>
</section>
  )
}

export default Categories
