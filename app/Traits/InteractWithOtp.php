<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

trait InteractWithOtp{

    protected int $Otp;

    protected string $cachePrefix = "__otp";

    protected string $cachePostfix;

    protected int $expiryTimeInMin = 6;

    /** Methods that helps to generate adn manage the OTP */
    private function setCachePostFix(string $cachePostfix){
        $this->cachePostfix = $cachePostfix;
    }

    private function getCacheKey(): string{
        return $this->cachePrefix . session()->id(). $this->cachePostfix;
    }

    protected function generateOtp(string $cachePostfix, int $length = 6): int{
        $this->setCachePostFix($cachePostfix);
        if(!$this->hasOtpExists()){
            $this->Otp = random_int(
                (int) implode('',array_fill(0, $length, 0)),
                (int) implode('',array_fill(0, $length, 9))
            );
            Cache::put($this->getCacheKey(), $this->Otp, Carbon::now()->addMinutes($this->expiryTimeInMin));
        }
        return $this->Otp;
    }

    protected function hasOtpExists(): bool{
        return Cache::has($this->getCacheKey());
    }

    private function getOtp(): int{
        if(empty($this->Otp) && $this->hasOtpExists()){
            $this->Otp = Cache::get($this->getCacheKey());
        }

        return $this->Otp;
    }

    protected function matchOtp(int $Otp): bool{
        return $this->getOtp() === $Otp ? true : false;
    }

    /** Methods helps to send the OTP  */

    public function sendOtpViaEmail($Otp){
        Log::info("OTP is {$Otp}");
    }

    public function sendOtpViaSMS($Otp){
        Log::info("OTP is {$Otp}");
    }
}
