export default function Coin({ price, size }){
    const sizes = {xs: "text-xs", sm: "text-sm", md: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl", "3xl": "text-3xl", '4xl': "text-4xl"};
    const selectedSize = sizes[size] || sizes["lg"];
    const formatedPrice = !isNaN(parseInt(Math.abs(price).toString().split('.')[1])) ? Math.abs(price).toFixed(2) : Math.abs(price);
    return (
        <>
            <i class={"bx bxs-dollar-circle text-yellow-400 " + selectedSize}></i>
            {formatedPrice}
        </>
    );
}
