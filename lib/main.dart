import 'package:GranApp/domain/user.dart';
import 'package:GranApp/providers/auth_provider.dart';
import 'package:GranApp/providers/user_provider.dart';
import 'package:GranApp/screens/dashboard.dart';
import 'package:GranApp/screens/login.dart';
import 'package:GranApp/screens/register.dart';
import 'package:GranApp/utility/shared_preference.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    Future<User> getUserData() => UserPreferences().getUser();

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider())
      ],
      child: MaterialApp(
        title: 'GranApp',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: FutureBuilder(
            future: getUserData(),
            builder: (context, snapshot) {
              switch (snapshot.connectionState) {
                case ConnectionState.none:
                case ConnectionState.waiting:
                  return CircularProgressIndicator();
                default:
                  if (snapshot.hasError)
                    return Text('Error: ${snapshot.error}');
                  else if (snapshot.data.token == null)
                    return Login();
                  else
                    Provider.of<UserProvider>(context).setUser(snapshot.data);
                  return DashBoard();
              }
            }),
        routes: {
          '/login/user': (context) => Login(),
          '/register/user': (context) => Register(),
          '/dashboard': (context) => DashBoard()
        },
      ),
    );
  }
}



/* import 'package:GranApp/productsFromApi.dart';
import 'package:GranApp/screens/home_screen.dart';
import 'package:GranApp/screens/signup_screen.dart';
import 'package:flutter/material.dart';
import 'package:GranApp/dummy_data.dart';
import 'package:GranApp/screens/product_detail_screen.dart';
import 'screens/shops_screen.dart';
import 'screens/shop_products_screen.dart';

import 'screens/tabs_screen.dart';
import 'models/product.dart';

import 'Login.dart';

import 'screens/login_screen.dart';

import 'package:provider/provider.dart';

import 'models/authentication.dart';

import 'screens/auth_screen.dart';
import 'productsFromApi.dart';

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
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: Authentication(),
        )
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'GranApp',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          accentColor: Colors.amber,
        ),
        home: ProductsFromAPI(),
        // initialRoute: '/',
        routes: {
          // '/': (ctx) => AuthScreen(),
          // '/home': (ctx) => TabsScreen(_wishlistProducts),
          ShopProductsScreen.routeName: (ctx) => ShopProductsScreen(),
          ProductDetailsScreen.routeName: (ctx) =>
              ProductDetailsScreen(_toggleWishlist, _isProductOnWishlist),
          SignupScreen.routeName: (ctx) => SignupScreen(),
          LoginScreen.routeName: (ctx) => LoginScreen(),
          // HomeScreen.routeName: (ctx) => HomeScreen(),
          // TabsScreen.routeName: (ctx) => TabsScreen(_wishlistProducts),
        },
      ),
    );
  }
}
 */