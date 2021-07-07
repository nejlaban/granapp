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
      title: 'Mlijeko',
      price: '1.5 KM',
      imageUrl:
          'https://sagro.ba/804-large_default/nase-mlijeko-28mm-121-pkt.jpg'),
  Product(
      id: 'p2',
      categories: [
        's1',
      ],
      title: 'Šećer',
      price: '1.8 KM',
      imageUrl:
          'https://sagro.ba/934-large_default/secer-kocka-11-agragold-121.jpg'),
  Product(
      id: 'p3',
      categories: [
        's1',
        's2',
        's3',
      ],
      title: 'Ulje',
      price: '2.3 KM',
      imageUrl: 'https://sagro.ba/4-large_default/ulje-bimal-fino-151-pet.jpg')
];
