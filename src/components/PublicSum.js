


const PublicSum = ({guestCart}) => {

    const sumAll = guestCart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
    console.log(sumAll);
    return (
        <div>
<p className="text-2xl font-medium tracking-tight">Total: ${sumAll}</p>
        </div>
    )
}

export default PublicSum