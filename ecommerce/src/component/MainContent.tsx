import { Tally3 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFilter } from './filterContext';
import axios from 'axios';
import BookCard from './BookCard';

function MainContent() {
    const {  searchQuery, selectCategory, minPrice, maxPrice, keyword } =
     useFilter()

     const[product, setProduct] = useState<any[]>([]);
     const[filter, setFilter] = useState(`all`);
     const[currentPage, setCurrentPage] = useState(1);
     const[dropdownOpen, setDropdownOpen] = useState(false);
     const itemPerPage = 12;

   
useEffect(() => {
  let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage - 1) * itemPerPage}`;

  if (keyword) {
    url = `https://dummyjson.com/product/search?q=${keyword}`;
  }

  axios.get(url)
    .then((response) => {
      setProduct(response.data.products);
     
    })
    .catch((error) => {
      console.log('Error fetching data', error);
    });
}, [currentPage, keyword]);

 const getFilteredProducts = () => {
    let filteredProducts = product;
console.log("Products:", product);

    if (selectCategory) {
        filteredProducts = filteredProducts.filter(
            (product) => product.category == selectCategory
        ); 
    } 
    if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
      if (keyword) {
  filteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(keyword.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(keyword.toLowerCase()))
  );
}

    switch (filter) {
        case "expensive":
            return filteredProducts.sort((a, b) => b.price - a.price);
        case "cheap":
            return filteredProducts.sort((a, b) => a.price - b.price);
        // Add more cases if needed
        case "popular":
          return filteredProducts.sort((a, b) => b.rating - a.rating )
  
        default:
            return filteredProducts;
    }
 };

  const filteredProducts = getFilteredProducts();
console.log(filteredProducts)

const totalProducts = 100;

const totalPages = Math.ceil(totalProducts / itemPerPage)

const handlepageChange = (page: number) => {
  if (page > 0 && page <= totalPages) {
    setCurrentPage(page);
  }

}

const getPaginationButtons = () => {
  const button: number[] = [];
    let startPage = Math.min(1, currentPage + 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }

    if (currentPage + 2 > totalPages ) {
      startPage = Math.min(1, startPage - (( 2 - totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      button.push(page);
    }

    return button;

}

  return (
  <section className='xl:w-[55rem] mr:[10rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
   <div className='mb-3'>
    <div className='flex flex-col sm:flex-row justify-between items-center '>
<div className='relative mb-5 mt-5'>
    <button onClick={() => setDropdownOpen(!dropdownOpen)} className='border px-2 py-2 rounded-full flex items-center'>
        <Tally3 size={20} />
        {filter === "all" 
        ? "filter"
        : filter.charAt(0).toLowerCase() + filter.slice(1)
        }

    </button>
    {dropdownOpen && (
        <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
            <button onClick={() => setFilter("cheap")}
              className='block px-4 py-2 w-full text-left hover:bg-gray-200'  
                >
                    Cheap
             
            </button>

  <button onClick={() => setFilter("expensive")}
              className='block px-4 py-2 w-full text-left hover:bg-gray-200'  
                >
                    Expensive
             
            </button>

  <button onClick={() => setFilter("popular")}
              className='block px-4 py-2 w-full text-left hover:bg-gray-200'  
                >
                    Popular

            </button>

        </div>
    )}

</div>
    </div>

<div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
  {filteredProducts.map(product =>(
    <BookCard 
    key={product.id}
    id={product.id}
    title={product.title}
    image={product.thumbnail}
    price={product.price}
      />

  ))}

</div>
<div className="flex justify-center items-center gap-2 mt-8">
  {/* Previous Button */}
  <button
    onClick={() => handlepageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="w-10 h-10 flex items-center justify-center border rounded-full text-sm disabled:opacity-50"
  >
    &lt;
  </button>

  {/* Page Numbers */}
  {getPaginationButtons().map((page) => (
    <button
      key={page}
      onClick={() => handlepageChange(page)}
      className={`w-10 h-10 border rounded-full text-sm flex items-center justify-center ${
        page === currentPage ? "bg-black text-white" : "text-black"
      }`}
    >
      {page}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => handlepageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="w-10 h-10 flex items-center justify-center border rounded-full text-sm disabled:opacity-50"
  >
    &gt;
  </button>
</div>
</div>
  </section>
  )
}
export default MainContent