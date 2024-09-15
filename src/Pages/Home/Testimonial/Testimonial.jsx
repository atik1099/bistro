import { Rating } from '@smastrom/react-rating'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';


const Testimonial = ({reviews}) => {

  
    return (
        <div className='my-16'>
            
            <h2 className='text-8xl text-center font-bold'>❝</h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews?.map(review => 
                    <SwiperSlide key={review._id} className='text-center px-5'>
                        <Rating value={review?.rating} readOnly style={{ maxWidth: 200 }} className='mx-auto mb-5'></Rating>
                        <h2 className='text-xl mb-5 w-[85%] mx-auto'>{review.details}</h2>
                        <p className='text-2xl font-bold text-[#BB8506]'>{review.name}</p>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;