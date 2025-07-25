const categories = [
  {
    name: "Marvel Skins",
    description: "Superhero designs for every fan",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    color: "from-red-500 to-blue-500",
  },
  {
    name: "Naruto Skins",
    description: "Bring your favorite characters to life",
    image: "./Banner/Naruto.png",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "One Piece Skins",
    description: "Clean and sophisticated One Piece designs",
    image: "./Banner/OnePiece.png",
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Solo Leveling Skins",
    description: "Vibrant glows that stand out",
    image: "./Banner/SoloLeveling.png",
    color: "from-cyan-400 to-purple-500",
  },
  {
    name: "Demon Slayer Skins",
    description: "Demon Slayer designs for anime lovers",
    image: "./Banner/DemonSlayer.png",
    color: "from-orange-400 to-pink-500",
  },
];

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-light-text text-lg">
            Discover skins that match your style
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              style={{ aspectRatio: "768/435" }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 bg-gray-50"
              />

              {/* Gradient Overlay */}
              {/* <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
              ></div> */}

              {/* Content */}
              {/* <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="font-poppins text-2xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {category.description}
                </p>
                <button className="bg-white text-jet-black px-4 py-2 rounded-lg font-medium hover:bg-cyber-yellow transition-colors w-fit">
                  Browse {category.name}
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
