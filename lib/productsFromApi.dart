import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProductsFromAPI extends StatefulWidget {
  @override
  _ProductsFromAPIState createState() => _ProductsFromAPIState();
}

class _ProductsFromAPIState extends State<ProductsFromAPI> {
  Future getProductData() async {
    var response = await http.get(
        Uri.https('desolate-fortress-18432.herokuapp.com', 'all_products'));
    var jsonData = jsonDecode(response.body);
    List<Product2> products = [];

    for (var p in jsonData) {
      Product2 product = Product2(p["name"], p["bar_code"], p["description"]);
      products.add(product);
    }
    print(products.length);
    return products;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Center(child: Text('All products data')),
        ),
        body: Container(
          child: Card(
            child: FutureBuilder(
              future: getProductData(),
              builder: (context, snapshot) {
                if (snapshot.data == null) {
                  return Container(
                    child: Center(
                      child: Text('Loading...'),
                    ),
                  );
                } else {
                  return ListView.builder(
                      itemCount: snapshot.data.length + 1,
                      itemBuilder: (context, i) {
                        return ListTile(
                          title: Text(snapshot.data[i].name),
                          //subtitle: Text(snapshot.data[i].bar_code),
                          // trailing: Text(snapshot.data[i].description),
                        );
                      });
                }
              },
            ),
          ),
        ));
  }

  searchBar() {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: TextField(
        decoration: InputDecoration(hintText: 'Search...'),
      ),
    );
  }
}

class Product2 {
  final String name, bar_code, description;

  Product2(this.name, this.bar_code, this.description);
}
