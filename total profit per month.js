purchasesSales._arrayPurchases.filter(item => {
    let month = 2678400000;
    let date1 = new Date().getTime() - month;
    let date2 = new Date(item.update_time * 1000).getTime();
    let daysLag = Math.ceil(Math.abs(date2 - date1) / (1000 * 3600 * 24));
    return item.status === 'sold' && daysLag <= 31;
}).map(item => (item.custom_price - item.custom_price / 100 * 7) - item.listing_price).reduce((partialSum, a) => partialSum + a, 0);
