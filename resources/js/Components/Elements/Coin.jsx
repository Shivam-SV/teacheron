export default function Coin({ price, size }){
    const sizes = {xs: "text-xs", sm: "text-sm", md: "text-base", lg: "text-lg", xl: "text-xl"};
    const selectedSize = sizes[size] || sizes["lg"];
    return (
        <>
            <i class={"bx bxs-dollar-circle text-yellow-400 " + selectedSize}></i>
            {Math.abs(price)}
        </>
    );
}
