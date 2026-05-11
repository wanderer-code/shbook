export function formatNumber(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}
