export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-3 gap-6 bg-zinc-800">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-2">Add Product</h1>
      <form className=" ">
        <div className="rounded-xl p-2 gap-4 shadow-lg grid grid-cols-3 w-full">
          
        <div className="flex-col flex gap-4">
          <label htmlFor="productName" className="text-xl">Product Name</label>
        <input 
          type="text" 
          id="productName" 
          name="productName" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Product Name"
        />
        </div>
        
        <div className="flex-col flex gap-4">
        <label htmlFor="productDescription" className="text-xl">Description</label>  
        <input 
          type="text" 
          id="productDescription" 
          name="productDescription" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Product Description"
        />
        
        </div>
<div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Product Price</label>
        <input 
          type="text" 
          id="price" 
          name="price" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Price"
        />
        
        </div>

        <div className="flex-col flex gap-4">
          <label htmlFor="productName" className="text-xl">Product Stock</label>
        <input 
          type="text" 
          id="stock" 
          name="stock" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Stock"
        />

        </div>
        <div className="flex-col flex gap-4">
          <label htmlFor="productName" className="text-xl">Sku</label>
        <input 
          type="text" 
          id="sku" 
          name="sku" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="SKU"
        />
        </div>

        <div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Weight</label>
        <input 
          type="text" 
          id="weight" 
          name="weight" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Weight"
        />

</div>

<div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Product Images</label>
        <input 
          type="file" 
          id="gallery" 
          name="gallery" 
          className="p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
        />
</div>

<div className="flex-col flex gap-2">
  <label className="text-xl">Featured</label>
  <div className="flex gap-4 items-center">
    <label className="flex items-center gap-2">
      <input 
        type="radio" 
        name="featured" 
        value="yes" 
        className="w-4 h-4 accent-zinc-900"
        required
      /> Yes
    </label>
    <label className="flex items-center gap-2">
      <input 
        type="radio" 
        name="featured" 
        value="no" 
        className="w-4 h-4 accent-zinc-900"
      /> No
    </label>
  </div>
</div>

<div className="flex-col flex gap-2">
  <label className="text-xl">Active</label>
  <div className="flex gap-4 items-center">
    <label className="flex items-center gap-2">
      <input 
        type="radio" 
        name="active" 
        value="yes" 
        className="w-4 h-4 accent-zinc-900"
        required
      /> Yes
    </label>
    <label className="flex items-center gap-2">
      <input 
        type="radio" 
        name="active" 
        value="no" 
        className="w-4 h-4 accent-zinc-900"
      /> No
    </label>
  </div>
</div>


            <div className="flex-col flex gap-4">
              <label htmlFor="productName" className="text-xl">Product Brand</label>
            <select 
            name="brand" 
            id="brand" 
            className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 appearance-none"
            >
            <option value="" className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 " selected>Select a Brand</option>
            </select>

</div>

        
        
        </div>
        <div className="flex justify-center mx-auto items-center">
            <button 
          type="submit" 
          className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-2/6 "
        >
          Add
        </button>
        </div>
        
      </form>
    </div>
  );
}
