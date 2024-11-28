function ProductHeader() {
  return (
    <>
      <div className=" flex-1 flex flex-col">
        <h3 className=" mb-4 font-bold text-4xl text-indigo-600">Products</h3>
        <button>Add product</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </>
  );
}
export default ProductHeader;
