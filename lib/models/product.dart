import 'package:flutter/foundation.dart';

class Product {
  final String id;
  final List<String> categories; // list of categoryIds
  final String title;
  final String price;
  final String imageUrl;

  const Product(
      {@required this.id,
      @required this.categories,
      @required this.title,
      @required this.price,
      @required this.imageUrl});
}
