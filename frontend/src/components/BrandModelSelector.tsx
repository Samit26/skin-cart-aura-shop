
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BrandModelSelectorProps {
  onBrandChange: (brand: string) => void;
  onModelChange: (model: string) => void;
  selectedBrand: string;
  selectedModel: string;
}

const BrandModelSelector = ({ onBrandChange, onModelChange, selectedBrand, selectedModel }: BrandModelSelectorProps) => {  const brands = [
    { value: 'iphone', label: 'iPhone' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'oneplus', label: 'OnePlus' },
    { value: 'realme', label: 'Realme' },
    { value: 'vivo', label: 'Vivo' },
    { value: 'oppo', label: 'Oppo' },
    { value: 'google', label: 'Google Pixel' },
    { value: 'nothing', label: 'Nothing' },
    { value: 'motorola', label: 'Motorola' },
    { value: 'poco', label: 'POCO' },
    { value: 'iqoo', label: 'iQOO' },
    { value: 'redmi', label: 'Redmi' },
    { value: 'honor', label: 'Honor' },
    { value: 'lava', label: 'Lava' },
    { value: 'micromax', label: 'Micromax' },
    { value: 'infinix', label: 'Infinix' },
    { value: 'tecno', label: 'Tecno' },
    { value: 'asus', label: 'Asus' },
    { value: 'nokia', label: 'Nokia' },
  ];

  const models: Record<string, { value: string; label: string }[]> = {
    iphone: [
      { value: 'iphone-15-pro', label: 'iPhone 15 Pro' },
      { value: 'iphone-15', label: 'iPhone 15' },
      { value: 'iphone-14-pro', label: 'iPhone 14 Pro' },
      { value: 'iphone-14', label: 'iPhone 14' },
      { value: 'iphone-13', label: 'iPhone 13' },
    ],
    samsung: [
      { value: 's24-ultra', label: 'Galaxy S24 Ultra' },
      { value: 's24', label: 'Galaxy S24' },
      { value: 's23-ultra', label: 'Galaxy S23 Ultra' },
      { value: 'note-20', label: 'Galaxy Note 20' },
    ],
    oneplus: [
      { value: '12-pro', label: 'OnePlus 12 Pro' },
      { value: '11', label: 'OnePlus 11' },
      { value: '10-pro', label: 'OnePlus 10 Pro' },
    ],
    realme: [
      { value: 'gt-5', label: 'Realme GT 5' },
      { value: '11-pro', label: 'Realme 11 Pro' },
      { value: '10-pro', label: 'Realme 10 Pro' },
    ],
    nothing: [
      { value: 'phone-2', label: 'Nothing Phone (2)' },
      { value: 'phone-1', label: 'Nothing Phone (1)' },
    ],
  };

  const handleBrandChange = (brand: string) => {
    onBrandChange(brand);
    onModelChange(''); // Reset model when brand changes
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Select Brand</label>
        <Select value={selectedBrand} onValueChange={handleBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose your phone brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Select Model</label>
        <Select 
          value={selectedModel} 
          onValueChange={onModelChange}
          disabled={!selectedBrand}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedBrand ? "Choose your model" : "Select brand first"} />
          </SelectTrigger>
          <SelectContent>
            {selectedBrand && models[selectedBrand]?.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BrandModelSelector;
