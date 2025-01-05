<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Media extends Model
{
    use HasFactory;

    public const BASE_PATH = 'public';
    public const TEMP_FILE_PATH = 'temp';
    public const PERMANENT_FILE_PATH ='media';

    protected $fillable = [
        'model_type',
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

    public function model(){
        return $this->morphTo();
    }

    // Store a temporary file (no model_id at the time of storage)
    public static function storeTempFile($file, $model_name, $model_column)
    {
        $filePath = $file->store(self::BASE_PATH. '/' . self::TEMP_FILE_PATH);
        $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

        $filePath = str_replace(self::BASE_PATH. '/', '', $filePath);
        
        return self::create([
            'model_type' => $model_name,
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
            $permanentPath = str_replace(self::TEMP_FILE_PATH, self::PERMANENT_FILE_PATH, $this->file_path);
            Storage::move($this->file_path, $permanentPath);
            $this->file_path = $permanentPath;
            $this->save();
            if($model_id) $this->associateWithModel($model_id);
        }

        return $this;
    }

    public static function attachFile($file, $model_id, $model_name, $model_column){
        $filePath = $file->store(self::BASE_PATH . '/' . self::PERMANENT_FILE_PATH);
        $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();

        $filePath = str_replace(self::BASE_PATH. '/', '', $filePath);

        return self::create([
            'model_type' => $model_name,
            'model_id' => $model_id,
            'model_column' => $model_column,
            'file_name' => $fileName,
            'original_file_name' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_extension' => $file->getClientOriginalExtension(),
            'file_mime' => $file->getMimeType(),
        ]);
    }

    public static function attachWebFile($url, $model_id, $model_name, $model_column, $file_name = null){
        return self::create([
            'model_type' => $model_name,
            'model_id' => $model_id,
            'model_column' => $model_column,
            'file_name' => $file_name,
            'file_path' => $url,
            'source' => 'web',
        ]);
    }

    // Update the file (replace old file)
    public function updateFile($newFile){
        // Check if old file exists before deleting
        if ($this->fileExists()) {
            Storage::delete($this->file_path);
        }

        // Store new file
        $filePath = $newFile->store(self::BASE_PATH. '/' .self::PERMANENT_FILE_PATH);
        $fileName = Str::random(10) . '.' . $newFile->getClientOriginalExtension();

        $filePath = str_replace(self::BASE_PATH. '/', '', $filePath);

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

    public function updateWebFile($url, $file_name = null){
        $this->update([
            'file_path' => $url,
            'file_name' => $file_name,
        ]);

        return $this;
    }

    // Delete the file from storage
    public function deleteFile(){
        if ($this->fileExists()) {
            Storage::delete(self::BASE_PATH. '/' .$this->file_path);
        }
        $this->delete();

        return $this;
    }

    // Helper to check if file exists in storage
    public function fileExists(){
        return $this->source === 'storage' ? $this->file_path && Storage::exists('public' . '/' . $this?->file_path) : $this->file_path;
    }

    public function getMediaLinkAttribute(){
        return $this->source === 'web' ? $this->file_path : $this->link;
    }

    public function getLinkAttribute(){
        if($this->fileExists() && $this->source ==='storage') return asset('storage' . '/' . $this->file_path);
        else if($this->fileExists() && $this->source === 'web') return $this->file_path;
        return null;
    }

    // Helper to check if file is temporary
    public function isTemporary(){
        return Str::contains($this->file_path, self::TEMP_FILE_PATH);
    }

    // Helper to check if file is permanent
    public function isPermanent(){
        return !$this->isTemporary();
    }
}
