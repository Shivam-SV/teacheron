export default function Ratings({value, length, size}){
    const startsUntil = Math.floor(value);
    const HavePrecision = (value * 10 % 10) > 0;
    const starSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];
    const starSize = starSizes.includes(size) ? size : 'base';
    return (
        <span>
            {[...Array(length ?? 5).keys()].map(i => {
                console.log(value);
                let cls;
                if(i < startsUntil) cls = "bxs-star";
                else if(i === startsUntil){
                    if(HavePrecision) cls = 'bxs-star-half';
                    else cls = "bxs-star";
                }else cls = 'bx-star';
                return <i key={i} className={`bx text-yellow-400 text-${starSize} ${cls}`}></i>
            })}
        </span>
    )
}
