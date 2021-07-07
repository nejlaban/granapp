import 'package:flutter/material.dart';
import 'package:ponedjeljak/widgets/product_item.dart';

import '../models/product.dart';
import '../dummy_data.dart';

class ShopProductsScreen extends StatelessWidget {
  static const routeName = '/shop-products';

/*   final String shopId;
  final String shopTitle;

  ShopProductsScreen(this.shopId, this.shopTitle); */

  @override
  Widget build(BuildContext context) {
    final routeArgs =
        ModalRoute.of(context).settings.arguments as Map<String, String>;
    final shopTitle = routeArgs['title'];
    final shopId = routeArgs['id'];

    final shopProducts = DUMMY_PRODUCTS.where((product) {
      return product.categories.contains(shopId);
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(shopTitle),
      ),
      body: ListView.builder(
        itemBuilder: (ctx, index) {
          // return Text(shopProducts[index].title);
          return ProductItem(
              title: shopProducts[index].title,
              price: shopProducts[index].price);
        },
        itemCount: shopProducts.length,
      ),
    );
  }
}
