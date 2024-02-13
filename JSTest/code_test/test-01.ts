// const test = [
//     {
//         service_id: "222", service_name: "Cargo", seller_type: 2, booking_type: 1,
//     },
//     {
//         service_id: "1111", service_name: "Cargo", seller_type: 2, booking_type: 1,
//     },
// ]
// const test02 = ['1111']

// const result = test.map(item => {
//     return {
//         service_id: item.service_id,
//         service_name: item.service_name
//     };
// })

// console.log(result)

// const INFORMATION_CONFIG = {
//     sections: [
//         {
//             title: 'Key Information Double Check',
//             column: 2,
//             fields: [],
//         },
//         {
//             title: 'Basic Information',
//             column: 2,
//             fields: [
//                 {
//                     label: 'Promotion Name',
//                     component: 'PromotionName',
//                 },
//                 {
//                     label: 'Period',
//                     component: 'ClaimPeriod',
//                 },
//                 {
//                     label: 'Country/Region',
//                     component: 'Country',
//                 },
//                 {
//                     label: 'Target User',
//                     component: 'TargetUser',
//                 },
//                 {
//                     label: 'Promotion Regions',
//                     component: 'PromotionRegions',
//                 },
//                 {
//                     label: 'Logistics Services',
//                     component: 'LogisticsServices',
//                 },
//                 {
//                     label: 'Target Channel',
//                     component: 'TargetChannel',
//                 },
//             ],
//         },
//         {
//             title: 'Subsidy Detail',
//             column: 2,
//             fields: [
//                 {
//                     label: 'Promotion Criteria',
//                     component: 'PromotionCriteria',
//                 },
//                 {
//                     label: 'Shipping Fee Discount Type',
//                     component: 'DiscountType',
//                 },
//                 {
//                     label: 'User Participation Restriction',
//                     component: 'ParticipationRestriction',
//                 },
//             ],
//         },
//         {
//             title: 'Event Scope',
//             column: 2,
//             fields: [
//                 {
//                     label: 'Scope',
//                     component: 'WhiteScope',
//                 },
//                 {
//                     label: 'Black Setting',
//                     component: 'BlackScope',
//                 },
//             ],
//         },
//     ],
// };
// INFORMATION_CONFIG.sections[3].fields.splice(0, 1)

// console.log(INFORMATION_CONFIG)

enum InnerViewType {
  ChouTiAdView = "ChouTiAdView",
  CenterAdView = "CenterAdView",
  FriendAdView = "FriendAdView",
  MainAdView = "MainAdView",
  BannerAdView = "BannerAdView",
  WatiingView = "WatiingView",
  TipView = "TipView",
}
for (const innertype in InnerViewType) {
  console.log(innertype);
}
