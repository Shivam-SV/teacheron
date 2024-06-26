<x-mail::message>
# Hello {{ $user->first_name }}

By hitting the following link, you can verify you email and become a member of our team, So what are you waiting for ...
just hit the link and verify you email first

<x-mail::button url="{{ route('verify-email', encrypt($user->id)) }}">Verify Email</x-mail::button>

</x-mail::message>
