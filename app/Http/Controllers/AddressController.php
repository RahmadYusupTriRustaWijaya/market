<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $address = Address::all();
        return response()->json($address);
    }

    public function show($id)
    {
        $address = Address::findOrFail($id);
        return respone()->json($address);

    }
    public function store(Request $request)
    {
        return Address::create($request->only([
                'order_id',
                'first_name',
                'last_name',
                'phone',
                'street_address',
                'city',
                'state',
                'zip_code',
            ]));
    }

    public function update(Request $request, Address $address)
{
    $address->update($request->only([
        'order_id',
        'first_name',
        'last_name',
        'phone',
        'street_address',
        'city',
        'state',
        'zip_code',
    ]));

    return $address;
}


    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json(['message' => 'Address deleted']);
    }
}
