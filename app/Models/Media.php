<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'model_name', 'model_id', 'model_column', 'file_name', 'original_file_name',
        'file_path', 'file_extension', 'file_mime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
