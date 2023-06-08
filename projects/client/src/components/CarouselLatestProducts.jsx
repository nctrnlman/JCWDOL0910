import LatestProducts from "./LatestProducts";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function CarouselLatestProducts() {

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }


    return (
        <div className="relative">
            <div className="text-center py-4  text-xl font-bold">Carousel</div>
            <div className="absolute right-0 top-5 ">
                <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
                    <FiChevronLeft />
                </button>
                <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
                    <FiChevronRight />
                </button>
            </div>
            <div>
                <LatestProducts />
            </div>

        </div>
    );
}

export default CarouselLatestProducts;