import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../class/Category";
import {CategoryService} from "../../services/category.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  headTitle: any;
  title1: any;
  category: Category;
  name1: string;
  constructor(private activatedRouter: ActivatedRoute, private categoryService: CategoryService,
              private toastCtrl: ToastController, private router: Router) {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      this.title1 = queryParams.title1;
      if (this.title1 !== '大分类') {
        this.headTitle = '新增小分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      } else {
        this.headTitle = '新增商品分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      }
    });
  }

  /**
   * 新增商品小分类
   */
  addSubCategory() {
      this.category.children.push({
      id: 0,
      name: '',
      children: []
    });
  }

  /**
   * 保存新增分类
   * @returns {Promise<void>}
   */
  async onSave() {
    if (this.title1 === '大分类') { // 增加商品分类
      this.category.name = this.name1;
      if (this.categoryService.insert(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/categoryList');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }

    } else { // 增加商品小分类
      this.category.name = this.title1;
      if (this.categoryService.insertSubCateCategory(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/categoryList');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }
    }
  }

  ngOnInit() {
  }

}
