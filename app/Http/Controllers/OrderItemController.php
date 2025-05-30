<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        return OrderItem::with(['order', 'product'])->get();
    }

    public function show($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        return response()->json($orderItem);
    }
    public function store(Request $request)
    {
    $data = $request->only([
        'order_id', 
        'product_id', 
        'quantity', 
        'unit_amount'
    ]);
    $data['total_amount'] = $data['quantity'] * $data['unit_amount'];

    return OrderItem::create($data);
    }

    public function update(Request $request, OrderItem $orderItem)
    {
    $orderItem->update($request->only([
        'order_id',
        'product_id',
        'quantity',
        'unit_amount',
        'total_amount',
    ]));

    return $orderItem;
    }
    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();
        return response()->json(['message' => 'Order item deleted']);
    }
}

