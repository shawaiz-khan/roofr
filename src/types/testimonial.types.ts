export interface TestimonialTypes {
    _id: number,
    name: string,
    location: string,
    title: string,
    review: string,
    stars: number,
}

export interface TestimonialProps {
    name: string,
    city: string,
    title: string,
    testimonial: string,
    stars: number,
}