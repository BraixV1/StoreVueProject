import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Login from '../views/Authentication/Login.vue';
import Register from '@/views/Authentication/Register.vue';
import KeyboardIndex from '@/views/Admin/Keyboard/Index.vue';
import KeyboardCreate from '@/views/Admin/Keyboard/Create.vue';
import KeyboardDelete from '@/views/Admin/Keyboard/Delete.vue';
import KeyboardEdit from '@/views/Admin/Keyboard/Edit.vue';
import KeyboardPartCreate from '@/views/Admin/KeyboardPart/Create.vue';
import KeyboardPartDelete from '@/views/Admin/KeyboardPart/Delete.vue';
import KeyboardPartIndex from '@/views/Admin/KeyboardPart/Index.vue';
import KeyboardPartEdit from '@/views/Admin/KeyboardPart/Edit.vue';
import NotFound from '@/components/Not-Found.vue';
import AdminLayout from '@/views/Admin/AdminLayout.vue';
import PartIndex from '@/views/Admin/Part/Index.vue';
import PartCreate from '@/views/Admin/Part/Create.vue';
import PartDelete from '@/views/Admin/Part/Delete.vue';
import PartEdit from '@/views/Admin/Part/Edit.vue';
import CategoryCreate from '@/views/Admin/Category/Create.vue';
import CategoryDelete from '@/views/Admin/Category/Delete.vue';
import CategoryIndex from '@/views/Admin/Category/Index.vue';
import CategoryEdit from '@/views/Admin/Category/Edit.vue';
import KeyboardBuildCreate from '@/views/Admin/KeyboardBuild/Create.vue';
import KeyboardBuildDelete from '@/views/Admin/KeyboardBuild/Delete.vue';
import KeyboardBuildIndex from '@/views/Admin/KeyboardBuild/Index.vue';
import KeyboardBuildEdit from '@/views/Admin/KeyboardBuild/Edit.vue';
import KeyboardRatingCreate from '@/views/Admin/KeyboardRating/Create.vue';
import KeyboardRatingDelete from '@/views/Admin/KeyboardRating/Delete.vue';
import KeyboardRatingIndex from '@/views/Admin/KeyboardRating/Index.vue';
import KeyboardRatingEdit from '@/views/Admin/KeyboardRating/Edit.vue';
import PartRatingCreate from '@/views/Admin/PartRating/Create.vue';
import PartRatingDelete from '@/views/Admin/PartRating/Delete.vue';
import PartRatingIndex from '@/views/Admin/PartRating/Index.vue';
import PartRatingEdit from '@/views/Admin/PartRating/Edit.vue';
import OrderCreate from '@/views/Admin/Order/Create.vue';
import OrderDelete from '@/views/Admin/Order/Delete.vue';
import OrderIndex from '@/views/Admin/Order/Index.vue';
import OrderEdit from '@/views/Admin/Order/Edit.vue';
import OrderItemCreate from '@/views/Admin/OrderItem/Create.vue';
import OrderItemDelete from '@/views/Admin/OrderItem/Delete.vue';
import OrderItemIndex from '@/views/Admin/OrderItem/Index.vue';
import OrderItemEdit from '@/views/Admin/OrderItem/Edit.vue';
import PartCategoryCreate from '@/views/Admin/PartCategory/Create.vue';
import PartCategoryDelete from '@/views/Admin/PartCategory/Delete.vue';
import PartCategoryIndex from '@/views/Admin/PartCategory/Index.vue';
import PartCategoryEdit from '@/views/Admin/PartCategory/Edit.vue';
import PartInBuildCreate from '@/views/Admin/PartInBuild/Create.vue';
import PartInBuildDelete from '@/views/Admin/PartInBuild/Delete.vue';
import PartInBuildIndex from '@/views/Admin/PartInBuild/Index.vue';
import PartInBuildEdit from '@/views/Admin/PartInBuild/Edit.vue';
import WarehouseCreate from '@/views/Admin/Warehouse/Create.vue';
import WarehouseDelete from '@/views/Admin/Warehouse/Delete.vue';
import WarehouseIndex from '@/views/Admin/Warehouse/Index.vue';
import WarehouseEdit from '@/views/Admin/Warehouse/Edit.vue';
import WarehousePartCreate from '@/views/Admin/WarehousePart/Create.vue';
import WarehousePartDelete from '@/views/Admin/WarehousePart/Delete.vue';
import WarehousePartIndex from '@/views/Admin/WarehousePart/Index.vue';
import WarehousePartEdit from '@/views/Admin/WarehousePart/Edit.vue';
import AccountLayout from '@/views/Account/AccountLayout.vue';
import MyOrders from '@/views/Account/MyOrders/Index.vue';
import MyBuilds from '@/views/Account/MyBuilds/Index.vue';
import MyKeyboardRatings from '@/views/Account/MyRatings/Keyboard/Index.vue';
import MyPartRatings from '@/views/Account/MyRatings/Part/Index.vue';
import BuilderLayout from '@/views/KeyboardBuilder/BuilderLayout.vue';
import BuilderStartPage from '@/views/KeyboardBuilder/BuilderStartPage.vue';
import BuilderPage from '@/views/KeyboardBuilder/BuilderPage.vue';
import PartSelection from '@/views/KeyboardBuilder/PartSelection.vue';
import KeyboardProduct from '@/components/Products/KeyboardProduct.vue';
import PartProduct from '@/components/Products/PartProduct.vue';
import StoreLayout from '@/views/Store/StoreLayout.vue';
import KeyboardsStorePage from '@/views/Store/KeyboardsStorePage.vue';
import PartsStore from '@/views/Store/PartsStorePage.vue';
import CheckoutPage from '@/views/Checkout/CheckoutPage.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Checkout',
      name: 'Checkout',
      component: CheckoutPage 
    },
    {
      path: '/KeyboardBuilder',
      component: BuilderLayout,
      children: [
        {
          path: 'BuilderStartPage',
          name: 'Name your build',
          component: BuilderStartPage
        },
        {
          path: 'BuilderPage',
          name: 'BuilderDashboard',
          component: BuilderPage
        },
        {
          path: 'PartSelection',
          name: 'Select part for build',
          component: PartSelection
        },
        {
          path: 'Delete/:id',
          name: 'Delete part from build',
          component: PartInBuildDelete
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/Account',
      component: AccountLayout,
      children: [
        {
          path: 'MyOrders/index',
          name: 'myorders',
          component: MyOrders
        },
        {
          path: 'MyBuilds/index',
          name: 'MyBuilds',
          component: MyBuilds
        },
        {
          path: 'MyBuilds/Delete/:id',
          name: 'DeleteMyBuildItem',
          component: PartInBuildDelete
        },
        {
          path: 'MyRatings/Keyboard/Index',
          name: 'MyKeyboardRatings',
          component: MyKeyboardRatings
        },
        {
          path: 'MyRatings/Keyboard/Delete/:id',
          name: 'DeleteMyKeyboardRating',
          component: KeyboardRatingDelete
        }
        ,
        {
          path: 'MyRatings/Keyboard/Edit/:id',
          name: 'EditMyKeyboardRating',
          component: KeyboardRatingEdit
        },
        {
          path: 'MyRatings/Part/Index',
          name: 'MyPartRatings',
          component: MyPartRatings
        },
        {
          path: 'MyRatings/Part/Delete/:id',
          name: 'DeleteMyPartRating',
          component: PartRatingDelete
        }
        ,
        {
          path: 'MyRatings/Part/Edit/:id',
          name: 'EditMyPartRating',
          component: PartRatingEdit
        }
      ]
    },
    {
      path: '/Store',
      component: StoreLayout,
      children: [
        {
        path: 'KeyboardsStore',
        component: KeyboardsStorePage
        },
        {
        path: 'KeyboardDetails/:id',
        component: KeyboardProduct
        },
        {
          path: 'PartsStore',
          component: PartsStore
        },
        {
          path: 'PartDetails/:id',
          component: PartProduct
        }
      ]
    },
    {
      path: '/Admin',
      component: AdminLayout,
      children: [
        {
          path: 'Keyboard/Create',
          name: 'CreateKeyboard',
          component: KeyboardCreate
        },
        {
          path: 'Keyboard/Index',
          name: 'Keyboards',
          component: KeyboardIndex
        },
        {
          path: 'Keyboard/Delete/:id',
          name: 'DeleteKeyboard',
          component: KeyboardDelete
        },
        {
          path: 'Keyboard/Edit/:id',
          name: 'EditKeyboard',
          component: KeyboardEdit
        },
        {
          path: 'Keyboard/Details/:id',
          name: 'Keyboard Details',
          component: KeyboardProduct
        },
        {
          path: 'KeyboardPart/Index',
          name: 'KeyboardParts',
          component: KeyboardPartIndex
        },
        {
          path: 'KeyboardPart/Create',
          name: 'CreateKeyboardPart',
          component: KeyboardPartCreate
        },
        {
          path: 'KeyboardPart/Delete/:id',
          name: 'DeleteKeyboardPart',
          component: KeyboardPartDelete
        },
        {
          path: 'KeyboardPart/Edit/:id',
          name: 'EditKeyboardPart',
          component: KeyboardPartEdit
        },
        {
          path: 'Part/Index',
          name: 'Parts',
          component: PartIndex
        },
        {
          path: 'Part/Edit/:id',
          name: 'EditPart',
          component: PartEdit
        },
        {
          path: 'Part/Create',
          name: 'CreatePart',
          component: PartCreate
        },
        {
          path: 'Part/Details/:id',
          name: 'PartDetails',
          component: PartProduct
        },
        {
          path: 'Part/Delete/:id',
          name: 'DeletePart',
          component: PartDelete
        },
        {
          path: 'Category/Index',
          name: 'CategoryIndex',
          component: CategoryIndex
        },
        {
          path: 'Category/Edit/:id',
          name: 'EditCategory',
          component: CategoryEdit
        },
        {
          path: 'Category/Create',
          name: 'CreateCategory',
          component: CategoryCreate
        },
        {
          path: 'Category/Delete/:id',
          name: 'DeleteCategory',
          component: CategoryDelete
        },
        {
          path: 'KeyboardBuild/Index',
          name: 'KeyboardBuildIndex',
          component: KeyboardBuildIndex
        },
        {
          path: 'KeyboardBuild/Edit/:id',
          name: 'EditKeyboardBuild',
          component: KeyboardBuildEdit
        },
        {
          path: 'KeyboardBuild/Create',
          name: 'CreateKeyboardBuild',
          component: KeyboardBuildCreate
        },
        {
          path: 'KeyboardBuild/Delete/:id',
          name: 'DeleteKeyboardBuild',
          component: KeyboardBuildDelete
        },
        {
          path: 'KeyboardRating/Index',
          name: 'KeyboardRatingIndex',
          component: KeyboardRatingIndex
        },
        {
          path: 'KeyboardRating/Edit/:id',
          name: 'EditKeyboardRatingBuild',
          component: KeyboardRatingEdit
        },
        {
          path: 'KeyboardRating/Create',
          name: 'CreateKeyboardRatingBuild',
          component: KeyboardRatingCreate
        },
        {
          path: 'KeyboardRating/Delete/:id',
          name: 'DeleteKeyboardRatingBuild',
          component: KeyboardRatingDelete
        },
        {
          path: 'Order/Index',
          name: 'OrderIndex',
          component: OrderIndex
        },
        {
          path: 'Order/Edit/:id',
          name: 'EditOrder',
          component: OrderEdit
        },
        {
          path: 'Order/Create',
          name: 'CreateOrder',
          component: OrderCreate
        },
        {
          path: 'Order/Delete/:id',
          name: 'DeleteOrder',
          component: OrderDelete
        },
        {
          path: 'OrderItem/Index',
          name: 'OrderItemIndex',
          component: OrderItemIndex
        },
        {
          path: 'OrderItem/Edit/:id',
          name: 'EditOrderItem',
          component: OrderItemEdit
        },
        {
          path: 'OrderItem/Create',
          name: 'CreateOrderItem',
          component: OrderItemCreate
        },
        {
          path: 'OrderItem/Delete/:id',
          name: 'DeleteOrderItem',
          component: OrderItemDelete
        },
        {
          path: 'PartRating/Index',
          name: 'PartRatingIndex',
          component: PartRatingIndex
        },
        {
          path: 'PartRating/Edit/:id',
          name: 'EditPartRating',
          component: PartRatingEdit
        },
        {
          path: 'PartRating/Create',
          name: 'CreatePartRating',
          component: PartRatingCreate
        },
        {
          path: 'PartRating/Delete/:id',
          name: 'DeletePartRating',
          component: PartRatingDelete
        },
        {
          path: 'PartCategory/Index',
          name: 'PartCategoryIndex',
          component: PartCategoryIndex
        },
        {
          path: 'PartCategory/Edit/:id',
          name: 'EditPartCategory',
          component: PartCategoryEdit
        },
        {
          path: 'PartCategory/Create',
          name: 'CreatePartCategory',
          component: PartCategoryCreate
        },
        {
          path: 'PartCategory/Delete/:id',
          name: 'DeletePartCategory',
          component: PartCategoryDelete
        },
        {
          path: 'PartInBuild/Index',
          name: 'PartInBuildIndex',
          component: PartInBuildIndex
        },
        {
          path: 'PartInBuild/Edit/:id',
          name: 'EditPartInBuild',
          component: PartInBuildEdit
        },
        {
          path: 'PartInBuild/Create',
          name: 'CreatePartInBuild',
          component: PartInBuildCreate
        },
        {
          path: 'PartInBuild/Delete/:id',
          name: 'DeletePartInBuild',
          component: PartInBuildDelete
        },
        {
          path: 'Warehouse/Index',
          name: 'WarehouseIndex',
          component: WarehouseIndex
        },
        {
          path: 'Warehouse/Edit/:id',
          name: 'EditWarehouse',
          component: WarehouseEdit
        },
        {
          path: 'Warehouse/Create',
          name: 'CreateWarehouse',
          component: WarehouseCreate
        },
        {
          path: 'Warehouse/Delete/:id',
          name: 'DeleteWarehouse',
          component: WarehouseDelete
        },
        {
          path: 'WarehousePart/Index',
          name: 'WarehousePartIndex',
          component: WarehousePartIndex
        },
        {
          path: 'WarehousePart/Edit/:id',
          name: 'EditWarehousePart',
          component: WarehousePartEdit
        },
        {
          path: 'WarehousePart/Create',
          name: 'CreateWarehousePart',
          component: WarehousePartCreate
        },
        {
          path: 'WarehousePart/Delete/:id',
          name: 'DeleteWarehousePart',
          component: WarehousePartDelete
        }
      ]
    },
    { 
      path: '/:pathMatch(.*)',
      component: NotFound 
    }
  ]
});

export default router;
