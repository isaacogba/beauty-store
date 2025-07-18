import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[]; // corrected to 'images' as per dummyjson.com/products/:id response
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching product data: ${error}`);
        });
    }
  }, [id]);
  if (!product) {
    return <h1>loading ...</h1>
  }

  return (
     //back button
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white roundeded"
      >
        Back
      </button>

    
   
        
          <div>
            
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-[50%] h-auto mb-5"
              />
            
          </div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mb-4 text-gray-700 w-[70%] ">{product.description}</p>
          <p className="text-lg font-semibold">Price:₦{product.price}</p>
          <p className="text-yellow-500 ">Rating: {product.rating}</p>
        </div>
    
  );
};

export default ProductPage;
