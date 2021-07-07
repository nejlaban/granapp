import 'package:flutter/material.dart';
import '../dummy_data.dart';
import '../widgets/shop_item.dart';

class ShopsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GranApp'),
      ),
      body: GridView(
        padding: const EdgeInsets.all(25),
        children: DUMMY_SHOPS
            .map(
              (shpData) => ShopItem(
                shpData.id,
                shpData.title,
                shpData.color,
              ),
            )
            .toList(),
        gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 200,
          childAspectRatio: 3 / 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
        ),
      ),
    );
  }
}
