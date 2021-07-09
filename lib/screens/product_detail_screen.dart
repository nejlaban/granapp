import 'package:flutter/material.dart';
import 'package:ponedjeljak/dummy_data.dart';

class ProductDetailsScreen extends StatelessWidget {
  static const routeName = '/product-detail';

  final Function toggleWishlist;
  final Function isOnWishlist;

  ProductDetailsScreen(this.toggleWishlist, this.isOnWishlist);

  Widget buildSectionTitle(BuildContext context, String text) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: Text(
        text,
        style: Theme.of(context).textTheme.title,
      ),
    );
  }

  Widget buildContainer(Widget child) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(10),
      ),
      margin: EdgeInsets.all(10),
      padding: EdgeInsets.all(10),
      height: 150,
      width: 300,
      child: child,
    );
  }

  @override
  Widget build(BuildContext context) {
    final productId = ModalRoute.of(context).settings.arguments as String;
    final selectedProduct =
        DUMMY_PRODUCTS.firstWhere((product) => product.id == productId);

    return Scaffold(
      appBar: AppBar(
        title: Text('${selectedProduct.title}'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Container(
              height: 300,
              width: double.infinity,
              child: Image.network(
                selectedProduct.imageUrl,
                fit: BoxFit.cover,
              ),
            ),
            buildSectionTitle(context, 'Price'),

            buildContainer(
              Text(selectedProduct.price),
            ),

            // buildSectionTitle(context, 'Steps'),
/*             buildContainer(
              ListView.builder(
                itemBuilder: (ctx, index) => Column(
                  children: [
                    ListTile(
                      leading: CircleAvatar(
                        child: Text('# ${(index + 1)}'),
                      ),
                      title: Text(
                        selectedMeal.steps[index],
                      ),
                    ),
                    Divider()
                  ],
                ),
                itemCount: selectedMeal.steps.length,
              ),
            ), */
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(
          isOnWishlist(productId) ? Icons.add_circle : Icons.add_circle_outline,
        ),
        onPressed: () => toggleWishlist(productId),
      ),
    );
  }
}
