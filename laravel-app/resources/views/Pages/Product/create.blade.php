@extends('admin.dashboard.adminDash')
 @section('title', 'Create New lodge-list') 
@section('content')
<div class="col-md-6 offset-md-3">
    <div class="card shadow-sm mt-4">
        <div class="card-body ">
            <h4>Add New lodging house</h4>
            <small>VWould you please fill the fields : <span class="text-danger">*</span></small>

            <form action="{{ route("Product.store") }}" class="mt-3" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group mb-3">
                    <label for="name">Name of the listing <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" value="{{ old('name') }}" id="name" name="name" placeholder="Entrer le nom du produit">
                
                </div>

                <div class="form-group mb-3">
                    <label for="image"> Listing image  <span class="text-danger">*</span></label>
                    <input type="file" class="form-control "  id="image" name="image" >
                    
                </div>

                <div class="form-group mb-3">
                    <label for="category_id">Listing Category</label>
                    <select name="category_id" id="category_id" class="form-select">
                        @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
             
                </div>
                

                <div class="form-group mb-3">
                    <label for="price">Price of the listing DH</label>
                    <input type="number" class="form-control" id="price" name="price" placeholder="Prix du produit" step="0.01">
                  
                </div>
                <div class="form-group mb-3">
                    <label for="location">Listing Location</label>
                    <input type="text" class="form-control" id="location" name="location" placeholder="location">
                  
                </div>

                <div class="form-group mb-3">
                    <label for="description">Listing description</label>
                    <textarea name="description" id="description" cols="30" rows="5" class="form-control"></textarea>
                 
                </div>
        
                <div class="form-group mt-3">
                    <label for="gallery">Gallerie</label>
                    <div class="gallery-wrapper position-relative">
                        <label for="gallery" class="d-block">
                            <div class="upload-files-btn">Add</div>
                        </label>
                        <div class="galleryContainer">
                        </div>
                    </div>
                    <input type="file" multiple name="gallery[]" accept="image/*"
                        id="gallery"class="form-control ">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary w-100 shadow-sm">Save information</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

<script>
    function previewMultipleImages(
    inputQuerySelector,
    imagesContainerQuerySelector
     ) {
    const input = document.querySelector(inputQuerySelector);
    const imagesContainer = document.querySelector(
        imagesContainerQuerySelector
    );
    imagesContainer.innerHTML = "";
    //   let fileReader = new FileReader();
    let files = input.files;
    for (let i = 0; i < files.length; i++) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onloadend = (e) => {
            //   console.log(e.target.result);
            imagesContainer.innerHTML =
                imagesContainer.innerHTML +
                "<img src='" +
                e.target.result +
                "'>";
        };
    }
}
function previewOneImage(inputQuerySelector, imageContainerQuerySelector) {
    const input = document.querySelector(inputQuerySelector);
    const imageContainer = document.querySelector(imageContainerQuerySelector);
    imageContainer.innerHTML = "";
    let file = input.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
        imageContainer.innerHTML = "<img src='" + e.target.result + "'>";
    };
}
function uploadBtnText(inputFile, uploadBtn) {
    uploadBtn.innerText = "Ajouter";
    if (!inputFile.files.length == 0) {
        uploadBtn.innerText = "Remplacer";
    }
}
let galleryInput = document.querySelector("#gallery");
        let uploadGalleryBtn = document.querySelector(
            ".gallery-wrapper .upload-files-btn"
        );
        galleryInput.addEventListener("change", function() {
            uploadBtnText(galleryInput, uploadGalleryBtn);
            previewMultipleImages("#gallery", ".galleryContainer");
        });

        let imageInput = document.querySelector("#image");
        let uploadImageBtn = document.querySelector(".image-wrapper .upload-files-btn");
        imageInput.addEventListener("change", function() {
            console.log("ok");
            uploadBtnText(imageInput, uploadImageBtn);
            previewOneImage("#image", ".imageContainer");
        });
</script>

<style>
    .galleryContainer,
   .imageContainer {
       border: 1px solid lightgray;
       min-height: 200px;
       width: 100%;
       border-radius: 3px;
   }
   .galleryContainer {
       padding: 1rem;
       display: flex;
       gap: 1rem;
       align-items: baseline;
       justify-content: space-between;
       flex-wrap: wrap;
   }
   .galleryContainer img {
       width: 22%;
       border: 1px solid #808080;
       border-radius: 5%;
   }
   .imageContainer img {
       width: 100%;
   }
   .galleryContainer img,
   .imageContainer img {
       aspect-ratio: 1/1;
       object-fit: contain;
       transform: scale(1);
       transition: 0.3s;
   }
   
   .galleryContainer img:hover {
       transform: scale(2.5);
       transition: 0.3s;
       position: relative;
       z-index: 999;
       background-color: rgba(0, 0, 0, 0.7);
   }
   .upload-files-btn {
       position: absolute;
       z-index: 999;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       opacity: 0.5;
       background-color: #c5c5c5;
       padding: 0.5rem 1.5rem;
       border-radius: 3px;
       cursor: pointer;
       border: 1px dashed #000;
   }
   .upload-files-btn:hover {
       opacity: 0.75;
   }
   </style>