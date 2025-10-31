

export default function Page() {
  return (
    <div className="flex flex-col gap-4 mx-auto mt-10 justify-center items-center">
      
      <form className="bg-zinc-600 rounded-xl w-2/5 flex flex-col gap-4 mx-auto mt-10 justify-center items-center">
      <h1 className="text-2xl text-black just font-bold p-4">Add Product</h1>
        <div className="flex flex-col p-3">
          
          <input type="text" id="name" name="name" required className="w-full p-3 bg-zinc-900 outline-1 outline-zinc-900 rounded-2xl gap-2 " placeholder="Product Name"/>
        </div>
                
      </form>
    </div>
  );
}
