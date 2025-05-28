<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with(['brand', 'category'])->get();
    }


    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        return Product::create($request->only([
            'category_id',
            'brand_id',
            'name',
            'slug',
            'images',
            'description',
            'price',
            'is_active',
            'is_featured',
            'in_stock',
            'on_sale',
        ]));
          if ($request->hasFile('images')) {
        $data['images'] = $request->file('images')->store('products', 'public');
    }

        $product = Product::create($data);

         return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
    }

    public function update(Request $request, Product $product)
{
    $product->update($request->only([
        'category_id',
        'brand_id',
        'name',
        'slug',
        'images',
        'description',
        'price',
        'is_active',
        'is_featured',
        'in_stock',
        'on_sale',
    ]));

     if ($request->hasFile('images')) {
        $data['images'] = $request->file('images')->store('products', 'public');
    }

    $product->update($data);

    return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
}

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
