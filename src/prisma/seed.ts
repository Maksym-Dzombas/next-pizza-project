import { prisma } from "./prisma-client";
import { cartItems, categories, ingredients, pizzas, products, truncateListModels, users } from "./constants";
import * as seed from "../utils/seed";

// Создание кастомных данных
async function up() {
  await prisma.user.createMany({
    data: users
  });

  await prisma.category.createMany({
    data: categories
  });

  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });

  await prisma.$transaction(async (prisma) => {
    await Promise.all(pizzas.map((pizza) => {
      return prisma.product.create({
        data: {
          id: pizza.id,
          name: pizza.name,
          imageUrl: pizza.imageUrl,
          categoryId: pizza.categoryId,
          ingredients: {
            connect: pizza.ingredients
          }
        }
      })
    }))
  });


  // Variations for Products
  await prisma.productVariation.createMany({
    data: [
      // Пепперони Фреш
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 20, pizzaType: 1 }),
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 40, pizzaType: 1 }),
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 30, pizzaType: 1 }),
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 20, pizzaType: 2 }),
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 30, pizzaType: 2 }),
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[0].id, size: 40, pizzaType: 2 }),

      // Сырная
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[1].id, size: 20, pizzaType: 1 }),

      // Чоризо Фреш
      seed.generateVariationProduct({ price: seed.randomPrice(100, 400), productId: pizzas[2].id, size: 20, pizzaType: 1 }),


      // Остальные продукты
      seed.generateVariationProduct({ productId: 1 }),
      seed.generateVariationProduct({ productId: 2 }),
      seed.generateVariationProduct({ productId: 3 }),
      seed.generateVariationProduct({ productId: 4 }),
      seed.generateVariationProduct({ productId: 5 }),
      seed.generateVariationProduct({ productId: 6 }),
      seed.generateVariationProduct({ productId: 7 }),
      seed.generateVariationProduct({ productId: 8 }),
      seed.generateVariationProduct({ productId: 9 }),
      seed.generateVariationProduct({ productId: 10 }),
      seed.generateVariationProduct({ productId: 12 }),
      seed.generateVariationProduct({ productId: 13 }),
      seed.generateVariationProduct({ productId: 14 }),
      seed.generateVariationProduct({ productId: 15 }),
      seed.generateVariationProduct({ productId: 16 }),
      seed.generateVariationProduct({ productId: 17 }),
    ]
  })

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "444444"
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222222"
      },
    ]
  });

  // Stories
  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });

  await prisma.$transaction(async (prisma) => {
    await Promise.all(cartItems.map((cartItem) => {
      return prisma.cartItem.create({
        data: {
          variationProductId: cartItem.variationProductId,
          cartId: cartItem.cartId,
          quantity: cartItem.quantity,
          ingredients: {
            connect: cartItem.ingredients.map(ingredient => ({ id: ingredient.id }))
          }
        }
      })
    }))
  });
}

// Обнуление данных в базе данных
async function down() {
  await Promise.all(truncateListModels.map(async (nameModel) => {
    const stringSql = `TRUNCATE TABLE "${nameModel}" RESTART IDENTITY CASCADE;`
    return await prisma.$executeRawUnsafe(stringSql);
  }));
}

// Логика запуска seed.ts
async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

// Обработчик ошибок и отключение от базы данных
main().then(async () => {
  await prisma.$disconnect();
})
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });