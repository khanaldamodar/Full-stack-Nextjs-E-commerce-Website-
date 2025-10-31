export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-3 gap-6 bg-zinc-800">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-2">Add Payment</h1>
      <form className=" ">
        <div className="rounded-xl p-2 gap-4 shadow-lg grid grid-cols-3 w-full">
          
        <div className="flex-col flex gap-4">
          <label htmlFor="orderId" className="text-xl">Order ID</label>
        <input 
          type="text" 
          id="orderId" 
          name="orderId" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Order ID"
        />
        </div>
        
        <div className="flex-col flex gap-4">
        <label htmlFor="productDescription" className="text-xl">Amount</label>  
        <input 
          type="text" 
          id="amount" 
          name="amount" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Amount"
        />
        
        </div>
<div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Payment Method</label>
        <input 
          type="text" 
          id="method" 
          name="method" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Payment Method"
        />
        
        </div>

        

        <div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Transition Id</label>
        <input 
          type="text" 
          id="transitionId" 
          name="transitionId" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Transition Id"
        />

</div>


        <div className="flex-col flex gap-4">
  <label htmlFor="productName" className="text-xl">Payment Date</label>
        <input 
          type="date" 
          id="payementDate" 
          name="paymentDate" 
          required 
          className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900" 
          placeholder="Payment Date"
        />

</div>
        
        
        </div>
        <div className="flex justify-center mx-auto items-center pb-2">
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
