@extends('admin.dashboard.adminDash')
@section('title','Host-Dash')
@section('content')

<table id="example" class="table table-striped" style="width:100%">
    <h4>Host Dashboard Table </h4>
   

    <div class="card shadow-sm">
        <div class="card-body">
    <thead>
        <tr>
            <th>Host id</th>
            <th>Host Name</th>
            <th>Host Image</th>
            <th>Host email</th>
            <th>Host phone</th>
            <th>User type</th>
            <th>Creation date</th>

          
        </tr>
    </thead>
    <tbody> 
        @foreach ($hosts as $host)
            
       
        <tr>
            <td>{{$host->id}}</td>
            <td>{{$host->name}}</td>
            <td>
                @if ($host->image)
                    <img src="{{ asset('storage/profile-images/' . $host->image) }}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%;">
                @else
                    <span>No image</span>
                @endif
            </td>
            <td>{{$host->email}}</td>
            <td>{{$host->phone}}</td>
            <td>{{$host->user_type}}</td>
            <td>{{ \Carbon\Carbon::parse($host->created_at)->format('Md,Y, h:iA') }}</td>
            
        </tr>
        @endforeach
    </tfoot>
</table>
</div>
 </div>
@endsection