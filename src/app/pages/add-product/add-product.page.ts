import {Component, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionSheetController, AlertController, Events, ModalController, NavController} from '@ionic/angular';
import {Product} from '../../class/Product';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs/index';
import {SupplyService} from '../../services/supply.service';
import {Supply} from '../../class/Supply';
import {SelectSupplierPage} from '../select-supplier/select-supplier.page';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ImagePickerOptions} from '@ionic-native/image-picker';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductPage implements OnInit, OnDestroy {
  subscription: Subscription;
  product: Product;

  constructor(private actionSheetCtrl: ActionSheetController, private productService: ProductService,
              private navCtrl: NavController, private camera: Camera, private categoryService: CategoryService,
              public events: Events, private alertCtrl: AlertController,
              private supplierService: SupplyService, private modalCtrl: ModalController,
              private zone: NgZone, private barcodeScanner: BarcodeScanner,
              private imagePicker: ImagePicker, private router: Router) {
    this.product = this.initProduct();
    this.product.categoryName = '默认分类';
    this.product.supplier = new Supply();
    this.product.supplier.name = '输入商品供应商';
    this.ionViewDidEnter();
    // 观察者
    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory) => {

      },
      (error) => {

      }
    );

  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * 上传图片
   * @returns {Promise<void>}
   */
  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
            this.onCamera();
          }
        }, {
            text: '相册',
              handler: () => {
              console.log('进入相册');
              this.onImagePicker();
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

  /**
   * 保存
   * @param {boolean} ct
   */
  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.product = this.initProduct();
          this.product.categoryName = '默认分类';
          this.product.supplier.name = '输入商品供应商';
        } else {
          this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

  /**
   * 本地没有供应商数据，输入供应商
   */
  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: '新增供货商',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            this.zone.run(() => {
              const supplier = new Supply();
              supplier.name = data.name;
              supplier.phone = data.phone;
              this.supplierService.insert(supplier).then((res) => {
                  if (res.success) {
                    console.log('保存成功');
                    this.product.supplier = supplier;
                  } else {
                    console.log('保存失败');
                  }
              });
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  /**
   * 展示模态框
   * @param {string} name
   * @returns {Promise<any>}
   */
  private async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SelectSupplierPage,
    });
    await modal.present();
    return modal.onWillDismiss();
  }
  /**
   * 点击供应商时，判断本地是否有供应商数据
   */
  async onClickSupplier() {
    let suppliers: Supply[];
    this.supplierService.getAll().then(async (data) => {
      suppliers = data.result;
      if (suppliers.length <= 0) {
        this.presentAlertPrompt(); // 本地没有供应商数据
      } else {
        // 调用模态框
        // console.log('调用模态框');
        const {data} = await this.presentModal();
        if (data) {
          this.product.supplier = data;
        }
      }
    });
  }

  /**
   * 进入页面时订阅
   */
  ionViewDidEnter() {
    // 订阅消息
    this.events.subscribe('category: selected', (category, time) => {
      console.log(category.name, time);
      this.product.category = category;
      this.product.categoryName = category.name;
      this.product.categoryId = category.id;
    });
  }
  /**
   * 离开新增商品页面时，取消订阅
   */
  ionViewLeave() {
    this.events.unsubscribe('category:selected');
  }

  /**
   * 扫描条码
   */
  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  /**
   * 拍照
   */
  onCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  /**
   * 从相册中选取
   */
  onImagePicker() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 4,
      quality: 100
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.product.images.push(results[i]);
      }
    }, (err) => { });
  }

  /**
   * 转跳到商品类别界面
   */
  gotoCategyList() {
    // this.navCtrl.navigateForward('/categoryList');
    this.router.navigateByUrl('/categoryList');
  }

  /**
   * 初始化商品
   * @returns {Product}
   */
  initProduct(): Product {
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      supplier: null, // 供货商
      standard: '', // 规格
      remark: ''
    };
  }
}
