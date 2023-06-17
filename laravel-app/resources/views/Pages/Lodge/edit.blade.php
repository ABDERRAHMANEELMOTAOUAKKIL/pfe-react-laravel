@extends('admin.dashboard.adminDash')
@section('title','Lodge-Edit')
@section('content')
<h3>Edit Lodge</h3>

    <div class="col-md-6 offset-md-3">
        <div class="card shadow-sm mt-4">       
            <div class="card-body ">
                <h4>Edit Lodge</h4>
                <small>Would you please edit the following: <span class="text-danger">*</span></small>
                <form action="{{ route('Lodges.update', $category->id) }}" class="mt-3" method="POST" enctype="multipart/form-data">
                    @csrf
                    {{ method_field('PUT') }}
                    <div class="form-group mb-3">
                        <label for="name">Lodge Category <span class="text-danger">*</span></label>
                        <input type="name" class="form-control " value="{{ old('name') }}" id="name" name="name" placeholder="Enter accommodation Type">
                    </div>
                    <div class="form-group mb-3">
                        <label for="quantity">Accommodation places <span class="text-danger">*</span></label>
                        <input type="number" class="form-control " value="{{ old('quantity') }}" id="quantity" name="quantity" placeholder="Enter accommodation quantity">
                    </div>
                    <div class="form-group mb-3">
                        <label for="image">Image Lodge</label>
                        <input type="file" class="form-control" id="image" name="image">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success w-100 shadow-sm">Save Changes</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
@endsection
