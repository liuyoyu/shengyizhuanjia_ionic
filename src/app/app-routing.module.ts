import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartAppService} from "./services/start-app.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule',  canActivate: [StartAppService] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'editShop', loadChildren: './pages/edit-shop/edit-shop.module#EditShopPageModule' },
  { path: 'aboutUs', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'categoryList', loadChildren: './pages/category-list/category-list.module#CategoryListPageModule' },
  { path: 'addCategory', loadChildren: './pages/add-category/add-category.module#AddCategoryPageModule' },
  { path: 'editCategory', loadChildren: './pages/edit-category/edit-category.module#EditCategoryPageModule' },
  { path: 'editCategoryName', loadChildren: './pages/edit-category-name/edit-category-name.module#EditCategoryNamePageModule' },
  { path: 'editCategory/:id', loadChildren: './pages/edit-category/edit-category.module#EditCategoryPageModule' },
  { path: 'addProduct', loadChildren: './pages/add-product/add-product.module#AddProductPageModule' },
  { path: 'selectSupplier', loadChildren: './pages/select-supplier/select-supplier.module#SelectSupplierPageModule' },
  { path: 'productList', loadChildren: './pages/product-list/product-list.module#ProductListPageModule' },
  { path: 'productDetails', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'productDetails/:barcode', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'popover', loadChildren: './pages/popover/popover.module#PopoverPageModule' },
  { path: 'modefyInventory', loadChildren: './pages/modefy-inventory/modefy-inventory.module#ModefyInventoryPageModule' },
  { path: 'modefyInventory/:barcode', loadChildren: './pages/modefy-inventory/modefy-inventory.module#ModefyInventoryPageModule' },
  { path: 'log', loadChildren: './pages/log/log.module#LogPageModule' },
  { path: 'changePassword', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
