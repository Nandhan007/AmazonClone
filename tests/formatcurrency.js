function formatcurrency(number){
    return (Math.round(number)/100).toFixed(2)
}
console.log(formatcurrency(2000.5))