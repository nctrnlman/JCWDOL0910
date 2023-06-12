{
  latest_products.map((latest_product) => {
    return (
      <div className="card bg-white w-[200px] h-[350px] m-2 rounded-lg shadow-lg">
        <div className="top">
          <img
            className="w-[200px] h-[200px] object-cover  p-2"
            src={latest_product.product_image_url}
            alt="img"
          />
        </div>
        <div className="bottom flex flex-col justify-center items-start p-3 bg-">
          <div className="title font-semibold text-xs my-1">
            {latest_product.product_name}
          </div>
          <div className="category text-xs font-light my-1">
            {latest_product.product_description}
          </div>

          <div className="pricing flex items-center">
            {" "}
            <div className="price ">{latest_product.product_price}</div>
            {/* <div className="ml-2 text-xs ">
                        $<del>1320</del>
                      </div> */}
          </div>
          <div className="flex items-center my-2">
            <button className="border px-3 py-1 text-xs rounded-lg mr-1 ">
              Buy Now
            </button>
            <button className="border px-3 py-1 text-xs rounded-lg ">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  });
}
