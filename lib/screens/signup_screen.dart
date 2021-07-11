import 'package:GranApp/screens/login_screen.dart';
import 'package:flutter/material.dart';

class SignupScreen extends StatefulWidget {
  static const routeName = '/signup';

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  TextEditingController _passwordCOntroller = new TextEditingController();

  void _submit() {}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: <Widget>[
          FlatButton(
            child: Row(
              children: <Widget>[Text('Login  '), Icon(Icons.person)],
            ),
            textColor: Colors.white,
            onPressed: () {
              Navigator.of(context).pushReplacementNamed(LoginScreen.routeName);
            },
          )
        ],
      ),
      body: Stack(
        children: <Widget>[
          Container(
            color: Colors.lightGreen,
          ),
          Center(
            child: Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0)),
              child: Container(
                height: 300,
                width: 300,
                padding: EdgeInsets.all(16),
                child: Form(
                    key: _formKey,
                    child: SingleChildScrollView(
                      child: Column(
                        children: <Widget>[
                          TextFormField(
                            decoration: InputDecoration(
                              labelText: 'Email',
                            ),
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value.isEmpty || !value.contains('@'))
                                return 'invalid email';
                              return null;
                            },
                            onSaved: (value) {},
                          ),
                          // password
                          TextFormField(
                            decoration: InputDecoration(labelText: 'Password'),
                            obscureText: true,
                            controller: _passwordCOntroller,
                            validator: (value) {
                              if (value.isEmpty || value.length <= 5)
                                return 'invalid password';
                              return null;
                            },
                            onSaved: (value) {},
                          ),

                          // confirm the password
                          TextFormField(
                            decoration: InputDecoration(
                                labelText: 'Confirm the password'),
                            obscureText: true,
                            validator: (value) {
                              if (value.isEmpty ||
                                  value != _passwordCOntroller.text)
                                return 'invalid password';
                              return null;
                            },
                            onSaved: (value) {},
                          ),
                          SizedBox(
                            height: 30,
                          ),
                          RaisedButton(
                            child: Text('Submit'),
                            onPressed: () {
                              _submit();
                            },
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(30)),
                            color: Colors.blue,
                            textColor: Colors.white,
                          )
                        ],
                      ),
                    )),
              ),
            ),
          )
        ],
      ),
    );
  }
}
