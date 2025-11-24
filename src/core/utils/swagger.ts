import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the E-commerce backend"
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      }
    }
  },
  apis: []
});

(swaggerSpec as any).paths = {
  "/": {
    get: { summary: "Health check", responses: { "200": { description: "Service is running" } } }
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" }
              },
              required: ["email", "password"]
            }
          }
        }
      },
      responses: { "200": { description: "Tokens and user info" } }
    }
  },
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Create user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" }
              },
              required: ["name", "email", "password"]
            }
          }
        }
      },
      responses: { "201": { description: "Created user" } }
    },
    get: { tags: ["Users"], summary: "List users", responses: { "200": { description: "Users list" } } }
  },
  "/categories": {
    post: {
      tags: ["Categories"],
      summary: "Create category",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] }
          }
        }
      },
      responses: { "201": { description: "Created category" }, "401": { description: "Unauthorized" }, "403": { description: "Forbidden" } }
    },
    get: { tags: ["Categories"], summary: "List categories", responses: { "200": { description: "Categories list" } } }
  },
  "/products": {
    post: {
      tags: ["Products"],
      summary: "Create product",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                stock: { type: "integer" },
                price: { type: "number" },
                categoryIds: { type: "string" },
                images: { type: "array", items: { type: "string", format: "binary" } }
              },
              required: ["title", "stock", "price", "categoryIds"]
            }
          }
        }
      },
      responses: { "201": { description: "Created product" }, "401": { description: "Unauthorized" }, "403": { description: "Forbidden" } }
    },
    get: { tags: ["Products"], summary: "List products", responses: { "200": { description: "Products list" } } }
  },
  "/cart": {
    get: { tags: ["Cart"], summary: "Get cart", security: [{ bearerAuth: [] }], responses: { "200": { description: "Cart" }, "401": { description: "Unauthorized" } } },
    post: {
      tags: ["Cart"],
      summary: "Add item",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object", properties: { productId: { type: "string" }, quantity: { type: "integer" } }, required: ["productId", "quantity"] }
          }
        }
      },
      responses: { "201": { description: "Item added" }, "401": { description: "Unauthorized" } }
    },
    put: {
      tags: ["Cart"],
      summary: "Update quantity",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object", properties: { cartItemId: { type: "string" }, quantity: { type: "integer" } }, required: ["cartItemId", "quantity"] }
          }
        }
      },
      responses: { "200": { description: "Item updated" }, "401": { description: "Unauthorized" } }
    },
    delete: {
      tags: ["Cart"],
      summary: "Remove item",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object", properties: { cartItemId: { type: "string" } }, required: ["cartItemId"] }
          }
        }
      },
      responses: { "200": { description: "Item removed" }, "401": { description: "Unauthorized" } }
    }
  },
  "/orders/checkout": {
    post: {
      tags: ["Orders"],
      summary: "Checkout",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { type: "object", properties: { paymentMode: { type: "string" } }, required: ["paymentMode"] } } }
      },
      responses: { "201": { description: "Order created" }, "401": { description: "Unauthorized" } }
    }
  },
  "/orders": {
    get: { tags: ["Orders"], summary: "My orders", security: [{ bearerAuth: [] }], responses: { "200": { description: "Orders list" }, "401": { description: "Unauthorized" } } }
  },
  "/orders/{orderId}": {
    get: {
      tags: ["Orders"],
      summary: "Order details",
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "orderId", in: "path", required: true, schema: { type: "string" } }],
      responses: { "200": { description: "Order" }, "401": { description: "Unauthorized" } }
    }
  }
};

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;