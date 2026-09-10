import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from "./ui/carousel"
const Carouseel = ()=>{
    const items=["Frontend","Backend","Fullstack","Devops"]
    return(
        <div className="mt-20">
            <Carousel className="w-full mx-auto max-w-md">
                <CarouselContent>
                    {items.map((item)=>{
                       return <CarouselItem className="basis-1/2">
                        <button className="">{item}</button>
                        </CarouselItem>
                    })}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}
export default Carouseel