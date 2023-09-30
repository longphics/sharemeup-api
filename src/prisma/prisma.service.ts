import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  private async _createUsers() {
    const users: Prisma.UserCreateInput[] = [
      {
        id: 'user1',
        email: 'longphi@gmail.com',
        hash: '12345',
        name: 'Long Phi',
        phone: '0989016502',
        address: 'Ho Chi Minh',
        avatar:
          'https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg',
        background: 'www.google.com',
      },
      {
        id: 'user2',
        email: 'minhanh@gmail.com',
        hash: '12345',
        name: 'Minh Anh',
        phone: '0989016502',
        address: 'Ho Chi Minh',
        avatar:
          'https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg',
        background: 'www.google.com',
      },
      {
        id: 'user3',
        email: 'sinhnhut@gmail.com',
        hash: '12345',
        name: 'Sinh Nhut',
        phone: '0989016502',
        address: 'Ho Chi Minh',
        avatar:
          'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-meo-hai-huoc-deo-kinh.jpg',
        background: 'www.google.com',
      },
    ];

    const result: any[] = [];

    for (const user of users) {
      result.push(await this.user.create({ data: user }));
    }

    return result;
  }

  private async _createStores() {
    const stores: Prisma.StoreCreateInput[] = [
      {
        id: 'store1(user1)',
        follow: 52,
        sold: 256,
        name: 'Happy Meal Store',
        avatar:
          'https://img.freepik.com/free-vector/kawaii-hamburger-icon_24911-45312.jpg',
        background:
          'https://images.template.net/108716/food-blog-background-m1w5n.jpg',
        address: 'Ho Chi Minh',
        owner: { connect: { id: 'user1' } },
      },
      {
        id: 'store2(user2)',
        follow: 52,
        sold: 256,
        name: 'Funny Store',
        avatar:
          'https://img.freepik.com/premium-vector/cute-burger-fried-potato-couple-concept-cartoon-character-illustration_296684-394.jpg',
        background:
          'https://images.template.net/108716/food-blog-background-m1w5n.jpg',
        address: 'Ho Chi Minh',
        owner: { connect: { id: 'user2' } },
      },
    ];

    const result: any[] = [];

    for (const store of stores) {
      result.push(await this.store.create({ data: store }));
    }

    return result;
  }

  private async _createCategories() {
    const categories: Prisma.CategoryCreateInput[] = [
      {
        id: 'category1',
        name: 'Food',
      },
      {
        id: 'category2',
        name: 'Drink',
      },
      {
        id: 'category3',
        name: 'Clothes',
      },
      {
        id: 'category4',
        name: 'Shoes',
      },
      {
        id: 'category5',
        name: 'Items',
      },
      {
        id: 'category6',
        name: 'Others',
      },
    ];

    const result: any[] = [];

    for (const category of categories) {
      result.push(await this.category.create({ data: category }));
    }

    return result;
  }

  private async _createFilters() {
    const filters: Prisma.FilterCreateInput[] = [
      {
        id: 'filter1',
        name: 'Age',
        options: {
          create: [
            {
              id: 'option1',
              name: 'children',
            },
            {
              id: 'option2',
              name: 'adult',
            },
            {
              id: 'option3',
              name: 'older',
            },
          ],
        },
        categories: {
          connect: [
            { id: 'category1' },
            { id: 'category2' },
            { id: 'category3' },
            { id: 'category4' },
            { id: 'category5' },
          ],
        },
      },
      {
        id: 'filter2',
        name: 'Vegetarian',
        options: {
          create: [
            {
              id: 'option4',
              name: 'yes',
            },
            {
              id: 'option5',
              name: 'no',
            },
          ],
        },
        categories: {
          connect: [{ id: 'category1' }],
        },
      },
      {
        id: 'filter3',
        name: 'Gender',
        options: {
          create: [
            {
              id: 'option6',
              name: 'male',
            },
            {
              id: 'option7',
              name: 'female',
            },
          ],
        },
        categories: {
          connect: [
            { id: 'category3' },
            { id: 'category4' },
            { id: 'category5' },
          ],
        },
      },
      {
        id: 'filter4',
        name: 'Status',
        options: {
          create: [
            {
              id: 'option8',
              name: 'used',
            },
            {
              id: 'option9',
              name: 'new',
            },
          ],
        },
        categories: {
          connect: [
            { id: 'category3' },
            { id: 'category4' },
            { id: 'category5' },
            { id: 'category6' },
          ],
        },
      },
      {
        id: 'filter5',
        name: 'Size',
        options: {
          create: [
            {
              id: 'option10',
              name: 'S',
            },
            {
              id: 'option11',
              name: 'M',
            },
            {
              id: 'option12',
              name: 'L',
            },
          ],
        },
        categories: {
          connect: [
            { id: 'category3' },
            { id: 'category4' },
            { id: 'category5' },
          ],
        },
      },
    ];

    const result: any[] = [];

    for (const filter of filters) {
      result.push(await this.filter.create({ data: filter }));
    }

    return result;
  }

  private async _createShippingMethods() {
    const shippingMethods: Prisma.ShippingMethodCreateInput[] = [
      {
        id: 'method1',
        name: 'Self pick-up',
      },
    ];

    const result: any[] = [];

    for (const shippingMethod of shippingMethods) {
      result.push(await this.shippingMethod.create({ data: shippingMethod }));
    }

    return result;
  }

  private async _createItems() {
    const items: Prisma.ItemCreateInput[] = [
      {
        id: 'item1(store1)',
        star: 5,
        stock: 10,
        name: 'Bún gạo xào chay',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://i-giadinh.vnecdn.net/2022/08/08/Thanh-pham-3-3-7795-1659943657.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
        feedbacks: {
          create: [
            {
              id: 'feedback1(user2,item1)',
              text: 'Pretty good, thanks a lot!',
              star: 5,
              user: {
                connect: { id: 'user2' },
              },
            },
            {
              id: 'feedback2(user3,item1)',
              text: 'I love it, thank you!',
              star: 5,
              user: {
                connect: { id: 'user3' },
              },
            },
          ],
        },
      },
      {
        id: 'item2(store1)',
        star: 4.9,
        stock: 10,
        name: 'Đậu hủ sốt cà',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://www.hoidaubepaau.com/wp-content/uploads/2016/02/dau-hu-sot-ca-chua.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
        feedbacks: {
          create: [
            {
              id: 'feedback3(user2,item2)',
              text: 'Pretty good, thanks a lot!',
              star: 5,
              user: {
                connect: { id: 'user2' },
              },
            },
            {
              id: 'feedback4(user3,item2)',
              text: 'I love it, thank you!',
              star: 5,
              user: {
                connect: { id: 'user3' },
              },
            },
          ],
        },
      },
      {
        id: 'item3(store1)',
        star: 3.8,
        stock: 10,
        name: 'Chả giò chay',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://ttol.vietnamnetjsc.vn/images/2022/05/05/08/42/gio-chay-005-20220504.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item4(store1)',
        star: 4,
        stock: 10,
        name: 'Bánh mì chả cá',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://xebanhmithonhiky.vn/wp-content/uploads/2019/03/Banh_mi_cha_ca_FILEminimizer.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item5(store1)',
        star: 3.2,
        stock: 10,
        name: 'Cơm trộn hải sản',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/07_2019/com-tron-bibimbap-han-quoc-3.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item6(store1)',
        star: 2.9,
        stock: 10,
        name: 'Miến xào thập cẩm',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://i-giadinh.vnecdn.net/2023/01/30/Thanh-pham-1-1-6550-1675072986.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item7(store1)',
        star: 2.5,
        stock: 10,
        name: 'Cơm chay thập cẩm',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://vcdn-dulich.vnecdn.net/2019/08/01/VnExpress-SaiGon-Co-m-chay2-5141-1564658717.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=ySkHTw63zSjfQr6H5TW-fw',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item8(store1)',
        star: 3,
        stock: 10,
        name: 'Cơm chiên trứng',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://amthucvungmien.com.vn/uploads/images/c%C6%A1m%20rang.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item9(store1)',
        star: 4.5,
        stock: 10,
        name: 'Nui xào chay',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://monngonmoingay.com/wp-content/uploads/2021/06/nui-xao-chay-thap-cam-500.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item10(store1)',
        star: 5,
        stock: 10,
        name: 'Bún thịt nướng',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://www.cet.edu.vn/wp-content/uploads/2018/03/bun-thit-nuong-kieu-mien-nam.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item11(store1)',
        star: 4.2,
        stock: 10,
        name: 'Bánh cuốn nóng',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://img-global.cpcdn.com/recipes/b235f5db0142062d/680x482cq70/banh-cu%E1%BB%91n-trang-ch%E1%BA%A3o-nhan-th%E1%BB%8Bt-bam-n%E1%BA%A5m-meo-recipe-main-photo.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option5' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item12(store1)',
        star: 3.6,
        stock: 10,
        name: 'Hủ tiếu chay',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://daotaobeptruong.vn/wp-content/uploads/2017/10/hu-tieu-chay-ngon.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category1' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option2' },
            { id: 'option3' },
            { id: 'option4' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item13(store2)',
        star: 4.9,
        stock: 10,
        name: 'Bộ quần áo bé trai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/719875171574779.6470b6ef6209f.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
        feedbacks: {
          create: [
            {
              id: 'feedback5(user3,item1)',
              text: 'I love it, thank you!',
              star: 5,
              user: {
                connect: { id: 'user3' },
              },
            },
            {
              id: 'feedback6(user1,item1)',
              text: 'So beautiful, thank you so much!',
              star: 5,
              user: {
                connect: { id: 'user1' },
              },
            },
          ],
        },
      },
      {
        id: 'item14(store2)',
        star: 4.5,
        stock: 10,
        name: 'Áo bông tay dài',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/271579174360449.64a14fad788e1.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
        feedbacks: {
          create: [
            {
              id: 'feedback7(user3,item1)',
              text: 'I love it, thank you!',
              star: 5,
              user: {
                connect: { id: 'user3' },
              },
            },
            {
              id: 'feedback8(user1,item1)',
              text: 'So beautiful, thank you so much!',
              star: 5,
              user: {
                connect: { id: 'user1' },
              },
            },
          ],
        },
      },
      {
        id: 'item15(store2)',
        star: 4.8,
        stock: 10,
        name: 'Áo thun nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://product.hstatic.net/1000284478/product/3_7944962003_5_ef85f8b6c5f544e39153b26f7d50c3f4_master.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item16(store2)',
        star: 3.9,
        stock: 10,
        name: 'Đầm bé gái',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/74fb52113072637.6020f2fbeacae.png',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item17(store2)',
        star: 4.2,
        stock: 10,
        name: 'Áo sơ mi nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c8f8d2134793773.61dc818fa7157.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item18(store2)',
        star: 4.4,
        stock: 10,
        name: 'Áo thun nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e6d8c2175903151.64bb8f181ff56.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item19(store2)',
        star: 4,
        stock: 10,
        name: 'Áo nam mùa hè',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/74f862169348225.644ac3485f00e.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item20(store2)',
        star: 5,
        stock: 10,
        name: 'Áo nữ đơn giản',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5f6fec172031623.64784f7b1aac0.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item21(store2)',
        star: 3.2,
        stock: 10,
        name: 'Áo hoodie nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a1dba150111441.62f3c6637b3f0.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item22(store2)',
        star: 2.5,
        stock: 10,
        name: 'Áo len tím',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2cc21f169299275.644a2937799c2.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item23(store2)',
        star: 4.5,
        stock: 10,
        name: 'Áo thun đơn giản',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/31e36f175903281.64bb8ff813169.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item24(store2)',
        star: 5,
        stock: 10,
        name: 'Áo sơ mi bé trai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7402dd171688511.6473296c90101.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category3' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item25(store2)',
        star: 5,
        stock: 10,
        name: 'Khăn cổ cho bé',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://vn-test-11.slatic.net/p/468586e15002c9089b64d245591bcb39.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option7' },
            { id: 'option10' },
            { id: 'option8' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item26(store2)',
        star: 5,
        stock: 10,
        name: 'Mũ len',
        description: 'This is description.',
        expired: new Date(),
        images: ['https://cf.shopee.vn/file/13adb10bf67947e5f83b08aff2f38f29'],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option3' },
            { id: 'option6' },
            { id: 'option11' },
            { id: 'option9' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item27(store2)',
        star: 4.9,
        stock: 10,
        name: 'Nón kết',
        description: 'This is description.',
        expired: new Date(),
        images: ['https://ananas.vn/wp-content/uploads/Pro_ABC006_1.jpeg'],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option12' },
            { id: 'option1' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item28(store2)',
        star: 4.8,
        stock: 10,
        name: 'Vớ cho bé',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/77c703168394473.64431d436b2a4.png',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item29(store2)',
        star: 3.2,
        stock: 10,
        name: 'Set găng tay cho bé',
        description: 'This is description.',
        expired: new Date(),
        images: ['https://cf.shopee.vn/file/4a57d8fb90512b71b2372ebc881ac604'],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item30(store2)',
        star: 3,
        stock: 10,
        name: 'Túi xách nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://pos.nvncdn.net/22d473-45885/ps/content/20230314_CeBGXmM1RbB2.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item31(store2)',
        star: 5,
        stock: 10,
        name: 'Cặp đi học nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://down-vn.img.susercontent.com/file/3e71e7e19373bbdfe775dfd1aba741d9',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item32(store2)',
        star: 5,
        stock: 10,
        name: 'Cặp đi học nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://down-vn.img.susercontent.com/file/43bd804c490755e91e09d8f19049bf13',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item33(store2)',
        star: 5,
        stock: 10,
        name: 'Nón cói',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj067kjflmoc4d',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item34(store2)',
        star: 5,
        stock: 10,
        name: 'Balo đi học',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://down-vn.img.susercontent.com/file/0acf3eb9d318ae3a064f240e82d92c5b_tn',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item35(store2)',
        star: 5,
        stock: 10,
        name: 'Khăn choàng cổ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://khanchoangthieuhoa.com/wp-content/uploads/2021/08/khan-choang-co-6.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option3' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item36(store2)',
        star: 5,
        stock: 10,
        name: 'Túi tote',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c068ba171381133.646ddef74804e.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category5' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item37(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa tươi ít đường',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/78a14f174844807.64abdd0a0b899.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item38(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa tươi Dalat',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c1a289108238411.5fb942a1a4760.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item39(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa dâu tây',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c6f9e153748703.633547954711a.png',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item40(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa chua trái cây',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c3d1aa134529539.61d7349a73d21.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item41(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa lúa mạch',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/a8de5f172256633.647c73c53027b.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item42(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa ngũ cốc',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://frutonanny.com.vn/wp-content/uploads/2022/11/sua-dem-hon-hop-ngu-coc-dao-2.png-scaled.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item43(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa TH true milk',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/4004cf127243793.613e38caac483.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item44(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa tươi đóng chai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/b9d9cf150363613.62f9025be2132.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item45(store1)',
        star: 5,
        stock: 10,
        name: 'Nước ép thơm',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/12267e94384799.5e7d52d9b109a.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option3' }, { id: 'option2' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item46(store1)',
        star: 5,
        stock: 10,
        name: 'Nước ép trái cây',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/fcdf8c174794413.64a8471405375.png',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }, { id: 'option2' }, { id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item47(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa cho người cao tuổi',
        description: 'This is description.',
        expired: new Date(),
        images: ['https://media.loveitopcdn.com/21179/thumb/dsc072086882.jpg'],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option3' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item48(store1)',
        star: 5,
        stock: 10,
        name: 'Sữa cho bé',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/77a000135932531.61f070b21ca8e.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
        category: { connect: { id: 'category2' } },
        options: {
          connect: [{ id: 'option1' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item49(store2)',
        star: 5,
        stock: 10,
        name: 'Giày thể thao nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/74a27b175297997.64b1041b244f3.png',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item50(store2)',
        star: 5,
        stock: 10,
        name: 'Giày thể thao nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7936f0148100689.62cf2b81b8e74.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item51(store2)',
        star: 5,
        stock: 10,
        name: 'Giày cho bé trai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/06d226144799347.636f9dbd8e84e.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item52(store2)',
        star: 5,
        stock: 10,
        name: 'Giày cho bé gái',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/356852144799347.629306c838737.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item53(store2)',
        star: 5,
        stock: 10,
        name: 'Giày bata nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/407c0f154929143.634b250090136.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item54(store2)',
        star: 5,
        stock: 10,
        name: 'Giày chạy bộ nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2eecf0171247339.646bcc6eab58a.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item55(store2)',
        star: 5,
        stock: 10,
        name: 'Dép nhựa nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/946881129003583.6161d0d5cc71d.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item56(store2)',
        star: 5,
        stock: 10,
        name: 'Dép nhựa',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/201611151705691.63109e547a56d.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option12' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item57(store2)',
        star: 5,
        stock: 10,
        name: 'Giày sandal nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/ed06ee172853917.6486d5522aafe.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item58(store2)',
        star: 5,
        stock: 10,
        name: 'Giày da cho bé',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/0f5928103783015.5f54e1462d6ac.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option1' },
            { id: 'option6' },
            { id: 'option8' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item59(store2)',
        star: 5,
        stock: 10,
        name: 'Giày da nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/db76d3157998797.6383c2b937d05.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option7' },
            { id: 'option9' },
            { id: 'option10' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item60(store2)',
        star: 5,
        stock: 10,
        name: 'Giày da nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/f55663115745281.60541210c7a08.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category4' } },
        options: {
          connect: [
            { id: 'option2' },
            { id: 'option6' },
            { id: 'option9' },
            { id: 'option11' },
          ],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item61(store2)',
        star: 5,
        stock: 10,
        name: 'Nước mắm Nam Ngư',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://tieudungchatluong.net/wp-content/uploads/2021/09/nam-ngu-chai-thuy-tinh-moi.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item62(store2)',
        star: 5,
        stock: 10,
        name: 'Dầu ăn Tường An',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://www.tuongan.com.vn/public/uploads/2019/CookingOil_3.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item63(store2)',
        star: 5,
        stock: 10,
        name: 'Nước tương Chinsu',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://image-us.eva.vn/upload/3-2021/images/2021-07-20/1626773692-176-thumbnail-width640height480.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item64(store2)',
        star: 5,
        stock: 10,
        name: 'Bánh bông lan',
        description: 'This is description.',
        expired: new Date(),
        images: ['https://cf.shopee.vn/file/1a81688114c2736717b150bd51247acf'],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item65(store2)',
        star: 5,
        stock: 10,
        name: 'Túi gạo 5kg',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/246a5b128908557.615f9eeacd5a5.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item66(store2)',
        star: 5,
        stock: 10,
        name: 'Bộ chén đĩa',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://cf.shopee.vn/file/bba46dd9e43e9fce0b2157fc68d9d0cb_tn',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item67(store2)',
        star: 5,
        stock: 10,
        name: 'Bộ sách lớp 3',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/27/272170396-367731691856468-9213076374666582325-n-6545-16510445341741251515485.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option8' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item68(store2)',
        star: 5,
        stock: 10,
        name: 'Bộ sách lớp 6',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://cdn.tuoitre.vn/thumb_w/640/2022/11/4/sgk-moi-1-16675240054552586592.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option8' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item69(store2)',
        star: 5,
        stock: 10,
        name: 'Bộ dụng cụ học tập',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://bizweb.dktcdn.net/100/299/021/products/xanh-duong.jpg?v=1629380681700',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item70(store2)',
        star: 5,
        stock: 10,
        name: 'Mền bông mịn',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://bizweb.dktcdn.net/100/278/597/products/img-4603.jpg?v=1678449508867',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item71(store2)',
        star: 5,
        stock: 10,
        name: 'Quạt điện',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mivietnam.vn/wp-content/uploads/2023/06/mivietnam-quat-luu-thong-khong-khi-keheal-f4-14.jpg',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option8' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
      {
        id: 'item72(store2)',
        star: 5,
        stock: 10,
        name: 'Ấm điện siêu tốc',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://bizweb.dktcdn.net/100/328/889/files/am-sieu-toc-philips-hd9350-cong-suat-2200w-dung-tich-17l.jpg?v=1574413018788',
        ],
        store: { connect: { id: 'store2(user2)' } },
        category: { connect: { id: 'category6' } },
        options: {
          connect: [{ id: 'option9' }],
        },
        shippingMethods: { connect: [{ id: 'method1' }] },
      },
    ];

    const result: any[] = [];

    for (const item of items) {
      result.push(await this.item.create({ data: item }));
    }

    return result;
  }

  private async _createCartElements() {
    const res = await this.user.update({
      where: {
        id: 'user3',
      },
      data: {
        cartElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item1(store1)' } },
            },
            {
              amount: 3,
              item: { connect: { id: 'item10(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item2(store1)' } },
            },
          ],
        },
      },
      include: {
        cartElements: true,
      },
    });

    return res;
  }

  private async _createOrderElements() {
    const orders: Prisma.OrderCreateInput[] = [
      {
        id: 'order1(user3,store1)',
        status: 'Waiting',
        note: 'This is note',
        phone: '0982212289',
        address: 'Ho Chi Minh',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store1(user1)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item1(store1)' } },
            },
            {
              amount: 3,
              item: { connect: { id: 'item3(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item10(store1)' } },
            },
          ],
        },
      },
      {
        id: 'order2(user3,store2)',
        status: 'Waiting',
        note: 'This is note',
        phone: '0982212289',
        address: 'Ho Chi Minh',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store2(user2)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item14(store2)' } },
            },
          ],
        },
      },
      {
        id: 'order3(user3,store1)',
        status: 'Taking',
        note: 'This is note',
        phone: '0982212289',
        address: 'Ho Chi Minh',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store1(user1)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item3(store1)' } },
            },
            {
              amount: 3,
              item: { connect: { id: 'item5(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item6(store1)' } },
            },
          ],
        },
      },
      {
        id: 'order4(user3,store1)',
        status: 'Received',
        note: 'This is note',
        phone: '0982212289',
        address: 'Ho Chi Minh',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store1(user1)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item8(store1)' } },
            },
            {
              amount: 3,
              item: { connect: { id: 'item9(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item10(store1)' } },
            },
          ],
        },
      },
      {
        id: 'order5(user3,store1)',
        status: 'Canceled',
        note: 'This is note',
        phone: '0982212289',
        address: 'Ho Chi Minh',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store1(user1)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item6(store1)' } },
            },
            {
              amount: 3,
              item: { connect: { id: 'item7(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item8(store1)' } },
            },
          ],
        },
      },
    ];

    const result: any[] = [];

    for (const order of orders) {
      result.push(await this.order.create({ data: order }));
    }

    return result;
  }

  async init() {
    const users = await this._createUsers();
    const stores = await this._createStores();
    const categories = await this._createCategories();
    const filters = await this._createFilters();
    const shippingMethods = await this._createShippingMethods();
    const items = await this._createItems();
    const cartElements = await this._createCartElements();
    const orderElements = await this._createOrderElements();

    return {
      users,
      stores,
      categories,
      filters,
      shippingMethods,
      items,
      cartElements,
      orderElements,
    };
  }
}
