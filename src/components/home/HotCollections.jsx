import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/react-slick.css";
import axios from "axios";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import useSlidesToShow from "./useSlidesToShow";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import SkeletonLoader from "../UI/SkeletonLoader";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slidesToShow = useSlidesToShow();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once:true,
      mirror: false,
    });
  }, []);
  
  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  )

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="collections" data-aos="fade-up"className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
             <div className="col-lg-12">
              {loading ? (
                <SkeletonLoader count={slidesToShow}
                  type="hotcollection"
                  settings={settings}
                 />
              ) : (

              <div className="slider-container">
                <Slider {...settings}>
                  {data.map((nft, index) => (
                    <div key={index} className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt={nft.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt={`${nft.title} author`}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>ERC-{nft.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              )}
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections; 