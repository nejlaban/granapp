/**
 * @swagger
 * definitions:
 *      Store:
 *          type: object
 *          properties:
 *              name: 
 *                  type: string
 *                  example: Konzum
 *              address:
 *                  type: string,
 *                  example: Mala aleja 72, Ilidža
 *              city:
 *                  type: string,
 *                  example: Sarajevo
 *              lat:
 *                  type: number
 *                  format: double
 *                  example: 43.8306965
 *              lon:
 *                  type: number
 *                  format: double
 *                  example: 18.3064799
 *              working_hours: 
 *                  type: object
 *                  example: {'days':'every day'}
 *              picture:
 *                  type: string
 *                  example: http://www.konzum.co.ba/var/plain_site/storage/images/o-konzumu/novosti/super-konzum-na-ilidzi-u-novom-ambijentu-docekao-i-obradovao-brojne-kupce/40407517-1-cro-HR/Super-Konzum-na-Ilidzi-u-novom-ambijentu-docekao-i-obradovao-brojne-kupce_article_full.jpg
 *              payment_method:
 *                  type: object
 *                  properties:
 *                      cash:
 *                          type: integer
 *                      credit_card:
 *                          type: integer
 *              loyalty_program:
 *                  type: object                      
 *              required:
 *                  - name
 *                  - address
 *                  - city
 *                  - lat
 *                  - lon       
 */