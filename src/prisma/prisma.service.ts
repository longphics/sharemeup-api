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
        address: 'HCM',
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
        address: 'HCM',
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
        address: 'HCM',
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
        name: 'Happy Meal Store',
        avatar: 'www.google.com',
        background: 'www.google.com',
        address: 'HCM',
        owner: { connect: { id: 'user1' } },
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
        name: 'age',
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
        name: 'vegetarian',
        options: {
          create: [
            {
              id: 'option4',
              name: 'true',
            },
            {
              id: 'option5',
              name: 'false',
            },
          ],
        },
        categories: {
          connect: [{ id: 'category1' }],
        },
      },
      {
        id: 'filter3',
        name: 'gender',
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
        name: 'status',
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
        name: 'size',
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
              id: 'feedback1(user1,item1)',
              text: 'Very good, thank you so much!',
              star: 5,
              user: {
                connect: { id: 'user1' },
              },
            },
            {
              id: 'feedback2(user2,item1)',
              text: 'Pretty good, thanks a lot!',
              star: 5,
              user: {
                connect: { id: 'user2' },
              },
            },
            {
              id: 'feedback3(user3,item1)',
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
        star: 4.8,
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
        id: 'item13(store1)',
        star: 4.9,
        stock: 10,
        name: 'Bộ quần áo bé trai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/719875171574779.6470b6ef6209f.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
      },
      {
        id: 'item14(store1)',
        star: 4.5,
        stock: 10,
        name: 'Áo bông tay dài',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/271579174360449.64a14fad788e1.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item15(store1)',
        star: 4.8,
        stock: 10,
        name: 'Áo thun nữ',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://product.hstatic.net/1000284478/product/3_7944962003_5_ef85f8b6c5f544e39153b26f7d50c3f4_master.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item16(store1)',
        star: 3.9,
        stock: 10,
        name: 'Đầm bé gái',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/74fb52113072637.6020f2fbeacae.png',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item17(store1)',
        star: 4.2,
        stock: 10,
        name: 'Áo sơ mi nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/c8f8d2134793773.61dc818fa7157.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item18(store1)',
        star: 4.4,
        stock: 10,
        name: 'Áo thun nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e6d8c2175903151.64bb8f181ff56.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item19(store1)',
        star: 4,
        stock: 10,
        name: 'Áo nam mùa hè',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/74f862169348225.644ac3485f00e.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item20(store1)',
        star: 5,
        stock: 10,
        name: 'Áo nữ đơn giản',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5f6fec172031623.64784f7b1aac0.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item21(store1)',
        star: 3.2,
        stock: 10,
        name: 'Áo hoodie nam',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a1dba150111441.62f3c6637b3f0.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item22(store1)',
        star: 2.5,
        stock: 10,
        name: 'Áo len tím',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2cc21f169299275.644a2937799c2.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item23(store1)',
        star: 4.5,
        stock: 10,
        name: 'Áo thun đơn giản',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/31e36f175903281.64bb8ff813169.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
        id: 'item24(store1)',
        star: 5,
        stock: 10,
        name: 'Áo sơ mi bé trai',
        description: 'This is description.',
        expired: new Date(),
        images: [
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7402dd171688511.6473296c90101.jpg',
        ],
        store: { connect: { id: 'store1(user1)' } },
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
    ];

    const result: any[] = [];

    for (const item of items) {
      result.push(await this.item.create({ data: item }));
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

    return {
      users,
      stores,
      categories,
      filters,
      shippingMethods,
      items,
    };
  }
}
