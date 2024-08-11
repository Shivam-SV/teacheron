<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'meta', 'created_by_user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_have_subjects')
            ->withPivot('level_from_id', 'level_to_id');
    }

    public static function GridColumns(){
        return [
            ["title" => 'Name', 'field' => 'name'],
            ["title" => 'Meta', 'field' => 'meta'],
        ];
    }
}
