
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductData {
  product_name: string;
  brands: string;
  image_url: string;
  ingredients_text: string;
  nutriments: {
    energy_100g: number;
    proteins_100g: number;
    carbohydrates_100g: number;
    fat_100g: number;
  };
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
        if (response.data.status === 1) {
          setProduct(response.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="animate-pulse text-xl text-purple-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
        <Card className="w-full max-w-md p-6 space-y-4">
          <h1 className="text-xl text-red-600 text-center">{error}</h1>
          <Link to="/">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Try Another Product
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {product.image_url && (
              <div className="md:w-1/3">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
            <div className="md:w-2/3 space-y-4">
              <h1 className="text-2xl font-bold text-purple-900">{product.product_name}</h1>
              <p className="text-gray-600">{product.brands}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Energy</p>
                  <p className="font-semibold">{product.nutriments.energy_100g} kcal</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Proteins</p>
                  <p className="font-semibold">{product.nutriments.proteins_100g}g</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="font-semibold">{product.nutriments.carbohydrates_100g}g</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="font-semibold">{product.nutriments.fat_100g}g</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-3">Ingredients</h2>
          <p className="text-gray-700">{product.ingredients_text}</p>
        </Card>

        <Link to="/">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Scan Another Product
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
