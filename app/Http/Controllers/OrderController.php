<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Address;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product', 'user', 'address'])->latest()->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return respone()->json($order);
    }

    public function store(Request $request)
    {
        return Order::create($request->only([
        'user_id',
        'grand_total',
        'payment_method',
        'payment_status',
        'status',
        'currency',
        'shipping_amount',
        'shipping_method',
        'note',
            ]));
    }

    public function update(Request $request, Order $order)
{
    $order->update($request->only([
        'user_id',
        'grand_total',
        'payment_method',
        'payment_status',
        'status',
        'currency',
        'shipping_amount',
        'shipping_method',
        'note',
    ]));

    return $order;
}

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
}
