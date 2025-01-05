<?php

namespace App\Traits;

use App\Models\Media;
use Illuminate\Support\Str;

trait HasMedia
{

    // Handle dynamic method calls to attach, update, and get media
    public function __call($method, $parameters)
    {
        $action = $this->extractActionFromMethod($method);
        $column = $this->extractColumnFromMethod($method);

        if (in_array($column, $this->medias)) {
            switch ($action) {
                case 'attach':
                    return $this->attachMedia($parameters[0], $column);
                case 'update':
                    return $this->updateMedia($parameters[0], $column, $parameters[1] ?? null);
                case 'all':
                    return $this->allMedia($column);
                case 'get':
                    return $this->getSingleMedia($column, $parameters[0] ?? null);
                case 'delete':
                    return $this->deleteMedia($column, $parameters[0] ?? null);
                default:
                    return parent::__call($method, $parameters); // Call parent if not handled
            }
        }

        return parent::__call($method, $parameters); // Call parent if the method isn't recognized
    }

    // Extract action (attach, update, etc.) from method name
    private function extractActionFromMethod($method){
        return Str::before($method, ucfirst($this->extractColumnFromMethod($method)));
    }

    // Extract column (media type) from method name
    private function extractColumnFromMethod($method){
        $methodParts = preg_split('/(?=[A-Z])/', $method); // Split camelCase into parts
        return Str::snake(array_pop($methodParts)); // Return the last part as snake_case
    }

    // Define a relationship to fetch media for a specific column
    public function media($column){
        return $this->morphMany(Media::class, 'model')
                    ->where('model_column', $column);
    }

    public function singleMedia($column){
        return $this->hasOne(Media::class, 'model_id', 'id')->where('model_type', Self::class)->where('model_column', $column);
    }

    // Fetch all media files for a specific column
    public function allMedia($column){
        return $this->media($column)->get();
    }

    // Fetch a single media file for a column
    public function getSingleMedia($column, $mediaId = null){
        return $this->media($column)->when($mediaId, fn($query) => $query->where('id', $mediaId))->first();
    }

    // Add media to the model for a specific column
    public function attachMedia($file, $column){
        return Media::attachFile($file, $this->id, static::class, $column);
    }

    public function attachWebMedia($url, $column, $filename = null){
        return Media::attachWebFile($url, $this->id, static::class, $column, $filename);
    }

    // Update media for a specific column, optionally by ID
    public function updateMedia($file, $column, $mediaId = null, $source = 'storage', $filename = null){
        $media = $mediaId ? $this->media($column)->where('id', $mediaId)->first() : $this->getSingleMedia($column);

        if ($media) {
            if($source == 'storage') $media->updateFile($file);
            if($source == 'web') $media->updateWebFile($file, $filename);
        } else {
            return $this->attachMedia($file, $column);
            return $this->attachWebMedia($file, $column, $filename);
        }
        return $this;
    }

    // Delete media related to this model's specific column
    public function deleteMedia($column, $mediaId = null){
        $mediaItems = $this->media($column)->when($mediaId, fn($query) => $query->where('id', $mediaId))->get();

        foreach ($mediaItems as $media) {
            $media->deleteFile(); // Deletes the file and the record
        }
        return $this;
    }
}
