export default function Page() {
  return (
    <div className="flex items-center justify-center mx-auto ">
        <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-zinc-800 w-2/5 rounded p-5">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Add Brand</h1>
      <form className=" ">
        <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto ">
          
                <div className="flex-col flex gap-4">
                <label htmlFor="BrandName" className="text-xl">Brand Name</label>
                <input 
                type="text" 
                id="BrandName" 
                name="BrandName" 
                required 
                className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
                placeholder="Brand Name"
                />
                </div>


        </div>
        <div className="flex justify-center mx-auto items-center pb-2">
            <button 
          type="submit" 
          className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
        >
          Add
        </button>
        </div>
        
      </form>
    </div>
    </div>
  );
}
