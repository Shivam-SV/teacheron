<?php

namespace App\Models;

use App\Traits\HasMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method attachDocumentfiles(\Illuminate\Http\UploadedFile $file)
 * @method deleteDocumentfiles(int $mediaId)
 * @method getDocumentfiles(int $mediaId)
 * @method allDocumentfiles()
 */


class UserDocument extends Model
{
    use HasFactory, HasMedia;

    // this column will point to the media table columns
    public const DOCUMENT_FILES = 'document_files';

    protected $fillable = [
        'user_id',
        'document_type_id',
        'status',
        'status_updated_at',
        'status_updated_by',
    ];

    protected $medias = [Self::DOCUMENT_FILES];
}
