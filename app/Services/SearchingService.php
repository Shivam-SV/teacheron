<?php 

namespace App\Services;

use App\Models\Country;
use App\Models\Language;
use App\Models\Level;
use App\Models\Post;
use App\Models\PostPurpose;
use App\Models\Subject;
use Illuminate\Support\Arr;

class SearchingService extends BaseService{
    protected $stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'up', 'down', 'in', 'out', 'over', 'under', 'against', 'between', 'into', 'through', 'before', 'after', 'above', 'below', 'near', 'far', 'then', 'than', 'throughout', 'among', 'through', 'underneath', 'beneath', 'besides', 'but', 'if', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now', 'what', 'why', 'who', 'whom', 'how'];

    public function searchForPosts(string $query){

        $keywords = $this->extractKeywords($query);

        $keywords = Arr::flatten($keywords);
        
        $postQuery = Post::with(['subjects', 'languagePreference','country', 'saves' => fn($query) => $query->where('user_id', auth()->id())])
        ->select('posts.*')
        ->leftJoin('countries', 'countries.id', '=', 'posts.country_id')
        ->leftJoin('post_purposes', 'post_purposes.id', '=', 'posts.purpose_id')
        ->leftJoin('levels', 'levels.id', '=', 'posts.level_id');

        foreach ($keywords as $word) {
            $postQuery->orWhereRaw('MATCH(posts.title, posts.description, posts.address) AGAINST (? IN BOOLEAN MODE)', ["'$word'"])
              ->orWhereRaw('MATCH(countries.name) AGAINST (? IN BOOLEAN MODE)', ["'$word'"])
              ->orWhereRaw('MATCH(post_purposes.name, post_purposes.slug, post_purposes.description) AGAINST (? IN BOOLEAN MODE)', ["'$word'"])
              ->orWhereRaw('MATCH(levels.name, levels.slug, levels.group_name) AGAINST (? IN BOOLEAN MODE)', ["'$word'"])
              ->orWhereJsonContains('levels.tags', "'$word'");
        }

        return $postQuery->distinct()->paginate(10);
    }

    public function extractKeywords(string $text){
        $keywords = [];

        //Step 1 - Filterization 
        $words = explode('-', strtolower($text)); # Split the text into words
        $words = array_diff($words, $this->stopWords); # Remove stop words
        $words = array_filter($words); # Remove empty words
        $words = array_unique($words); # Remove duplicates
        foreach ($words as $i => $word) { if(strlen($word) < 3) unset($words[$i]); } # Remove short words

        //Step 2 - Classification
        $locations = $this->identifyLocationInKeywords($words); # Finding if any location is mentioned in the text
        $specifications = $this->identifySpecifications($words); # Finding if any specification is mentioned in the text

        //Step 3 - Specification Filtering
        $keywords = array_merge(count($locations) > 0 ?  compact('locations') : [], $specifications); # Merge the location and specification keywords
        $keywords['uncategorized'] = array_diff($words, Arr::flatten(array_merge($locations, $specifications))); # Add uncategorized keywords

        //Step 4 - Attaching Extra Attributes
        $keywords['exact'] = implode(' ', $words); # Add exact match keyword
        


        return $keywords;
    }

    /**
     * Identify location keywords in the text.
     * compares the words with both post and country table to identify location keywords.
     * 
     * @param array<string> $words
     * @return array<string>
     */
    public function identifyLocationInKeywords(array $words){
        /**
         * Since we have only 2 ways to identify location in the text, we will use both of them.
         * 1. from post address,
         * 2. from country table.
         */
        $locations = [];

        foreach ($words as $word) {
            if(Post::where('address', 'like', '%'. $word. '%')->exists()) $locations[] = $word;
            else if(Country::where('name', 'like', '%'. $word. '%')->exists()) $locations[] = $word;
        }

        return array_filter(array_unique($locations));
    }

    /**
     * Identify specifications keywords which occurs in some specific languages.
     * 1. Levels - Levels can be identified by their name, group_name, tags.
     * 2. Post Purpose - Post purpose can be identified by their name.
     * 3. Languages - Languages can be identified by their name.
     * 4. Subjects - Subjects can be identified by their name.
     * 
     */
    public function identifySpecifications(array $words){
        $specifications = [];

        foreach ($words as $word) {
            if(Level::whereJsonContains('tags', $word)->orWhere('name', 'like', '%'. $word. '%')->orWhere('group_name', 'like', '%'. $word. '%')->exists()) $specifications['level'][] = $word;
            else if(PostPurpose::where('name', 'like', '%'. $word. '%')->exists()) $specifications['post_purpose'][] = $word;
            else if(Language::where('name', 'like', '%'. $word. '%')->exists()) $specifications['language'][] = $word;
            else if(Subject::where('name', 'like', '%'. $word. '%')->exists()) $specifications['subject'][] = $word;
        }

        return $specifications;
    }

}