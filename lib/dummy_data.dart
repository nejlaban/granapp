import 'package:flutter/material.dart';
import 'package:ponedjeljak/models/product.dart';

import 'models/shop.dart';

const DUMMY_SHOPS = const [
  Shop(
    id: 's1',
    title: 'Bingo',
    color: Colors.green,
  ),
  Shop(
    id: 's2',
    title: 'Amko Komerc',
    color: Colors.blue,
  ),
  Shop(
    id: 's3',
    title: 'Konzum',
    color: Colors.red,
  ),
];

const DUMMY_PRODUCTS = const [
  Product(
      id: 'p1',
      categories: [
        's1',
        's2',
      ],
      title: 'Mlijeko'),
  Product(
      id: 'p2',
      categories: [
        's1',
        's2',
      ],
      title: 'Šećer'),
  Product(
      id: 'p3',
      categories: [
        's1',
        's2',
      ],
      title: 'Ulje'),
];
