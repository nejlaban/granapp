import 'package:flutter/material.dart';

import 'shops_screen.dart';
import 'wishlist_screen.dart';

class TabsScreen extends StatefulWidget {
  @override
  _TabsScreenState createState() => _TabsScreenState();
}

class _TabsScreenState extends State<TabsScreen> {
/*   final List<Widget> _pages = [
    CategoriesScreen(),
    FavoritesScreen(),
  ]; */

  final List<Map<String, Object>> _pages = [
    {'page': ShopsScreen(), 'title': 'Shops'},
    {'page': WishlistScreen(), 'title': 'Your wishlist items'},
  ];

  int _selectedPageIndex = 0;

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
          BottomNavigationBarItem(
              icon: Icon(Icons.category), title: Text('Shops')),
          BottomNavigationBarItem(
              icon: Icon(Icons.star), title: Text('Wishlist')),
        ],
      ),
    );
  }
}
