<?php

namespace App\Models;

use App\Enums\UserDocumentStatus;
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

    protected $casts = [
        'status' => UserDocumentStatus::class,
        'status_updated_at' => 'datetime',
    ];

    protected $with = ['documentFiles', 'documentType'];

    protected $medias = [Self::DOCUMENT_FILES];

    public function documentFiles(){
        return $this->media(Self::DOCUMENT_FILES);
    }

    public function documentType(){
        return $this->belongsTo(DocumentType::class);
    }
}
