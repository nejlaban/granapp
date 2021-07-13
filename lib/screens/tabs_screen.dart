import 'package:GranApp/screens/home_screen.dart';
import 'package:GranApp/screens/login_screen.dart';
import 'package:GranApp/screens/signup_screen.dart';
import 'package:flutter/material.dart';

import 'shops_screen.dart';
import 'wishlist_screen.dart';

import '../models/product.dart';

class TabsScreen extends StatefulWidget {
  //static const routeName = '/tabs';

  final List<Product> wishlistProducts;

  TabsScreen(this.wishlistProducts);

  @override
  _TabsScreenState createState() => _TabsScreenState();
}

class _TabsScreenState extends State<TabsScreen> {
/*   final List<Widget> _pages = [
    CategoriesScreen(),
    FavoritesScreen(),
  ]; */

  List<Map<String, Object>> _pages;

  int _selectedPageIndex = 0;

  @override
  initState() {
    _pages = [
      {'page': LoginScreen(), 'title': 'Login'},
      // {'page': SignupScreen(), 'title': 'Sign up'},

      {'page': ShopsScreen(), 'title': 'Shops'},
      {
        'page': WishlistScreen(widget.wishlistProducts),
        'title': 'Your wishlist items'
      },
    ];
  }

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_pages[_selectedPageIndex]['title']),
      ),
      //  body: _pages[_selectedPageIndex],
      body: _pages[_selectedPageIndex]['page'],

      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        backgroundColor: Theme.of(context).primaryColor,
        unselectedItemColor: Colors.white,
        selectedItemColor: Theme.of(context).accentColor,
        currentIndex: _selectedPageIndex,
        // type: BottomNavigationBarType.shifting,

        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('Homee')),
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_cart), title: Text('Shops')),
          BottomNavigationBarItem(
              icon: Icon(Icons.favorite), title: Text('Wishlist')),
        ],
      ),
    );
  }
}
