import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Slider = () => {
    return (
        <Swiper slidesPerView={4} spaceBetween={20} centeredSlides={true} modules={[Pagination]} pagination={{ clickable: true }}  >
            <SwiperSlide>
                <img src={slide1} className='w-full rounded-lg' alt="slide1" />
                <p className='text-xl text-white shadow -mt-10 text-center'>Salads</p>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide2} className='w-full rounded-lg' alt="slide2" />
                <p className='text-xl text-white shadow -mt-10 text-center'>Pizza</p>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3} className='w-full rounded-lg' alt="slide3" />
                <p className='text-xl text-white shadow -mt-10 text-center'>Soups</p>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide4} className='w-full rounded-lg' alt="slide4" />
                <p className='text-xl text-white shadow -mt-10 text-center'>Dessert</p>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide5} className='w-full rounded-lg' alt="slide5" />
                <p className='text-xl text-white shadow -mt-10 text-center'>Drinks</p>
            </SwiperSlide>

        </Swiper>
    );
};

export default Slider;