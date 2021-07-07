import 'package:flutter/material.dart';
import 'package:ponedjeljak/screens/product_detail_screen.dart';
import 'screens/shops_screen.dart';
import 'screens/shop_products_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GranApp',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        accentColor: Colors.amber,
      ),
      // home: ShopsScreen(),
      // initialRoute: '/',
      routes: {
        '/': (ctx) => ShopsScreen(),
        ShopProductsScreen.routeName: (ctx) => ShopProductsScreen(),
        ProductDetailsScreen.routeName: (ctx) => ProductDetailsScreen(),
      },
    );
  }
}
