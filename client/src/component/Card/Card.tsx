
export interface CardProps{
    imgUrl: string,
    description: string,
    price: number,
    discount: number,
    name: string
}

const Card = (props: CardProps) => {
    
    return(
        <div class='shadow-md mb-4'>
            <div class='w-48 h-60 object-contain'>
                <img src={props?.imgUrl} alt='not found' class="rounded"/>
            <div class='font-semibold pl-1 pr-1'>
                {props.description}
            </div>
            <div>
                <div class='float-left pl-1 text-rose-600 font-bold'>{props.discount}%</div>
                <div class='float-right font-bold pr-1'>{props.price}&nbsp;<span class='font-semibold'>{props.name}</span></div> 
            </div>
            </div>
        </div>
    )
}

export default Card;