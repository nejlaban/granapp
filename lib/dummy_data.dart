import 'package:flutter/material.dart';
import 'package:GranApp/models/product.dart';

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
      title: 'Naše mlijeko 1l',
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
      imageUrl: 'https://sagro.ba/4-large_default/ulje-bimal-fino-151-pet.jpg'),
  Product(
      id: 'p4',
      categories: [
        's1',
        's2',
        's3',
      ],
      title: 'ABC svježi sir 500g',
      price: '6.75 KM',
      imageUrl:
          'https://jatrgovac.com/usdocs/Belje-ABC-Svjezi-sir-500ml-ok.jpg'),
  Product(
      id: 'p5',
      categories: [
        's1',
        's3',
      ],
      title: 'Bajadera 300g Kraš',
      price: '13.35 KM',
      imageUrl:
          'https://www.kras.hr/datastore/imagestore/800x800/800x800_1505376105Bajadera-100g.png?v=1505376106'),
  Product(
      id: 'p6',
      categories: [
        's2',
        's3',
      ],
      title: 'Cappuccino čokolada 114g Franck',
      price: '3.6 KM',
      imageUrl:
          'https://res.cloudinary.com/agency404/image/upload/w_390,ar_1:1,g_auto,q_auto,c_fill,f_auto/v1521732739/apxnmnllvxchcpmy7qha'),
  Product(
      id: 'p7',
      categories: [
        's1',
        's3',
      ],
      title: 'Jogurt 2,0%mm 1L Milkos',
      price: '1.85 KM',
      imageUrl:
          'data:image/jpeg;base64,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'),
];
