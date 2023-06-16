const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sessions = require('express-session');

const allController = require('../controller/allcontroller');
const adminController = require('../controller/admincontroller');
const galleryController = require('../controller/galleryController');
const ibnsAutomation = require('../controller/ibnsScheduler');
const ibns = require('../model/ibns');
const ApiController = require('../controller/ApiController');
const WebController = require('../controller/WebController');


// CLIENT SIDE ROUTE//
router.get('/', allController.homePage); // HOMEPAGE
// router.get('/:cate/:id', allController.newsPage); // NEWS PAGE
// router.get('/:cat', allController.categoryPage); // CATEGORY PAGE
// router.get('/en/pages/:pageurl', allController.pagesection);
// router.get('/photo/neh/gallery/:gurl', galleryController.pageGallery);
// router.get('/topnews/headlines/tripura', allController.topNewsPage);
//router.get('/automation/ibns/all', adminController.ibns);
//router.get('/a/a/a/test', adminController.testi);

//ADMIN SIDE ROUTE//
router.get('/admin/user/dashboard', adminController.adminDashboard);
router.get('/admin/user/login', adminController.adminLogin);
router.get('/admin/user/addnews', adminController.addNews);
router.get('/admin/user/editnews/:id', adminController.editNews); //EDIT NEWS
router.get('/admin/user/addpages', adminController.addPage);
router.get('/admin/user/pagedashboard', adminController.pageDashboard);
router.get('/admin/user/editpage/:id', adminController.editPage);
router.get('/admin/user/addbreaking', adminController.breakingPage);
router.get('/admin/user/listbreaking', adminController.listBreaking);
router.get('/admin/user/editbreaking/:id', adminController.editBreaking)
router.get('/admin/user/addgallery', galleryController.addGallery);
router.get('/admin/user/gallery', galleryController.listGallery);
router.get('/admin/user/addauthor', adminController.addAuthorPage);

//API//
router.post('/admin/user/authcheck', adminController.authAdmin); //AUTHENTICATION OF ADMIN PANEL LOGIN
router.post('/admin/user/postnews', adminController.postNews); // ADD NEWS
router.post('/admin/user/postimage', adminController.upImage); // IMAGE UPLOADER
router.post('/admin/user/updatenews', adminController.updateNews); // EDIT NEWS
router.post('/admin/user/pagepost', adminController.postPage);
router.post('/admin/user/updatepage', adminController.updatePage);
router.post('/admin/user/breaknews', adminController.brNews);
router.post('/admin/user/updatebreaking', adminController.updateBreaking)
router.post('/admin/user/gallerypost', galleryController.postGallery);
router.get('/admin/user/deletenews/:id', adminController.deleteNews);
router.get('/admin/user/deletegallery/:id', adminController.deleteGallery);
router.get('/admin/user/deletebreaking/:id', adminController.deleteBreaking);




//IBNS Automation//
router.get('/ibns/automation/category/sports/do', ibnsAutomation.sports);
router.get('/ibns/automation/category/news/do', ibnsAutomation.news);
router.get('/ibns/automation/category/showbiz/do', ibnsAutomation.showbiz);
router.get('/ibns/automation/category/finance/do', ibnsAutomation.finance);
router.get('/ibns/automation/category/health/do', ibnsAutomation.health);
router.get('/ibns/automation/category/life/do', ibnsAutomation.life);
router.get('/ibns/automation/category/world/do', ibnsAutomation.world);



//SEO 

//API
router.get('/api/v1/search', allController.searchNews);
router.get('/api/v1/album', allController.photoAlbum);
router.get('/api/v1/video', adminController.addVideos);

router.get('/api/v1/allnews', allController.homeAPI);



//Test Page//
router.get('/admin/user/birajit', ApiController.testPage);
router.post('/api/v1/testone', ApiController.testOnePost);


router.post('/api/v1/post/panchangs', ApiController.pachangPost);




//----- Know Your Temple --//
router.get('/api/v1/pandeet', WebController.pandeetPage);
router.post('/api/v1/post/pandeet', ApiController.pandeetPost);

//router.post('/api/v1/post/panchang')

//Videos
router.post('/api/v1/post/videoes', ApiController.addVideos);
router.get('/api/v1/videos', WebController.videosPage);

router.post('/api/v1/post/videos_categories', ApiController.addVcategories);
router.post('/api/v1/post/vsubcatory', ApiController.addVsubCategory);

router.get('/api/v1/vcategory', WebController.addVc);

//Music Categories--
router.get('/api/v1/musiccategories', WebController.mCategoryPage);

//Music Add
router.get('/api/v1/musicadd', WebController.musicPage);



//for Videos categories//
router.get('/api/v1/get/videos', ApiController.categoryVideos);
router.get('/api/v1/watch/videos', ApiController.playVideos);
router.get('/api/v1/get/videoscategories', ApiController.videoesCategories);



//API for post//
router.post('/api/v1/post/mantracategory', ApiController.mantraCategoriesPost);
router.post('/api/v1/post/mantra', ApiController.mantrasPost);
router.post('/api/v1/post/musiccategories', ApiController.addMcategories);
router.post('/api/v1/post/musicadd', ApiController.addMusic);
router.post('/api/v1/post/podcast', ApiController.podcastPost);
router.post('/api/v1/post/wishes', ApiController.wishesPost);



//API for GET//
router.get('/api/v1/mobile/podcastall', ApiController.podcastAll);
router.get('/api/v1/mobile/podcastwatch', ApiController.podcastView);
router.get('/api/v1/mobile/mantracategoies', ApiController.mantraCategoryView);
router.get('/api/v1/mobile/mantra', ApiController.mantraByCategory);
router.get('/api/v1/mobile/mantraListen', ApiController.mantraListenId);
router.get('/api/v1/mobile/musiccategories', ApiController.MusicCategories);
router.get('/api/v1/mobile/musicbycategory', ApiController.MusicFilter);
router.get('/api/v1/mobile/music', ApiController.MusicListen);
router.get('/api/v1/mobile/wishes', ApiController.wishesAPI);
router.get('/api/v1/mobile/vcategory', ApiController.videoesCategories);
router.get('/api/v1/mobile/vsubcategory', ApiController.subCategoryVideos);
router.get('/api/v1/mobile/watchV', ApiController.playVideos);
router.get('/api/v1/mobile/getVideos', ApiController.categoryVideos);


































//ERROR//
router.get('/error/404', allController.Error);










module.exports = router;
