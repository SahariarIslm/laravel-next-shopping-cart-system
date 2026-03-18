<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index(): JsonResponse
    {
        $cartItems = Cart::with('product')
            ->where('user_id', auth()->id())
            ->get()
            ->map(fn($item) => [
                'id'         => $item->id,
                'product_id' => $item->product_id,
                'quantity'   => $item->quantity,
                'product'    => $item->product,
                'subtotal'   => round($item->quantity * $item->product->price, 2),
            ]);

        return response()->json([
            'success' => true,
            'data'    => $cartItems,
            'message' => 'Cart retrieved successfully',
        ]);
    }

    public function batchUpdate(Request $request): JsonResponse
    {
        $request->validate([
            'items'                => 'required|array|min:1',
            'items.*.product_id'   => 'required|integer|exists:products,id',
            'items.*.quantity'     => 'required|integer|min:0',
        ]);

        $userId = auth()->id();

        DB::transaction(function () use ($request, $userId) {
            foreach ($request->items as $item) {
                if ((int)$item['quantity'] === 0) {
                    Cart::where('user_id', $userId)
                        ->where('product_id', $item['product_id'])
                        ->delete();
                } else {
                    Cart::updateOrCreate(
                        ['user_id' => $userId, 'product_id' => $item['product_id']],
                        ['quantity' => $item['quantity']]
                    );
                }
            }
        });

        return response()->json([
            'success' => true,
            'data'    => null,
            'message' => 'Cart updated successfully',
        ]);
    }

    public function destroy(int $productId): JsonResponse
    {
        $deleted = Cart::where('user_id', auth()->id())
            ->where('product_id', $productId)
            ->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => null,
            'message' => 'Item removed from cart',
        ]);
    }
}
