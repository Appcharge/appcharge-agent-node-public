class ProductRequest {
  amount;
  sku;
  name;

  static fromJson(data) {
    return Object.assign(new ProductRequest(), data);
  }
}

class UpdateBalanceRequest {
  appChargePaymentId;
  purchaseDateAndTimeUtc;
  gameId;
  playerId;
  bundleName;
  bundleId;
  sku;
  priceInCents;
  priceInDollar;
  currency;
  subTotal;
  tax;
  action;
  actionStatus;
  products;

  static fromJson(data) {
    const products = data.products;
    delete data.products;

    const instance = Object.assign(new UpdateBalanceRequest(), data);
    instance.products = products.map((product) =>
      ProductRequest.fromJson(product)
    );

    return instance;
  }
}

exports.UpdateBalanceRequest = UpdateBalanceRequest;
