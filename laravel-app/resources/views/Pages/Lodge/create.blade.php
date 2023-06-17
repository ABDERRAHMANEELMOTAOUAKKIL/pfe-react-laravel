@extends('admin.dashboard.adminDash')
@section('title','add-categories')
@section('content')

<div class="col-md-6 offset-md-3">
    <div class="card shadow-sm mt-4">
        <div class="card-body ">
            <h4>Add New Lodge Category</h4>
            <small>Would you please fill the fields : <span class="text-danger">*</span></small>

            <form action="{{ route('Lodges.store') }}" class="mt-3" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group mb-3">
                    <label for="name">Name of the  lodge category <span class="text-danger">*</span></label>
                    <input type="text" class="form-control " id="name" name="name" placeholder="Entrer le nom de la catégorie">
                  
                </div>
                <div class="form-group mb-3">
                    <label for="image">Image Lodge <span class="text-danger">*</span></label>
                    <input type="file" class="form-control"  id="image" name="image" required autocomplete="image">
                  
                </div>
                <div class="form-group mb-3">
                    <label for="quantity"> quantity <span class="text-danger">*</span></label>
                    <input type="number" class="form-control"  id="quantity" name="quantity" >
                   
                </div>
              

                <div class="form-group">
                    <button class="btn btn-primary w-100 shadow-sm">Enregistrer les informations</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection