
const brands = [
  { name: 'iPhone', logo: '📱', models: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13'] },
  { name: 'Samsung', logo: '📲', models: ['Galaxy S24', 'Galaxy S23', 'Galaxy Note 20', 'Galaxy A54'] },
  { name: 'OnePlus', logo: '🔴', models: ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord', 'OnePlus 10T'] },
  { name: 'Realme', logo: '🟡', models: ['Realme GT', 'Realme 11 Pro', 'Realme Narzo', 'Realme C55'] },
  { name: 'Nothing', logo: '⚫', models: ['Nothing Phone 2', 'Nothing Phone 1', 'Nothing Phone 2a'] },
  { name: 'Google', logo: '🔵', models: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a', 'Pixel 7'] }
];

const BrandGrid = () => {
  return (
    <section className="py-16">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Shop by Brand
          </h2>
          <p className="text-light-text text-lg">
            Find the perfect skin for your device
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="product-card group text-center py-8 hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {brand.logo}
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-2">
                {brand.name}
              </h3>
              <p className="text-light-text text-sm">
                {brand.models.length} models
              </p>
              <button className="mt-4 text-cyber-yellow font-medium hover:underline transition-colors">
                Shop Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandGrid;
