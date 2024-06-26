<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'model_name',
        'model_id',
        'model_column',
        'file_name',
        'source',
        'original_file_name',
        'file_path',
        'file_extension',
        'file_mime'
    ];

    public static function StoreMedia(string $model, int $id, string $columnName, string|object $media){
        self::create([
            'model_id' => $id,
            'model_name' => $model::getTable(),
            'model_column' => $columnName,
            'file_path' => $media
        ]);
    }
}
