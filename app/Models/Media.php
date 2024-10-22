<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    // Store a temporary file (no model_id at the time of storage)
    public static function storeTempFile($file, $model_name, $model_column)
    {
        $filePath = $file->store('temp');
        $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

        return self::create([
            'model_name' => $model_name,
            'model_id' => null, // No model ID at this point
            'model_column' => $model_column,
            'file_name' => $fileName,
            'original_file_name' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_extension' => $file->getClientOriginalExtension(),
            'file_mime' => $file->getMimeType(),
        ]);
    }

    // Link media to a model after the model is created
    public function associateWithModel($model_id){
        $this->update(['model_id' => $model_id]);
        return $this;
    }

    // Make file permanent (move from temp to permanent storage)
    public function makeFilePermanent($model_id = null){
        if ($this->source === 'storage' && $this->fileExists()) {
            $permanentPath = str_replace('temp', 'media', $this->file_path);
            Storage::move($this->file_path, $permanentPath);
            $this->file_path = $permanentPath;
            $this->save();
            if($model_id) $this->associateWithModel($model_id);
        }

        return $this;
    }

    // Update the file (replace old file)
    public function updateFile($newFile){
        // Check if old file exists before deleting
        if ($this->fileExists()) {
            Storage::delete($this->file_path);
        }

        // Store new file
        $filePath = $newFile->store('media');
        $fileName = Str::random(10) . '.' . $newFile->getClientOriginalExtension();

        // Update file details in the database
        $this->update([
            'file_name' => $fileName,
            'original_file_name' => $newFile->getClientOriginalName(),
            'file_path' => $filePath,
            'file_extension' => $newFile->getClientOriginalExtension(),
            'file_mime' => $newFile->getMimeType(),
        ]);

        return $this;
    }

    // Delete the file from storage
    public function deleteFile(){
        if ($this->fileExists()) {
            Storage::delete($this->file_path);
        }
        $this->delete();

        return $this;
    }

    // Helper to check if file exists in storage
    public function fileExists(){
        return $this->file_path && Storage::exists($this->file_path);
    }

    // Helper to get file URL
    public function getFilePathAttribute(){
        if ($this->fileExists()) {
            return Storage::url($this->file_path);
        }
        return null;
    }

    public function getMediaLinkAttribute(){
        return $this->file_path;
    }

    public function getLinkAttribute(){
        if($this->fileExists()) return asset($this->file_path);
        return null;
    }

    // Helper to check if file is temporary
    public function isTemporary(){
        return Str::contains($this->file_path, 'temp');
    }

    // Helper to check if file is permanent
    public function isPermanent(){
        return !$this->isTemporary();
    }
}
