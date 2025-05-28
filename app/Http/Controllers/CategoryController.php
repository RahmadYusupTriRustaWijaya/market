<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }


    public function show($id)
    {
        $category = Category::findOrFail($id);
        return respone()->json($category);
    }

 public function store(Request $request)
    {
        return Category::create($request->only([
            'name',
            'slug',
            'image',
            'is_active',
        ]));
    }

    public function update(Request $request, Category $category)
{
    $category->update($request->only([
        'name',
        'slug',
        'image',
        'is_active',
    ]));

    return $category;
}

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}
