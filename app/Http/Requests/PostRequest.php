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
            'user_phone_id' => 'required|exists:user_contacts,id',
            'address' => 'required|max:100|string',
            'country_id' => 'required|integer|exists:countries,id',
            'description' => 'required|max:1000|string',
            'purpose_id' => 'required|integer|exists:post_purposes,id',
            'level_id' => 'required|exists:levels,id',
            'subjects_id' => 'required|array',
            'subjects_id.*' => 'required|exists:subjects,id',
            'budget_currency_code' => 'required|string|exists:countries,code',
            'gender_preferance' => 'nullable|in:male,female,any',
            'min_budget' => 'required|numeric|min:0',
            'max_budget' => 'required|numeric|min:0|gte:min_budget',
            'language_preferrances_id' => 'nullable|array',
            'language_preferrances_id.*' => 'nullable|exists:languages,id',
            'created_by_user_id' => 'nullable|integer|exists:users,id',
        ];
    }

    public function attributes(): array{
        return [
            'title' => 'Title',
            'user_phone_id' => 'Phone Number',
            'country_id' => 'Country',
            'purpose_id' => 'Purpose',
            'level_id' => 'Level',
            'subjects_id' => 'Subject',
            'language_preferrances_id' => 'Language Preferrance',
            'gender_preferance' => 'Gender Preferrance',
            'purpose' => 'Purpose',
            'min_budget' => 'Minimum Budget',
            'max_budget' => 'Maximum Budget'
        ];
    }
}
