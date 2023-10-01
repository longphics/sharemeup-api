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
        id: 'item6(store1)',
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
        id: 'item7(store1)',
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
        feedbacks: {
          create: [
            {
              id: 'feedback7(user2,item1)',
              text: 'Pretty good, thanks a lot!',
              star: 5,
              user: {
                connect: { id: 'user2' },
              },
            },
            {
              id: 'feedback8(user3,item1)',
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
        id: 'item8(store1)',
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
        id: 'item9(store1)',
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
        id: 'item10(store1)',
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
        id: 'item11(store1)',
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
        id: 'item12(store1)',
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
              id: 'feedback13(user1,item1)',
              text: 'Very good, thank you so much!',
              star: 5,
              user: {
                connect: { id: 'user1' },
              },
            },
            {
              id: 'feedback14(user3,item1)',
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
      },
      {
        id: 'item15(store2)',
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
        id: 'item16(store2)',
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
        id: 'item17(store2)',
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
        id: 'item18(store2)',
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
        id: 'item19(store2)',
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
        id: 'item20(store2)',
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
        id: 'item21(store2)',
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
        id: 'item22(store2)',
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
        id: 'item23(store2)',
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
        id: 'item24(store2)',
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
        id: 'item25(store2)',
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
        id: 'item26(store2)',
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
              item: { connect: { id: 'item2(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item3(store1)' } },
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
              item: { connect: { id: 'item2(store1)' } },
            },
            {
              amount: 1,
              item: { connect: { id: 'item3(store1)' } },
            },
          ],
        },
      },
      {
        id: 'order2(user3,store2)',
        status: 'Waiting',
        note: 'This is note',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store2(user2)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item13(store2)' } },
            },
          ],
        },
      },
      {
        id: 'order3(user3,store1)',
        status: 'Taking',
        note: 'This is note',
        user: { connect: { id: 'user3' } },
        store: { connect: { id: 'store1(user1)' } },
        orderElements: {
          create: [
            {
              amount: 2,
              item: { connect: { id: 'item4(store1)' } },
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
