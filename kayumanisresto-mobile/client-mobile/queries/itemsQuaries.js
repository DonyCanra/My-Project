import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query GET_ITEMS {
    items {
      id
      name
      stars
      price
      imgUrl
      description
    }
  }
`;

export const GET_ITEM_DETAIL = gql`
  query GET_ITEM_DETAIL($itemId: Int!) {
    item(id: $itemId) {
      id
      name
      price
      stars
      imgUrl
      description
      Ingredients {
        name
      }
      User {
        email
      }
      Category {
        name
      }
    }
  }
`;
