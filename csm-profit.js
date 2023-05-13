purchasesSales._arrayPurchases.filter(({ status, update_time }) => {
    let dateStart  = new Date('01.10.2023').getTime(); // month.day.year
    let dateFinish = new Date('02.10.2023').getTime(); // month.day.year
    let dateSold = new Date(update_time * 1000).getTime();
    return status === 'sold' && dateStart < dateSold && dateSold < dateFinish;
}).map(({ custom_price, listing_price, fee }) => custom_price - listing_price - fee).reduce((sum, num) => sum + num, 0);
