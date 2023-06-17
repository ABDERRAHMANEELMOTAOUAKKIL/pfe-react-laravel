@extends('admin.dashboard.adminDash')
@section('title','Lodge-Categories')
@section('content')
    <table id="example" class="table table-striped" style="width:100%">
        <h4>Lodge-Categories Table</h4>

        <a href="{{ route('Lodges.create') }}" class="btn btn-primary mb-5">Add a category</a>

        <div class="card shadow-sm">
            <div class="card-body">
                <thead>
                <tr>
                    <th>Lodge Name</th>
                    <th>Lodge image</th>
                    {{-- <th>Lodge quantity</th> --}}
                    <th>Creation Date</th>
                    <th>Update Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach ($categories as $category)
                    <tr>
                        <td>{{ $category->name }}</td>
                        <td>
                          
                              <img class="img img-responsive" src="{{ asset('storage/'.$category->image) }}"  width="50" height="50">
                          </td>
                        {{-- <td>{{ $category->quantity }}</td> --}}
                        <td>{{ $category->created_at->diffForHumans() }}</td>
                        <td>{{ $category->updated_at->diffForHumans() }}</td>
                        <td class="d-flex justify-content-around">
                            <a href="{{ route('Lodges.edit', encrypt($category->id)) }}"
                               class="btn btn-success">Edit</a>
                               <form action="{{route('Lodges.destroy', $category)}}" method="post">
                                @csrf
                                @method('delete')
                                <button class="btn btn-danger" >Delete </button>                               
                            </form>
                           
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </div>
        </div>
    </table>
@endsection
 