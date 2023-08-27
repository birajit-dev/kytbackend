const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sessions = require('express-session');
//const allController = require('../controller/allcontroller');
const ApiController = require('../controller/ApiController');
const WebController = require('../controller/WebController');


router.get('/as', WebController.homePage); // HOMEPAGE


//Test Page//
router.get('/admin/user/birajit', ApiController.testPage);

router.post('/api/v1/testone', ApiController.testOnePost);
router.post('/api/v1/post/panchangs', ApiController.pachangPost);
router.post('/api/v2/post/panchangs', ApiController.panchangv2Post);


//----- Know Your Temple --//
router.get('/api/v1/pandeet', WebController.pandeetPage);
router.post('/api/v1/post/pandeet', ApiController.pandeetPost);

//router.post('/api/v1/post/panchang')
//Videos
router.post('/api/v1/post/videoes', ApiController.addVideos);
router.post('/api/v1/post/videos/update', ApiController.updateVideo);
//router.get('/api/v1/videos', WebController.videosPage);
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
router.post('/api/v1/post/music/update', ApiController.updateMusic);
router.get('/api/v1/get/music/delete', ApiController.deleteMusic);



router.post('/api/v1/post/podcast', ApiController.podcastPost);
router.post('/api/v1/post/wishes', ApiController.wishesPost);
router.post('/api/v1/post/horoscope', ApiController.horoscopePost);
//API for Temple Post





router.post('/api/v1/post/templeadd', ApiController.templesAdd);
router.post('/api/v1/edit/templesinfo', ApiController.templesEdit);
//Register for Puja//
router.post('/api/v1/post/registerpuja', ApiController.pujaTemplesAdd);
//Add to Mantra Favourite
router.post('/api/v1/post/lovemantra', ApiController.loveMantra);









//Reels API
router.post('/api/v1/post/reels', ApiController.reelsAdd);
router.post('/api/v1/post/reels/update', ApiController.reelsUpdate);
router.get('/api/v1/get/reels/delete', ApiController.reelsDeleteGET);







//Put Method Update User
router.post('/api/v1/mobile/updateuser', ApiController.updateProfile);
//Delete Method//
router.post('/api/v1/mobile/removemantra', ApiController.deleteMantraLove);
router.post('/api/v1/mobile/razorpay/getupdate', ApiController.razorpayPaymentStatusUpdate);

//Trending Article//
router.post('/api/v1/post/trendingarticle', ApiController.addPost);




//API for GET//
router.get('/api/v1/mobile/podcastall', ApiController.podcastAll);
router.get('/api/v1/mobile/podcastwatch', ApiController.podcastView);
router.get('/api/v1/mobile/mantracategoies', ApiController.mantraCategoryView);
router.get('/api/v1/mobile/mantra', ApiController.mantraByCategory);
router.get('/api/v2/mobile/mantra', ApiController.mantraByCategoryV2);

router.get('/api/v1/mobile/mantraListen', ApiController.mantraListenId);
router.get('/api/v2/mobile/mantraListen', ApiController.mantraListenIdv2);





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
router.get('/api/v2/mobile/panchang', ApiController.panchangAPIV2);
router.post('/api/v1/mobile/sendotp', ApiController.sendOTP);
router.post('/api/v1/mobile/verifyotp', ApiController.VerifyOTP);
router.post('/api/v1/mobile/resendotp', ApiController.resendOTP);
router.post('/api/v1/reels/delete', ApiController.reelsDelete);

router.get('/api/v1/pp', ApiController.pp);

router.get('/api/v1/mobile/foryou', ApiController.forYou);
router.get('/api/v2/mobile/foryou', ApiController.forYouV2);


router.get('/api/v1/mobile/homescreen', ApiController.homeScreen);
router.get('/api/v1/mobile/settingpromotional', ApiController.settingPromotional);
router.get('/api/v1/allvideos', ApiController.checkAllVideo);
router.get('/api/v1/mobile/alltemple', ApiController.templeList);
router.get('/api/v1/mobile/singletemple', ApiController.singleTemples);
router.get('/api/v1/mobile/registerpuja', ApiController.packagesTempleList);
router.get('/api/v1/mobile/getmantralove', ApiController.loveMantraList);
router.get('/api/v1/mobile/getpujapaymentdetails', ApiController.servicesDetailsPage);
router.get('/api/v1/mobile/reels', ApiController.reelsGenerate);
router.get('/api/v1/mobile/watchedvideos', ApiController.getRecentlyWatchedVideos);
router.get('/api/v1/mobile/getprofile', ApiController.getProfile);



router.get('/api/v1/admin/getorder', ApiController.getAllOrderDetails);




//Razorpay//
router.post('/api/v1/mobile/razorpay/orders', ApiController.razorpayGenerateOrder);
router.post('/api/v2/mobile/razorpay/orders', ApiController.testRazor);



//Extra
router.get('/api/v1/admin/getUser', ApiController.getUser);
router.get('/api/v1/admin/allvideos', ApiController.getVideosall);



router.get('/api/v1/optimise/videos', ApiController.videoOptimise);
router.get('/otp', WebController.sentot);



//Delete API of Edit API//
router.get('/api/v1/web/deleteVideos', ApiController.deleteVidoes);
router.get('/horoscope', WebController.horoscopePage);
router.get('/mantra', WebController.mantraPage);
router.get('/blogs', WebController.blogs);
router.get('/api/v1/delete/temple', ApiController.templeDetele);



//Update Data
router.post('/api/v1/update/vcategory', ApiController.updateVideosCategory);
router.post('/api/v1/update/mantracategory', ApiController.mantraCategoryUpdate);
router.post('/api/v1/post/blogss', ApiController.addBlogs);

//Delete Data
router.get('/api/v1/delete/vsubcategory', ApiController.deleteSubcategoryVideos);
router.get('/api/v1/delete/deletemusic', ApiController.musicDelete);
router.get('/api/v1/delete/deletemantra', ApiController.deleteMantra);
router.get('/api/v1/deleted/podcast', ApiController.podcastDelete);
router.get('/api/v1/delete/pujatemple', ApiController.deletePujaTemple);



router.get('/web/videolist', ApiController.videoList);
router.get('/web/videos/delete', ApiController.WebVidoesDelete);
router.get('/web/videos/edit', ApiController.WebVideoEdit);
router.post('/web/videos/update', ApiController.WebVideosUpdate)








//API V2/
router.get('/api/v2/mobile/watchVidoes', ApiController.playVideoV2);




















//Web Routes//
router.get('/', WebController.reelsPost);
router.get('/allreels', WebController.getAllReels);
router.get('/music/add', WebController.musicPost);
router.get('/allmusic', WebController.getAllMusic);
router.get('/music/edit', WebController.editMusic);

router.get('/allvideos', WebController.getAllVidoes);
router.get('/videos/add', WebController.videosPost);
router.get('/api/subcategories/:category', ApiController.getVideosSubcatory);
router.get('/videos/edit', WebController.editVideos);


router.get('/horoscope/add', WebController.horoscopePost);
router.get('/temple/add', WebController.templePost);
router.get('/temple', WebController.templeList);

router.get('/reels/edit', WebController.editReels);






//ERROR//
//router.get('/error/404', allController.Error);










module.exports = router;
