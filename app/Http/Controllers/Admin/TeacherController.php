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
use App\Enums\UserDocumentStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;

class TeacherController extends Controller{
    protected $model = User::class;

    public function index(){
        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => Grid::of($this->model::whereHas('roles', fn($query) => $query->where('name', 'teacher')))
                ->columns([
                    Column::make('name', 'Name'),
                    Column::make('email', 'Email'),
                    Column::action('actions')
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
            Log::error("Fail to add the payment in user id ({$request->user_id}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while adding the payment! Reverted the data back");
        }
    }

    public function show(Request $request, $id){
        $teacher = User::with(['userPrice','userContacts', 'userSubjects', 'qualifications', 'country', 'userExperience', 'documents'])->whereHas('roles', fn($query) => $query->where('name', 'teacher'))->findOrFail(base64_decode($id));
        return Inertia::render('Admin/Teacher/View', [
            'teacher' => $teacher,
            'payments' => Grid::of(Wallet::where('user_id', $id))
                ->columns([
                    Column::make('amount', 'Amount'),
                    Column::make('transaction_type', 'Transaction Type'),
                    Column::make('payment.status', 'Status'),
                    Column::make('created_at', 'Date'),
                ])
                ->render(),
        ]);
    }

    public function changePrice(Request $request, $teacherId){
        $teacher = User::findOrFail(base64_decode($teacherId));
        $request->validate([
            'price' => 'required|numeric|gt:0|lt:1000000'
        ]);

        try{
            $teacher->UpdatePrice($request->price);
            Session::flash('success', "Price has been updated successfully");
        }catch(Exception $th){
            Log::error("Fail to update the price of the teacher id ({$teacherId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the price! Reverted the data back");
        }
    }

    public function verifyDocument(Request $request, $teacherId){
        $teacher = User::findOrFail(base64_decode($teacherId));
        $request->validate([
            'document_id' => 'required|numeric|exists:user_documents,id',
            'document_status' => 'required|in:'. implode(',',array_column(UserDocumentStatus::cases(), 'value'))
        ]);

        try{
            $teacher->documents->find($request->document_id)->update(['status' => $request->document_status]);
            Session::flash('success', "Document status has been updated successfully");
        }catch(Exception $th){
            Log::error("Fail to update the document status of the teacher id ({$teacherId}) due to: {$th->getMessage()}");
            Session::flash('error', "Oops! we faced something wrong while updating the document status! Reverted the data back");
        }
    }
}
