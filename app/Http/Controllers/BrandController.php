<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::all());
    }

   

    public function show($id)
    {
        $brand = Brand::findOrFail($id);
        return respone()->json($brand);
    }

public function store(Request $request)
    {
        return Brand::create($request->only([
        'name',
        'slug',
        'description',
        'logo',
            ]));
    }

    public function update(Request $request, Brand $brand)
{
    $brand->update($request->only([
      'name',
        'slug',
        'description',
        'logo',
    ]));

    return $brand;
}
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(['message' => 'Brand deleted']);
    }
}
