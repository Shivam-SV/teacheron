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

    protected $appends = ['mediaLink'];

    protected function getMediaLinkAttribute(){
        return $this->file_path;
    }

}
