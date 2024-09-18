<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methods = [
            ['name' => 'RazorPay','slug' => 'razorpay', 'is_discoverable' => 1],
            ['name' => 'Stripe','slug' => 'stripe', 'is_discoverable' => 1],
            ['name' => 'PayPal','slug' => 'paypal', 'is_discoverable' => 1],
            ['name' => 'Admin','slug' => 'admin', 'is_discoverable' => 0]
        ];

        foreach($methods as $method) PaymentMethod::create($method);
    }
}
