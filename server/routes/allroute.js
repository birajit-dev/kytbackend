const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sessions = require('express-session');
//const allController = require('../controller/allcontroller');
const ApiController = require('../controller/ApiController');
const WebController = require('../controller/WebController');


router.get('/', WebController.homePage); // HOMEPAGE


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
router.post('/api/v1/post/horoscope', ApiController.horoscopePost);





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
router.get('/api/v1/mobile/horoscopeGet', ApiController.horoscopeAPI);
router.get('/api/v1/mobile/horoscopeCategories', ApiController.horoscopeCategoryAPI);
router.get('/api/v1/mobile/panchang', ApiController.panchangAPI);
router.post('/api/v1/mobile/sendotp', ApiController.sendOTP);
router.post('/api/v1/mobile/verifyotp', ApiController.VerifyOTP);
router.post('/api/v1/mobile/resendotp', ApiController.resendOTP);
router.get('/api/v1/mobile/foryou', ApiController.forYou);
router.get('/api/v1/mobile/homescreen', ApiController.homeScreen);
router.get('/api/v1/mobile/settingpromotional', ApiController.settingPromotional);
router.get('/api/v1/allvideos', ApiController.checkAllVideo);





router.get('/api/v1/optimise/videos', ApiController.videoOptimise);
router.get('/otp', WebController.sentot);



//Delete API of Edit API//
router.get('/api/v1/web/deleteVideos', ApiController.deleteVidoes);
router.get('/horoscope', WebController.horoscopePage);
router.get('/mantra', WebController.mantraPage);
router.get('/blogs', WebController.blogs);







//Update Data
router.post('/api/v1/update/vcategory', ApiController.updateVideosCategory);
router.post('/api/v1/update/mantracategory', ApiController.mantraCategoryUpdate);
router.post('/api/v1/post/blogss', ApiController.addBlogs);

//Delete Data
router.get('/api/v1/delete/vsubcategory', ApiController.deleteSubcategoryVideos);
router.get('/api/v1/delete/deletemusic', ApiController.musicDelete);
router.get('/api/v1/delete/deletemantra', ApiController.deleteMantra);





































//ERROR//
//router.get('/error/404', allController.Error);










module.exports = router;
