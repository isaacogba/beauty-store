import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSeller = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  // fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=7");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);
const handleFollowClick = (index: number) => {
  setAuthors((prevAuthors) =>
    prevAuthors.map((author, i) =>
      i === index
        ? { ...author, isFollowing: !author.isFollowing }
        : author
    )
  );
};

 
  return (
    <div className="bg-white p-5 mx-[5rem] mt-25 border w-[23rem] rounded">
      <h2 className="text-xl font-bold mb-5">Top sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4">
            <section className="flex items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[25%] rounded-full"
              />
              <span className="ml-4">{author.name}</span>
            </section>

            <button
            onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSeller;
