@extends('admin.dashboard.adminDash')
@section('title', 'property-list')
@section('content')
<table id="example" class="table table-striped" style="width:100%">
    <h4>Properties Table </h4>

    <div class="card shadow-sm">
        <div class="card-body">
    <thead>
        <tr>
            <th>Lodge Name</th>
            <th>price</th>
            <th>image</th>
            <th>Lodge Category</th>
            <th>Location</th>
            <th>Host Name/id</th>
            <th>Host mail</th>
            <th>Host Phone/id</th>
            <th>updated_at</th>
            <th>created_at</th>
            <th>Actions</th>

        </tr>
    </thead>
    <tbody>
        @foreach ($properties as $property)
        <tr>
            <td>{{ $property->name }}</td>
            <td>{{ $property->price }} dh</td>
            <td>
                <img src="{{ asset('storage/'.$property->image) }}" width="70px" height="70px" alt="lodge">
            </td>
            <td>{{ $property->category->name}}</td>
            <td>{{ $property->location}}</td>
            <td>{{ $property->host->name}}</td>
            <td>{{ $property->host->email}}</td>
            <td>{{ $property->host->phone}}</td>
            <td>{{ $property->created_at->diffForHumans() }}</td>
            <td>{{ $property->updated_at->diffForHumans() }}</td>
            <td class="d-flex justify-content-around">
                    {{-- <form action="{{route('property.destroy', $property)}}" method="post">
                        @csrf --}}
                        {{-- @method('delete') --}}
                        <button class="btn btn-danger" >Delete </button>                               
                    {{-- </form> --}}
            <td>  
       
        </tr>
        @endforeach
    </tfoot>
</table>
</div>
 </div>
@endsection