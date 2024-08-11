<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Post;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:100|string',
            'description' => 'required|max:1000|string',
            'contact' => 'required|numeric|max:10000000000',
            'language_preferrance' => 'nullable|array',
            'language_preferrance.*' => 'nullable|exists:languages,id',
            'gender_preferance' => 'nullable|in:male,female,any',
            'subjects' => 'required|array',
            'subjects.*' => 'required|exists:subjects,id',
            'level_id' => 'required|exists:levels,id',
            'purpose' => 'required|in:'.implode(',', array_column(Post::purposes(), 'value')),
            'min_budget' => 'required|numeric|min:0',
            'max_budget' => 'required|numeric|min:0|gte:min_budget'
        ];
    }

    public function attributes(): array{
        return [
            'title' => 'Title',
            'description' => 'Description',
            'contact' => 'Contact',
            'language_preferrance' => 'Language Preferrance',
            'gender_preferance' => 'Gender Preferrance',
            'subject_id' => 'Subject',
            'level_id' => 'Level',
            'purpose' => 'Purpose',
            'min_budget' => 'Minimum Budget',
            'max_budget' => 'Maximum Budget'
        ];
    }
}
