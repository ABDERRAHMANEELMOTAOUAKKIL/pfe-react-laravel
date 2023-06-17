@extends('admin.dashboard.adminDash')
@section('title','Client-Dash')
@section('content')

<table id="example" class="table table-striped" style="width:100%">
    <h4>Client Dashboard Table </h4>
   

    <div class="card shadow-sm">
        <div class="card-body">
    <thead>
        <tr>
            <th>Client id</th>
            <th>Client Name</th>
            <th>Client Image</th>
            <th>Client email</th>
            <th>Client type</th>
            <th>Creation date</th>

          
        </tr>
    </thead>
    <tbody> 
        @foreach ($users as $user)
            
       
        <tr>
            <td>{{$user->id}}</td>
            <td>{{$user->name}}</td>
            <td>
                @if ($user->image)
                    <img src="{{ asset('storage/profile-images/' . $user->image) }}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%;">
                @else
                    <span>No image</span>
                @endif
            </td>
            <td>{{$user->email}}</td>
            <td>{{$user->user_type}}</td>
            <td>{{ \Carbon\Carbon::parse($user->created_at)->format('Md,Y, h:iA') }}</td>
            
        </tr>
        @endforeach
    </tfoot>
</table>
</div>
 </div>
@endsection