export default function currencyFormat(
  price,
  {
    currency = "NGN",
    maximumFractionDigits = 0,
    style= "currency",
  } = {}
) {
  let naira = Intl.NumberFormat("en-US", {
    style,
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits,
  });
  return naira.format(price);
}
