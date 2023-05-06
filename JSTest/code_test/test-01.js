const test = [
    {
        service_id: "222", service_name: "Cargo", seller_type: 2, booking_type: 1,
    },
    {
        service_id: "1111", service_name: "Cargo", seller_type: 2, booking_type: 1,
    },
]
const test02 = ['1111']

const result = test.map(item => {
    return {
        service_id: item.service_id,
        service_name: item.service_name
    };
})

console.log(result)