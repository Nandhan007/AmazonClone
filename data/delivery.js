export const DeliveryOptions = [{
    id: '1',
    DeliveryDays: 7,
    DeliveryPrice: 0
},{
    id: '2',
    DeliveryDays: 3,
    DeliveryPrice: 499
},{
    id: '3',
    DeliveryDays: 0,
    DeliveryPrice: 999
}]

export function getDeliverySummary(Deliveryid){
    let DeliveryOption;
    DeliveryOptions.forEach((option)=>{
        if(option.id === Deliveryid){
          DeliveryOption = option;
        }
       })
    return DeliveryOption;
}