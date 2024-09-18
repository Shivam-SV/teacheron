<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PaymentStatus;
use Exception;
use App\Grid\Grid;
use App\Grid\Column;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Wallet;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Enums\TransactionType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class TeacherController extends Controller{
    protected $model = User::class;

    public function index(){
        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => Grid::of($this->model::whereHas('roles', fn($query) => $query->where('name', 'teacher')))
                ->columns([
                    Column::make('name', 'Name'),
                    Column::make('email', 'Email'),
                    Column::action('payment')
                ])->render()
        ]);
    }

    public function fillWallet(Request $request){
        $request->validate([
            'type' => 'required|in:payment,coins',
            'amount' => 'required|numeric|max:999999|min:1',
            'currency_code' => 'required|exists:countries,code',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'user_id' => 'required|exists:users,id'
        ]);

        try{
            // DB::beginTransaction();
            if($request->type == 'coin'){
                $payment = Payment::create(array_merge($request->only('user_id', 'payment_method_id', 'currency_code'),[
                    'amount' => round(($request->amount * config('defaults.coin_value', 1)), 2),
                    'status' => PaymentStatus::COMPLETED,
                    'status_updated_at' => now(),
                    'description' => 'Payment added by the admin'
                ]));

                Wallet::create(['user_id' => $request->user_id ,'amount' => $request->amount,'transaction_type' => TransactionType::CREDIT,'payment_id' => $payment->id,'description' => 'Coins addeed by admin']);
            }else if($request->type == 'payment'){
                $payment = Payment::create(array_merge($request->only('user_id', 'payment_method_id', 'currency_code'),[
                    'amount' => $request->amount,
                    'status' => PaymentStatus::COMPLETED,
                    'status_updated_at' => now(),
                    'description' => 'Payment added by the admin'
                ]));

                Wallet::create(['user_id' => $request->user_id ,'amount' => round(($request->amount / config('defaults.coin_value', 1)), 2),'transaction_type' => TransactionType::CREDIT,'payment_id' => $payment->id,'description' => 'Coins addeed by admin']);
            }

            // DB::commit();
            Session::flash('success', "Payment has been added to the user wallet");
        }catch(Exception $th){
            dd($th);
            Log::error("Fail to add the payment in user id ({$request->user_id}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while adding the payment! Reverted the data back");
        }
    }
}
