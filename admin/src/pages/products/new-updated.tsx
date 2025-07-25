import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import {
  Upload,
  X,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  FileText,
} from "lucide-react";

const NewProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subCategory: "",
    skinType: "",
    compatibility: "",
    stock: "",
    isActive: true,
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Mobile Skins",
    "Laptop Skins",
    "Gaming Skins",
    "Premium Skins",
    "Custom Skins",
  ];

  const subCategories = [
    "iPhone",
    "Samsung",
    "OnePlus",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "Google Pixel",
    "Other",
  ];

  const skinTypes = [
    "Matt",
    "Glossy",
    "Carbon Fiber",
    "Metallic",
    "Transparent",
    "Glow in Dark",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + images.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.originalPrice)
      newErrors.originalPrice = "Original price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subCategory)
      newErrors.subCategory = "Sub-category is required";
    if (!formData.skinType) newErrors.skinType = "Skin type is required";
    if (images.length === 0)
      newErrors.images = "At least one image is required";

    if (parseFloat(formData.price) >= parseFloat(formData.originalPrice)) {
      newErrors.price = "Sale price must be less than original price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const submitFormData = new FormData();

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value.toString());
      });

      // Add images
      images.forEach((image, index) => {
        submitFormData.append("images", image);
      });

      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitFormData,
      });

      if (response.ok) {
        router.push("/products");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Product
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new product for your store
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="h-5 w-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.name ? "border-red-300" : ""
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.description ? "border-red-300" : ""
                  }`}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.category ? "border-red-300" : ""
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Category *
                </label>
                <select
                  name="subCategory"
                  id="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.subCategory ? "border-red-300" : ""
                  }`}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
                {errors.subCategory && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subCategory}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="skinType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skin Type *
                </label>
                <select
                  name="skinType"
                  id="skinType"
                  value={formData.skinType}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.skinType ? "border-red-300" : ""
                  }`}
                >
                  <option value="">Select Skin Type</option>
                  {skinTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.skinType && (
                  <p className="mt-1 text-sm text-red-600">{errors.skinType}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="compatibility"
                  className="block text-sm font-medium text-gray-700"
                >
                  Compatibility
                </label>
                <input
                  type="text"
                  name="compatibility"
                  id="compatibility"
                  value={formData.compatibility}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., iPhone 13, iPhone 13 Pro"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Pricing & Inventory
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original Price (₹) *
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  id="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.originalPrice ? "border-red-300" : ""
                  }`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.originalPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.originalPrice}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sale Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.price ? "border-red-300" : ""
                  }`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {formData.originalPrice && formData.price && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Discount:{" "}
                  <span className="font-medium text-green-600">
                    {Math.round(
                      ((parseFloat(formData.originalPrice) -
                        parseFloat(formData.price)) /
                        parseFloat(formData.originalPrice)) *
                        100
                    )}
                    % off
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Images */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ImageIcon className="h-5 w-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Product Images
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images * (Max 5 images)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 10MB each
                    </p>
                  </div>
                </div>
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Image Previews
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Product Status
                </h2>
                <p className="text-sm text-gray-500">
                  Set whether this product should be active and visible to
                  customers
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-5 w-5" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewProduct;
