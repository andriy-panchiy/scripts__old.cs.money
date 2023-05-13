buff_csm_platform_diff = 1.68013468; // csm price AK-47 | Redline (Field-Tested) / buff price AK-47 | Redline (Field-Tested)
currency_cny_dollar = 6.9582; // 1$ = 6.9582¥
buff_buys = {} // https://buff.163.com/api/market/buy_order/history?game=csgo&page_num=1&page_size=1000&state=success

buff_buys = buff_buys.data.items.map((item) => {
  item.goods_infos = buff_buys.data.goods_infos[item.goods_id];
  return item;
});

purchasesSales._arrayPurchases
  .filter(({ status, update_time }) => {
    let dateStart = new Date("04.10.2023").getTime(); // month.day.year
    let dateFinish = new Date("05.10.2023").getTime(); // month.day.year
    let dateSold = new Date(update_time * 1000).getTime();
    return status === "sold" && dateStart < dateSold && dateSold < dateFinish;
  })
  .reduce((acc, item) => {
    const buff_item = buff_buys.find((history) => history.asset_info?.paintwear.slice(0, 10).includes(`${item.floatvalue}`.slice(0, 10)));
    if (buff_item) {
      acc.push({ csm: item, buff: buff_item });
    } else {
      acc.push({ csm: item });
    }
    return acc;
  }, [])
  .map((item) => {
    let difference;
    let def = item.csm?.price || skinsBaseList[730][item.name_id].a;
    const csm_price = item.csm.custom_price - item.csm.fee;
    if (item.buff) {
      const buff_price = (item.buff.price * buff_csm_platform_diff) / currency_cny_dollar;
      difference = +(csm_price - buff_price).toFixed(2);
      def = Math.min(item.csm?.price || skinsBaseList[730][item.name_id].a, item.buff.price);
    } else {
      difference = +csm_price.toFixed(2);
    }

    let profit = difference - def;

    return profit;
  })
  .reduce((sum, num) => sum + num, 0);