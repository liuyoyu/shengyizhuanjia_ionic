import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../class/Category';
import {CategoryService} from '../../services/category.service';
import {AlertController, ItemSliding, ModalController, NavController} from '@ionic/angular';
import {EditCategoryNamePage} from '../edit-category-name/edit-category-name.page';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  id: any;
  category: Category;
  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
              private modalCtrl: ModalController, private alertCtrl: AlertController,
              private navCtrl: NavController, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.category = this.categoryService.findCategoryById(this.id); // 获取到商品类别
  }
  /**
   * 展示模态框
   * @param {string} name
   * @returns {Promise<any>}
   */
  private async presentModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: EditCategoryNamePage,
      componentProps: {value: name}
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 编辑商品分类名称
   * @param {ItemSliding} item
   * @returns {Promise<void>}
   */
  async onEditCategoryName(item: ItemSliding) {
    item.close();
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }
  /**
   * 编辑商品子分类名称
   * @param {ItemSliding} item
   * @param {Category} subCategory
   * @returns {Promise<void>}
   */
  async onEditSubCategoryName(item: ItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
  }

  /**
   * 删除商品分类
   * @param {ItemSliding} item
   * @param {number} subId
   * @returns {Promise<void>}
   */
  async onDelete(item: ItemSliding, subId?: number){
    const alert = await this.alertCtrl.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            item.close();
          }
        }, {
          text: '确认',
          handler: () => {
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = this.categoryService.findCategoryById(this.id);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/categoryList');
            } else {
              item.close();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 离开页面时保存修改数据
   */
  ionViewDidLeave() {
    if (this.categoryService.modifyCategory(this.category)) {
      console.log('保存成功');
    } else {
      console.log('保存失败');
    }
  }
  ngOnInit() {
  }

}
