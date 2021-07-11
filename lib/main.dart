import 'package:GranApp/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:GranApp/dummy_data.dart';
import 'package:GranApp/screens/product_detail_screen.dart';
import 'screens/shops_screen.dart';
import 'screens/shop_products_screen.dart';

import 'screens/tabs_screen.dart';
import 'models/product.dart';

import 'Login.dart';

import 'screens/login_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  List<Product> _wishlistProducts = [];

  void _toggleWishlist(String productId) {
    // metoda koja ce ili dodati ili ukloniti sa wishliste (toggle)
    final existingIndex =
        _wishlistProducts.indexWhere((product) => product.id == productId);
    if (existingIndex >= 0) {
      setState(() {
        _wishlistProducts.removeAt(existingIndex);
      });
    } else {
      setState(() {
        _wishlistProducts.add(
            DUMMY_PRODUCTS.firstWhere((product) => product.id == productId));
      });
    }
  }

  bool _isProductOnWishlist(String id) {
    return _wishlistProducts.any((product) => product.id == id);
  }

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
        '/': (ctx) => TabsScreen(_wishlistProducts),
        ShopProductsScreen.routeName: (ctx) => ShopProductsScreen(),
        ProductDetailsScreen.routeName: (ctx) =>
            ProductDetailsScreen(_toggleWishlist, _isProductOnWishlist),
      },
    );
  }
}
