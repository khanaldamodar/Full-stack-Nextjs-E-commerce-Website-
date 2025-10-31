export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-6">
      <form className="bg-zinc-800 rounded-xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-lg">
        <h1 className="text-2xl text-white font-bold text-center mb-4">Add Product</h1>
        
        <input 
          type="text" 
          id="productName" 
          name="productName" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Product Name"
        />
        
        <input 
          type="text" 
          id="productDescription" 
          name="productDescription" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Product Description"
        />
        
        <input 
          type="text" 
          id="price" 
          name="price" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Price"
        />
        
        <input 
          type="text" 
          id="stock" 
          name="stock" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Stock"
        />
        
        <input 
          type="text" 
          id="sku" 
          name="sku" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="SKU"
        />
        
        <select 
            name="category" 
            id="category" 
            className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 appearance-none"
            >
            <option value=""  selected>Select a Category</option>
            </select>

            <select 
            name="brand" 
            id="brand" 
            className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 appearance-none"
            >
            <option value="" className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 " selected>Select a Brand</option>
            </select>


        <input 
          type="text" 
          id="weight" 
          name="weight" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Weight"
        />

        <input 
          type="file" 
          id="gallery" 
          name="gallery" 
          className="p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
        />

        <button 
          type="submit" 
          className="mt-4 bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-3 rounded-2xl transition-all duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
