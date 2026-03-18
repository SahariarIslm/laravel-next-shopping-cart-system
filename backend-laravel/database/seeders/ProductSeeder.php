<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Wireless Headphones', 'price' => 79.99, 'description' => 'Premium noise-cancelling wireless headphones with 30hr battery life.'],
            ['name' => 'Mechanical Keyboard', 'price' => 129.99, 'description' => 'RGB mechanical keyboard with tactile brown switches.'],
            ['name' => 'USB-C Hub', 'price' => 39.99, 'description' => '7-in-1 USB-C hub with HDMI, SD card reader, and PD charging.'],
            ['name' => 'Webcam 4K', 'price' => 89.99, 'description' => 'Ultra HD 4K webcam with built-in microphone and autofocus.'],
            ['name' => 'Monitor Stand', 'price' => 49.99, 'description' => 'Adjustable aluminum monitor stand with USB ports.'],
            ['name' => 'Running Shoes', 'price' => 99.99, 'description' => 'Lightweight running shoes with cushioned sole.'],
            ['name' => 'Yoga Mat', 'price' => 29.99, 'description' => 'Non-slip eco-friendly yoga mat, 6mm thick.'],
            ['name' => 'Water Bottle', 'price' => 19.99, 'description' => 'Insulated stainless steel water bottle, 1L.'],
            ['name' => 'Backpack', 'price' => 59.99, 'description' => '30L waterproof hiking backpack with laptop compartment.'],
            ['name' => 'Desk Lamp', 'price' => 34.99, 'description' => 'LED desk lamp with adjustable color temperature and brightness.'],
            ['name' => 'Notebook Set', 'price' => 14.99, 'description' => 'Pack of 3 ruled notebooks, A5 size, 200 pages each.'],
            ['name' => 'Pen Holder', 'price' => 9.99, 'description' => 'Bamboo pen holder with 5 compartments.'],
            ['name' => 'Mouse Pad XL', 'price' => 22.99, 'description' => 'Extra large gaming mouse pad, 900x400mm.'],
            ['name' => 'Phone Stand', 'price' => 15.99, 'description' => 'Foldable aluminum phone and tablet stand.'],
            ['name' => 'Cable Organizer', 'price' => 12.99, 'description' => 'Set of 20 reusable cable ties and clips.'],
            ['name' => 'Bluetooth Speaker', 'price' => 54.99, 'description' => 'Portable waterproof speaker with 360° sound.'],
            ['name' => 'Smart Watch', 'price' => 199.99, 'description' => 'Fitness smartwatch with heart rate and GPS tracking.'],
            ['name' => 'Laptop Sleeve', 'price' => 24.99, 'description' => 'Slim neoprene sleeve for 13-15 inch laptops.'],
            ['name' => 'Ergonomic Chair Cushion', 'price' => 44.99, 'description' => 'Memory foam seat cushion with lumbar support pillow.'],
            ['name' => 'Green Plant Set', 'price' => 32.99, 'description' => 'Set of 3 low-maintenance succulent plants with ceramic pots.'],
        ];

        foreach ($products as $index => $product) {
            Product::create([
                'name'        => $product['name'],
                'description' => $product['description'],
                'price'       => $product['price'],
                'image'       => "https://picsum.photos/seed/{$index}/400/300",
            ]);
        }
    }
}
