import { MessageCircle } from "lucide-react";
import { ThumbsUp } from "lucide-react";

const PopularBlog = () => {
  // Your blog data array (replace with your actual data)
  const blogData = [
    { title: "Sample Blog 1", author: "isaac ogba", comments: 5, like: 12 },
    { title: "Sample Blog 2", author: "Jane Smith", comments: 8, like: 20 },
    { title: "Sample Blog 2", author: "Jane Smith", comments: 8, like: 20 },
    // ... your other blog posts
  ];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <h1 className="text-xl font-bold mb-2">Popular Blog</h1>
      <ul>
        {blogData.map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.title}</span>
            </div>
            <span className="text-gray-600">published by {blog.author}</span>
            <div className="flex items-center mt-2">
              <MessageCircle size={16} />
              <span className="text-gray-500 mr-5 ml-1">{blog.comments || 0}</span>
              <ThumbsUp size={16} />
              <span className="text-gray-500 ml-1">{blog.like}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlog;