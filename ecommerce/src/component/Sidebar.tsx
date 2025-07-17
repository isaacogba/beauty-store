import { useEffect, useState } from "react"
import { useFilter } from "./filterContext";

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[]
}
// Correct component name
const Sidebar = () => {
     const {

        searchQuery,
        setSearchQuery,
        selectCategory,
        setselectCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword,


     } = useFilter()


  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple", 
     "watch",
     "fashion",
      "trend",
       "shoes",
        "shirt"
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
       const data = await response.json();
const uniqueCategories = Array.from(
      new Set(data.products.map((product: Product) => product.category))
    )as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleRadioChangeCategories = (category: string) => {
    setselectCategory(category)
  }
  const handleKeywordClick = (Keyword: string) => {
    setKeyword(Keyword);
  }

  const handlResetFilter = () => {
setSearchQuery("");
setselectCategory("");
setMinPrice(undefined);
setMaxPrice(undefined);
setKeyword("");
  }

  return<>
   <div className="w-50 p-4 h-screen" >
    <h1 className="text-2xl font-bold mb-5 mt-4">Beauty store</h1>

    <section>
    <input
     type="text"
      className="border-2 mr-2 px-5 py-1 mb-3 w-full" placeholder="Search Product" 
    value={searchQuery}
    onChange={e => setSearchQuery(e.target.value)}/>
    <div className="flex justify-center items-center" >


       <input
  type="text"
  className="border-2 mr-2 px-5 mb-3 w-full"
  placeholder="Min"
  value={minPrice ?? ""}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  {
    const value = e.target.value;
    setMinPrice(value === "" ? undefined : Number(value));
  }}
/>

        <input 
        type="text"
         className="border-2 mr-2 px-5 mb-3 w-full" 
         placeholder="Max"
        value={maxPrice ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setMaxPrice(value === "" ? undefined : Number(value))
        }}
        
        />
    </div>
    {/*categories section */}
    <div>
<h2 className="text-xl font-semibold mb-3">Categories</h2>

    </div>
    <section>
{categories.map((category, index) => (
 <label key={index} className="block mb-2">
    <input type="radio" name="category" value={category} 
    onChange={() => handleRadioChangeCategories(category)}
    className="mr-2 w-[16px] h-[16px]"
    checked={selectCategory === category}
    />
    {category.toUpperCase()}


 </label>

))}
</section>



  <div className="mb-5 mt-4">
    
<h2 className="text-xl font-semibold mb-3">Keyword</h2>
<div>

{keywords.map((keyword, index) => (
    <button 
    key={index}
    onClick={() => handleKeywordClick(keyword)}
     className="block mb-2 px-4 py-2 w-full text-left border round hover:bg-gray-200">
        {keyword.toUpperCase()}
    </button>
)) }
</div>
</div>
<button onClick={handlResetFilter}  className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
  Reset Filter
</button>
    </section>
  </div>
  </>
};

export default Sidebar;
