import 'package:flutter/material.dart';

import '../models/product.dart';
import '../widgets/product_item.dart';

class WishlistScreen extends StatelessWidget {
  final List<Product> wishlistProducts;

  WishlistScreen(this.wishlistProducts);

  @override
  Widget build(BuildContext context) {
    if (wishlistProducts.isEmpty) {
      return Center(
        child: Text('You have no products on your wishlist yet'),
      );
    } else {
      return ListView.builder(
        itemBuilder: (ctx, index) {
          // return Text(shopProducts[index].title);
          return ProductItem(
              id: wishlistProducts[index].id,
              title: wishlistProducts[index].title,
              price: wishlistProducts[index].price,
              imageUrl: wishlistProducts[index].imageUrl);
        },
        itemCount: wishlistProducts.length,
      );
    }
  }
}
