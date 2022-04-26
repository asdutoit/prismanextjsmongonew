import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import Image from "next/image";
import "@splidejs/react-splide/css";

const images = [
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1650852706530-3192c48137c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=500&w=800&q=80",
];

export default function SplideCarousel() {
  return (
    <Splide
      options={{ rewind: true, lazyLoad: "nearby" }}
      aria-label="React Splide Example"
    >
      {images.map((src, idx) => (
        <SplideSlide key={idx}>
          {/* <img src={src} alt={idx} /> */}
          {/* <img data-splide-lazy={src} alt={idx} /> */}
          <Image
            src={src}
            height={188}
            width={300}
            layout="responsive"
            alt="cover image"
            placeholder="blur"
            blurDataURL={src}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
