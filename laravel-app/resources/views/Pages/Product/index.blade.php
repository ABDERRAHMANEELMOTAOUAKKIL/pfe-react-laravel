@extends('admin.dashboard.adminDash')
@section('title', 'Product-list')
@section('content')
    <table id="example" class="table table-striped" style="width:100%">
    <h4>Products Table </h4>

    <a href="{{ route('Product.create') }}" class="btn btn-primary mb-5">add a product</a>

    <div class="card shadow-sm">
        <div class="card-body">
    <thead>
        <tr>
            <th>Lodge Name</th>
            <th>price</th>
            <th>image</th>
            <th>Lodge Category</th>
            <th>Location</th>
            <th>slug</th>
            <th>updated_at</th>
            <th>created_at</th>
            <th>Actions</th>

        </tr>
    </thead>
    <tbody>
        @foreach ($products as $product)
        <tr>
            <td>{{ $product->name }}</td>
            <td>{{ $product->price }} dh</td>
            <td>
                <img src="{{ asset('storage/'.$product->image) }}" width="70px" height="70px" alt="lodge">
            </td>
            <td>{{ $product->category->name}}</td>
            <td>{{ $product->location}}</td>
            <td>{{ $product->slug}}</td>
            <td>{{ $product->created_at->diffForHumans() }}</td>
            <td>{{ $product->updated_at->diffForHumans() }}</td>
            <td class="d-flex justify-content-around">
                <a href="{{ route('Product.edit',$product->id) }}"
                    class="btn btn-success">Edit</a>
                    <form action="{{route('Product.destroy', $product)}}" method="post">
                        @csrf
                        @method('delete')
                        <button class="btn btn-danger" >Delete </button>                               
                    </form>


            <td>  
       
        </tr>
        @endforeach
    </tfoot>
</table>
</div>
 </div>
@endsection

