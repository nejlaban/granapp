import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'http_exception.dart';

class Authentication with ChangeNotifier {
  Future<void> signUp(String email, String password) async {
    // final url =
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAVoocqBR2Vj_Nw4uHU73fJRrIVG9VbqGY';
    Uri url = Uri.parse(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVoocqBR2Vj_Nw4uHU73fJRrIVG9VbqGY');

    try {
      final response = await http.post(url,
          body: json.encode({
            'email': email,
            'password': password,
            'returnSecureToken': true
          }));
      final responseData = json.decode(response.body);
      // print(responseData);

      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }
    } catch (error) {
      throw error;
    }
  }

  Future<void> logIn(String email, String password) async {
    // final url =
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAVoocqBR2Vj_Nw4uHU73fJRrIVG9VbqGY';
    Uri url = Uri.parse(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVoocqBR2Vj_Nw4uHU73fJRrIVG9VbqGY');

    try {
      final response = await http.post(url,
          body: json.encode({
            'email': email,
            'password': password,
            'returnSecureToken': true
          }));
      final responseData = json.decode(response.body);
      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }
      // print(responseData);
    } catch (error) {
      throw error;
    }
  }
}
