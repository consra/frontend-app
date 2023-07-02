const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2023-04/graphql.json`
    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    }

    try {
        const data = await fetch(URL, options).then(response => {
          return response.json();

        });

        return data;
    } catch (error) {
        throw new Error(`Product not fetched because ${error.message}`);
    }
}

export async function getProductsInCollection() {
    const query = `{
      collectionByHandle(handle: "clothes") {
        id
        title
        products(first: 25) {
          edges{
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice{
                  amount
                }
              }
              images(first:5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }`;

      const response = await ShopifyData(query);

      console.log("products " + JSON.stringify(response));
      const allProducts = response ? response.data.collectionByHandle.products.edges:[];

      return allProducts;
}

export async function getAllProducts() {
  const query = `
  {
    products(first: 25) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }
  `;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges ? response.data.products.edges: [];

  return slugs;
}

export async function getProduct(handle) {
  const query = `
  {
    productByHandle(handle: "hoodie") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            price {
              amount
            }
          }
        }
      }
    }
  }
`;

  const response = await ShopifyData(query);
  const product = response.data.productByHandle ? response.data.productByHandle : [];

  return product;

}