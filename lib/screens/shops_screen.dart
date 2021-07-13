import 'package:flutter/material.dart';
import '../dummy_data.dart';
import '../widgets/shop_item.dart';

class ShopsScreen extends StatelessWidget {
  static const routeName = '/shops';

  @override
  Widget build(BuildContext context) {
    return GridView(
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
    );
  }
}
