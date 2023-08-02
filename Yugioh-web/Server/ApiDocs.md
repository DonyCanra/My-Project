# API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /`
- `GET /cards`
- `GET /cards/detail`
- `GET /cards/random`
- `GET /orders`
- `POST /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`
- `GET /histories`
- `POST /histories`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "password": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must been unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Format email is wrong"
}

```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjg2NjI4MTUyfQ.vlOgw-nH4gRVZR4yPPGsBCTZbuwF1RdWKARpXySwSo8"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email or Password is required"
}
```

&nbsp;

## 3. GET /

Description:

- Get all cards from rest api

Request:

_Response (200 - OK)_

```json
[
{
  "data": [
    {
      "id": 6983839,
      "name": "Tornado Dragon",
      "type": "XYZ Monster",
      "frameType": "xyz",
      "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
      "atk": 2100,
      "def": 2000,
      "level": 4,
      "race": "Wyrm",
      "attribute": "WIND",
      "card_sets": [
        {
          "set_name": "Battles of Legend: Relentless Revenge",
          "set_code": "BLRR-EN084",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.08"
        },
        {
          "set_name": "Duel Devastator",
          "set_code": "DUDE-EN019",
          "set_rarity": "Ultra Rare",
          "set_rarity_code": "(UR)",
          "set_price": "1.4"
        },
        {
          "set_name": "Maximum Crisis",
          "set_code": "MACR-EN081",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.32"
        }
      ],
      "card_images": [
        {
          "id": 6983839,
          "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
          "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
          "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.42",
          "tcgplayer_price": "0.48",
          "ebay_price": "2.99",
          "amazon_price": "0.77",
          "coolstuffinc_price": "0.99"
        }
      ]
    }
  ]
}
  ...,
]
```

&nbsp;

## 4. GET /cards

Description:

- Get all cards from database

Request:

_Response (200 - OK)_

```json
[
{
  "data": [
    {
      "id": 6983839,
      "name": "Tornado Dragon",
      "type": "XYZ Monster",
      "frameType": "xyz",
      "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
      "atk": 2100,
      "def": 2000,
      "level": 4,
      "race": "Wyrm",
      "attribute": "WIND",
      "card_sets": [
        {
          "set_name": "Battles of Legend: Relentless Revenge",
          "set_code": "BLRR-EN084",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.08"
        },
        {
          "set_name": "Duel Devastator",
          "set_code": "DUDE-EN019",
          "set_rarity": "Ultra Rare",
          "set_rarity_code": "(UR)",
          "set_price": "1.4"
        },
        {
          "set_name": "Maximum Crisis",
          "set_code": "MACR-EN081",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.32"
        }
      ],
      "card_images": [
        {
          "id": 6983839,
          "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
          "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
          "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.42",
          "tcgplayer_price": "0.48",
          "ebay_price": "2.99",
          "amazon_price": "0.77",
          "coolstuffinc_price": "0.99"
        }
      ]
    }
  ]
}
  ...,
]
```

&nbsp;

## 5. GET /cards/detail

Description:

- Get product from rest api by id

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "data": [
      {
        "id": 6983839,
        "name": "Tornado Dragon",
        "type": "XYZ Monster",
        "frameType": "xyz",
        "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
        "atk": 2100,
        "def": 2000,
        "level": 4,
        "race": "Wyrm",
        "attribute": "WIND",
        "card_sets": [
          {
            "set_name": "Battles of Legend: Relentless Revenge",
            "set_code": "BLRR-EN084",
            "set_rarity": "Secret Rare",
            "set_rarity_code": "(ScR)",
            "set_price": "4.08"
          },
          {
            "set_name": "Duel Devastator",
            "set_code": "DUDE-EN019",
            "set_rarity": "Ultra Rare",
            "set_rarity_code": "(UR)",
            "set_price": "1.4"
          },
          {
            "set_name": "Maximum Crisis",
            "set_code": "MACR-EN081",
            "set_rarity": "Secret Rare",
            "set_rarity_code": "(ScR)",
            "set_price": "4.32"
          }
        ],
        "card_images": [
          {
            "id": 6983839,
            "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
            "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
            "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
          }
        ],
        "card_prices": [
          {
            "cardmarket_price": "0.42",
            "tcgplayer_price": "0.48",
            "ebay_price": "2.99",
            "amazon_price": "0.77",
            "coolstuffinc_price": "0.99"
          }
        ]
      }
    ]
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 6. GET /cards/random

Description:

- Get random card from rest api

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "data": [
      {
        "id": 6983839,
        "name": "Tornado Dragon",
        "type": "XYZ Monster",
        "frameType": "xyz",
        "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
        "atk": 2100,
        "def": 2000,
        "level": 4,
        "race": "Wyrm",
        "attribute": "WIND",
        "card_sets": [
          {
            "set_name": "Battles of Legend: Relentless Revenge",
            "set_code": "BLRR-EN084",
            "set_rarity": "Secret Rare",
            "set_rarity_code": "(ScR)",
            "set_price": "4.08"
          },
          {
            "set_name": "Duel Devastator",
            "set_code": "DUDE-EN019",
            "set_rarity": "Ultra Rare",
            "set_rarity_code": "(UR)",
            "set_price": "1.4"
          },
          {
            "set_name": "Maximum Crisis",
            "set_code": "MACR-EN081",
            "set_rarity": "Secret Rare",
            "set_rarity_code": "(ScR)",
            "set_price": "4.32"
          }
        ],
        "card_images": [
          {
            "id": 6983839,
            "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
            "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
            "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
          }
        ],
        "card_prices": [
          {
            "cardmarket_price": "0.42",
            "tcgplayer_price": "0.48",
            "ebay_price": "2.99",
            "amazon_price": "0.77",
            "coolstuffinc_price": "0.99"
          }
        ]
      }
    ]
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 7. GET /orders

Description:

- Get all orders from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  [
    {
      "id": 1,
      "PlayerId": 1,
      "CardId": 2,
      "status": "Success",
      "createdAt": "2023-07-05T09:01:00.260Z",
      "updatedAt": "2023-07-05T09:10:50.556Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 2,
        "name": "YU-GI-OH Called Skull (Summoned Skull) - Ultra - MRD-G003 - Good",
        "imageUrl": "https://i.ebayimg.com/images/g/WqQAAOSwsj5jjj7B/s-l500.jpg",
        "price": 30,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    },
    {
      "id": 2,
      "PlayerId": 1,
      "CardId": 7,
      "status": "Success",
      "createdAt": "2023-07-05T09:02:22.106Z",
      "updatedAt": "2023-07-05T09:34:14.275Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 7,
        "name": "Yugioh! Exodia Set - All 5 Pieces - Ultra Rare New Holo Yugi Muto YGLD",
        "imageUrl": "https://i.ebayimg.com/images/g/tpgAAOSweZdkVqgz/s-l500.jpg",
        "price": 18,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    },
    {
      "id": 4,
      "PlayerId": 1,
      "CardId": 3,
      "status": "Success",
      "createdAt": "2023-07-05T09:34:31.114Z",
      "updatedAt": "2023-07-05T09:35:16.163Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 3,
        "name": "Yu-GI-OH The Winged Dragon of the Ra Ultra Rare YGLD-DEG03 God Card!",
        "imageUrl": "https://i.ebayimg.com/images/g/~c8AAOSwMWliRFOB/s-l500.jpg",
        "price": 4,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    },
    {
      "id": 6,
      "PlayerId": 1,
      "CardId": 4,
      "status": "Pending",
      "createdAt": "2023-07-05T22:27:03.971Z",
      "updatedAt": "2023-07-05T22:27:03.971Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 4,
        "name": "Yu-GI-OH Obelisk of the Tormentors Ultra Rare YGLD-DEG02 Gods Card!",
        "imageUrl": "https://i.ebayimg.com/images/g/wwcAAOSwPPViRFMR/s-l500.jpg",
        "price": 3,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    },
    {
      "id": 3,
      "PlayerId": 1,
      "CardId": 1,
      "status": "Success",
      "createdAt": "2023-07-05T09:34:26.577Z",
      "updatedAt": "2023-07-05T22:34:17.374Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 1,
        "name": "Secret Rare - Yu-Gi-Oh Card - Heroes Alliance",
        "imageUrl": "https://i.ebayimg.com/images/g/6TgAAOSwuMFUc9WC/s-l500.jpg",
        "price": 7,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    },
    {
      "id": 5,
      "PlayerId": 1,
      "CardId": 4,
      "status": "Success",
      "createdAt": "2023-07-05T22:26:31.475Z",
      "updatedAt": "2023-07-06T04:11:21.369Z",
      "Player": {
        "id": 1,
        "email": "master@gmail.com",
        "password": "$2a$10$wueqzrqYhmfB8mC/Qmv7HOppr5uOs7kac2XR/nikXWpE7axMkg9SO",
        "createdAt": "2023-07-05T08:40:56.022Z",
        "updatedAt": "2023-07-05T08:40:56.022Z"
      },
      "Card": {
        "id": 4,
        "name": "Yu-GI-OH Obelisk of the Tormentors Ultra Rare YGLD-DEG02 Gods Card!",
        "imageUrl": "https://i.ebayimg.com/images/g/wwcAAOSwPPViRFMR/s-l500.jpg",
        "price": 3,
        "createdAt": "2023-07-05T08:40:56.040Z",
        "updatedAt": "2023-07-05T08:40:56.040Z"
      }
    }
  ]
]
```

&nbsp;

## 8. POST /orders/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- player:

```json
{
  "PlayerId": "integer"
}
```

- body:

```json
{
  "CarId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "PlayerId": "integer",
  "CardId": "integer"
}
```

&nbsp;

## 9. PATCH /orders/:id

Description:

- Modify status from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Payment Success"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 10. DELETE /orders/:id

Description:

- Delete orders by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Order 2 has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Order is not exist"
}
```

## 11. GET /histories

Description:

- Get all histories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "description": "string",
    "updateBy": "date"
  }
]
```

&nbsp;

## 12. POST /histories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "id": "integer",
  "description": "string",
  "updateBy": "date"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "description": "string",
  "updateBy": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Description is required"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
