import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from '../../class/Category';
import {CategoryService} from '../../services/category.service';
import {ActionSheetController, Events, NavController} from '@ionic/angular';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryListPage implements OnInit {
  categories: Category[];
  activeCategory: Category;
  subCategories: Category[];
  activeSubCategory: Category;


  constructor(private categoryService: CategoryService,
              private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController, private router: Router,
              private events: Events,
              private location: Location) {
    categoryService.getAll().then((data) => {
      this.categories = data.result;
      // console.log(this.categories);
      if (this.categories != null) {
        this.activeCategory = this.categories[0];
        this.subCategories = this.activeCategory.children;
      }
    });
  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            // this.navCtrl.navigateForward(['/addCategory', {title: this.activeCategory.name}]);
            this.router.navigate(['/addCategory'], {queryParams: {'title': this.activeCategory.name}});
          }
        }, {
          text: '编辑分类',
          handler: () => {
            // this.navCtrl.navigateForward(['/editCategory', this.activeCategory.id]);
            this.router.navigate(['/editCategory', this.activeCategory.id]);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

  selectCategory(category: Category) {
    this.activeCategory = category;
    this.subCategories = this.activeCategory.children;
  }
  ngOnInit() {
  }

  gotoAddCategory() {}

  /**
   * 发布自定义消息，返回上一页面
   * @param {Category} category
   */
  onSelect(category: Category) {
    this.events.publish('category: selected', category, Date.now());
    this.router.navigateByUrl('/addProduct');
    // this.location.back();
  }
}
