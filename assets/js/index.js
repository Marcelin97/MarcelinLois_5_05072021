export function priceToEuros(price){
    //We divide this price by 100 to transform the cents into euros
    price=price/100;
    //we return this new price by adding the euro symbol 
    return price+"€";
}
