export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-zinc-800 p-4">
      <h1 className="text-3xl text-white font-bold text-center mb-4">Add Product</h1>

      <form className="w-full max-w-4xl bg-zinc-700 rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* Product Brand */}
        <div className="flex flex-col gap-2">
          <label htmlFor="brand" className="text-xl text-white">Product Brand</label>
          <select 
            id="brand" 
            name="brand" 
            className="w-full p-3 bg-zinc-900 text-white rounded-2xl outline-none focus:ring-2 focus:ring-zinc-500 appearance-none"
            required
          >
            <option value="" disabled selected>Select a Brand</option>
          </select>
        </div>

        {/* Payment Mode */}
        <div className="flex flex-col gap-2">
          <label className="text-xl text-white">Payment Mode</label>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 text-white">
              <input 
                type="radio" 
                name="payment" 
                value="COD" 
                className="w-4 h-4 accent-zinc-500"
                required
              /> COD
            </label>
            <label className="flex items-center gap-2 text-white">
              <input 
                type="radio" 
                name="payment" 
                value="Online" 
                className="w-4 h-4 accent-zinc-500"
              /> Online
            </label>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-xl text-white">Quantity</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            placeholder="Quantity"
            required
            className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        {/* Shipping Address */}
        <div className="flex flex-col gap-2 md:col-span-3">
          <label htmlFor="shippingAddress" className="text-xl text-white">Shipping Address</label>
          <input 
            type="text" 
            id="shippingAddress" 
            name="shippingAddress" 
            placeholder="Shipping Address"
            required
            className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-500 w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 flex justify-center mt-2">
          <button 
            type="submit"
            className="bg-white hover:bg-zinc-100 text-black font-bold py-3 px-10 rounded-2xl transition-all duration-200"
          >
            Add
          </button>
        </div>

      </form>
    </div>
  );
}
