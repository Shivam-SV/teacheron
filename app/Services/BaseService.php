<?php

namespace App\Services;

abstract class BaseService{
    protected static $__instance;

    public static function init(){
        if(is_null(self::$__instance)){
            self::$__instance = new static();
        }
        return self::$__instance;
    }
}