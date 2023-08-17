const { request } = require('express');
var express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { resolve } = require('path');
//const { rejects } = require('assert');
const { all } = require('express/lib/application');
const { assert, error } = require('console');
const fetch = require('node-fetch');
const _ = require('lodash');
const { title } = require('process');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
var moment = require('moment'); // require
//Database Connection
require('../model/database');
const NodeCache = require('node-cache');
const cache = new NodeCache();

//Razorpay Payment Gateway
const Razorpay = require('razorpay');

//Model Requirement
const TestOnePost =  require('../model/testone');
const PanchangModel = require('../model/panchangs');
const PandeetModel = require('../model/pandeet');
const VcategoriesModel = require('../model/videos_categories');
const VideosModel = require('../model/kytvideos');
const MusicModel = require('../model/music');
const MusicCategoriesModel = require('../model/music_categories');
const PodcastModel = require('../model/podcast');
const HoroscopeModel = require('../model/horoscope');
const WishesModel = require('../model/wishes');
const MantraCategoriesModel = require('../model/mantra_categories');
const MantraModel = require('../model/mantra');
const SubCategoryModel =  require('../model/vsubcategory');
const BlogsModel = require('../model/blogs');
const UserModel = require('../model/user');
const TempleModel = require('../model/templeInfo');
const LoveMantraModel = require('../model/lovemantra');
const PujaTemplesModel = require('../model/puja');
const ReelsModel = require('../model/reels');
const WatchedVideoModel =  require('../model/watchedvideos');
const OrderModel = require('../model/orderstatus');
const PostModel  = require('../model/post');
const PanchangV2Model = require('../model/panchangv2');


const { json } = require('body-parser');
const { rmSync } = require('fs');
const puja = require('../model/puja');
const reels = require('../model/reels');
const user = require('../model/user');



const newDate = moment().format('lll');
//Value KEY Generator for Podcast and Videos & Musics
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
console.log(generateString(10));

//End of Key Generator for Podcats and Videos & Musics


        exports.pachangPost = async(req, res) =>{
            try{
                const pData = req.body;
                let uploadPanchang = new PanchangModel({
                    panchang_thumbnail: pData.panchang_thumbnail,
                    panchang_title: pData.panchang_title,
                    panchang_time: pData.panchang_time,
                    festival_description: pData.festival_description,
                    sunrise: pData.sunrise,
                    sunset: pData.sunset,
                    moonrise: pData.moonrise,
                    moonset: pData.moonset,
                    panchang_date: pData.panchang_date,
                    nakshatra: pData.nakshatra,
                    yoga: pData.yoga,
                    karana: pData.karana,
                    month_amanta: pData.month_amanta,
                    month_purnimanta: pData.month_purnimanta,
                    vikram_samvat: pData.vikram_samvat,
                    shaka_samvat: pData.shaka_samvat,
                    sun_sign: pData.sun_sign,
                    moon_sign: pData.moon_sign,
                    sishashool: pData.sishashool,
                    moon_placement: pData.moon_placement,
                    season: pData.season,
                    ayana: pData.ayana,
                    publish_date: pData.publish_date,
                    update_date: newDate                      
                });
                await uploadPanchang.save();
                res.json(uploadPanchang);
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }
        
        //Adding Pandeet Database
        exports.pandeetPost = async(req, res, next) =>{
            try{
                const pData = req.body;
                let upPandeet = new PandeetModel({
                    pandeet_name: pData.pandeet_name,
                    pandeet_email: pData.pandeet_email,
                    pandeet_phone: pData.pandeet_phone,
                    pandeet_address: pData.pandeet_address,
                    pandeet_bio: pData.pandeet_bio,
                    update_date: newDate,
                });
                await upPandeet.save();
                res.send('Pandeet Save Successfully.');
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        //Post Videos Categories
        exports.addVcategories = async(req, res, next) =>{
            try{
                const vData = req.body;
                let upVcategories = new VcategoriesModel({
                    vcategories_title: vData.vcategories_title,
                    categoriesId: vData.categoriesId,
                    vcategories_thumbnail: vData.vcategories_thumbnail,
                    vcategories_keywrods: vData.vcategories_keywrods,
                    vcategories_descriptions: vData.vcategories_descriptions,
                    update_date: newDate,  
                });
                await upVcategories.save();
                res.json(upVcategories)
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addVsubCategory = async(req, res, next) =>{
            try{
                const subData = req.body;
                let upSub = new SubCategoryModel({
                    parentCategory: subData.parentCategory,
                    subcategory_title: subData.subcategory_title,
                    subcategory_Id: subData.subcategory_Id,
                    subcategory_thumbnail: subData.subcategory_thumbnail,
                    update_date: newDate,
                })
                await upSub.save();
                res.json(upSub);
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addVideos = async(req, res) =>{
            
            try{                
            const addV = req.body;
            //Viideo Key Generator
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            function generateString(length) {
                let result = ' ';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            const vKey = generateString(8);
            //Video URL Generator
            const vurl =  addV.videos_title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                let addVideos = new VideosModel({
                    videos_title: addV.videos_title,
                    videos_description: addV.videos_description,
                    videos_category: addV.videos_category,
                    videos_url: vurl,
                    videos_key: vKey,
                    videos_sub_category: addV.videos_sub_category,
                    videos_path: addV.videos_path,
                    videos_keyword: addV.videos_keyword,
                    videos_temple_locate: addV.videos_temple_locate,         
                    videos_thumbnail: addV.videos_thumbnail,
                    videos_publisher: addV.videos_publisher,
                    videos_publish: addV.videos_publish,
                    videos_duration: addV.videos_duration,
                    update_date: newDate,   
                });
                await addVideos.save();
                res.json(addVideos)
                //res.send("Videos Categories Saved,")

            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addMusic = async(req, res) =>{
            try{
                const addM = req.body;
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                function generateString(length) {
                    let result = ' ';
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                const vKey = generateString(9);
                //Video URL Generator
                const vurl =  addM.music_title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

                let adMusic = new MusicModel({
                    music_title: addM.music_title,
                    music_category: addM.music_category,
                    music_subcategory: addM.music_subcategory,
                    music_singer: addM.music_singer,
                    music_thumbnail: addM.music_thumbnail,
                    music_url: vurl,
                    music_key: vKey,
                    music_path: addM.music_path,
                    music_duration: addM.music_duration,
                    music_publisher: addM.music_publisher,
                    update_date: newDate, 
                });
                await adMusic.save();
                res.json(adMusic);
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addMcategories = async(req, res) =>{
            try{
                const addMc = req.body;
                let addMct = new MusicCategoriesModel({
                    mcategories_title: addMc.mcategories_title,
                    mcategories_Id: addMc.mcategories_Id,
                    mcategories_thumbnail: addMc.mcategories_thumbnail,
                    update_date: newDate, 
                });
                await addMct.save();
                res.send("Music Categories Saved");
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        
        
        exports.podcastPost = async(req, res) =>{
            try{
                const podData = req.body;
                let addPodData = new PodcastModel({
                    podcast_title: podData.podcast_title,
                    podcast_description: podData.podcast_description,
                    podcast_url: podData.podcast_url,
                    podcast_key: podData.podcast_key,
                    podcast_path: podData.podcast_path,
                    podcast_thumbnail: podData.podcast_thumbnail,
                    podcast_duration: podData.podcast_duration,
                    update_date: newDate,
                })
                await addPodData.save();
                res.json(addPodData);
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }


        exports.horoscopePost = async(req, res) =>{
            try{
                const horData = req.body;
                let addHoro = new HoroscopeModel({
                    horoscope_title: horData.horoscope_title,
                    horoscope_description: horData.horoscope_description,
                    horoscope_url: horData.horoscope_url,
                    horoscope_category: horData.horoscope_category,
                    horoscope_thumbnail: horData.horoscope_thumbnail,
                    horoscope_date: horData.horoscope_date,
                    horoscope_keyword: horData.horoscope_keyword,
                    hrooscope_publish: horData.hrooscope_publish,
                    update_date: newDate, 
                });
                await addHoro.save();
                res.json(addHoro);
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.wishesPost = async(req, res) =>{
            try{
                const wData = req.body;
                let wishesAdd = new WishesModel({
                    wishes_thumbnail: wData.wishes_thumbnail,
                    wishes_url: wData.wishes_url,
                    wishes_path: wData.wishes_path,
                    wishes_publish: wData.wishes_publish,
                    update_date: newDate,
                });
                await wishesAdd.save();
                res.send("Wishes Post Saved Successfully");
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.mantraCategoriesPost =  async(req, res) =>{
            try{
                const mantraCdata = req.body;
                let mantraCategoriesAdd = new MantraCategoriesModel({
                    mantras_categories_title: mantraCdata.mantras_categories_title,
                    mantra_category_Id: mantraCdata.mantra_category_Id,
                    mantras_categories_thumbnail: mantraCdata.mantras_categories_thumbnail,
                    update_date: newDate,   
                });
                await mantraCategoriesAdd.save();
                res.send("Saved Mantra Categories");
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.mantrasPost = async(req, res) =>{
            try{
                const mantraData = req.body;
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                function generateString(length) {
                    let result = ' ';
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }
                const vKey = generateString(9);
                //Video URL Generator
                const vurl =  mantraData.mantra_title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                let manatraAdd = new MantraModel({
                    mantra_title: mantraData.mantra_title,
                    mantra_path: mantraData.mantra_path,
                    mantra_url: vurl,
                    mantra_key: vKey,
                    mantra_category: mantraData.mantra_category,
                    mantra_sloak: mantraData.mantra_sloak,
                    mantra_thumbnail: mantraData.mantra_thumbnail,
                    mantra_publish: mantraData.mantra_publish,
                    mantra_duration: mantraData.mantra_duration,
                    update_date: newDate,   
                });
                await manatraAdd.save();
                res.send('Mantra Added Successfully');
            }catch(error){
                res.status(400).json({message: error.message});
            }         
        }




        //ALL Videos//
        exports.categoryVideos = async(req, res) =>{
            try{
                const vcategory = req.query.category;
                const subcategory = req.query.subcategory;

                if(vcategory == "all"){
                    const vd = await VideosModel.find().sort({videos_id:-1}).lean();
                    const falseData = {
                        resultFlag: 1,
                        message: "Video SubCategories Available",
                        data: vd
                      };
                    res.json(falseData);    

                }
                else if(subcategory == "all"){
                    const vd = await VideosModel.find({videos_category:vcategory}).sort({videos_id:-1}).lean();
                    const falseData = {
                        resultFlag: 1,
                        message: "Video SubCategories Available",
                        data: vd
                      };
                    const trueData = {
                        resultFlag: 0,
                        message: "Video Subcategories Categories not Available",
                        data: vd
                      };
    
                      let text = "";
                      for(var i=0 ;i<vd.length;i++) {
                          text = vd[0].videos_title;
                      }
                      if(text){
                        res.json(falseData)
                        }else{
                        res.json(trueData);
                        }
                }
                else{
                    const vd = await VideosModel.find({$and:[{videos_category:vcategory},{videos_sub_category:subcategory}]}).sort({videos_id:-1}).lean();
                    const falseData = {
                        resultFlag: 1,
                        message: "Video SubCategories Available",
                        data: vd
                      };
                    const trueData = {
                        resultFlag: 0,
                        message: "Video Subcategories Categories not Available",
                        data: vd
                      };
    
                      let text = "";
                      for(var i=0 ;i<vd.length;i++) {
                          text = vd[0].videos_title;
                      }
                      if(text){
                        res.json(falseData)
                        }else{
                        res.json(trueData);
                        }
                    
                }


            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.playVideos = async(req, res) =>{
            try{

                const vkey = req.query.vkey;
                const watch_videos = await VideosModel.findOne({videos_key:vkey},{"videos_url":0,"videos_keyword":0,"videos_temple_locate":0,"videos_key": 0,"videos_publish":0}).lean();
                const obj1 = {
                    resultFlag: 1,
                    message: "Video Found",
                  };
                  
                  const object_false = {
                    resultFlag: 0,
                    message: "Video Not Found",
                  };
                  
                  let mergedObj;
                  
                  if (watch_videos) {
                    mergedObj = Object.assign({}, obj1, watch_videos);
                    if (watch_videos.videos_category) {
                      res.json(mergedObj);
                    } else {
                      res.json(object_false);
                    }
                  } else {
                    res.json(object_false);
                  }
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        //all category show//
        exports.videoesCategories = async(req, res) =>{
            try{
                const vcategories = await VcategoriesModel.find({}).lean();
                const data = {
                    resultFlag: 1,
                    message: "Video Categories Available",
                    data: vcategories
                  };
                  res.json(data);
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.subCategoryVideos = async(req, res) =>{
            const category = req.query.category;
            const subv = await SubCategoryModel.find({parentCategory:category}).sort({sub_category_id:-1}).lean();
            const trueData = {
                resultFlag: 0,
                message: "Video Subcategories Categories not Available",
                data: subv
            };
            const falseData = {
                            resultFlag: 1,
                            message: "Video SubCategories Available",
                            data: subv
            };
            let text = "";
            for(var i=0 ;i<subv.length;i++) {
                text = subv[0].parentCategory;
            }
            if(text){
                res.json(falseData)
            }else{
                res.json(trueData);
            }
            // if(text === null){
            //     res.json("is null")
            // }else{
            //     res.json("not null");
            // }
        }




        //Podcast View//
        exports.podcastAll = async(req, res) =>{
            const page = req.query.page || 1; // Current page number, defaulting to 1
            const limit = req.query.limit || 10; // Number of records per page, defaulting to 10
            const countPromise = PodcastModel.countDocuments({});
            const dataPromise = PodcastModel.find({})
            .sort({ podcast_id: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
            const [totalRecords, podcast] = await Promise.all([countPromise, dataPromise]);
            const totalPages = Math.ceil(totalRecords / limit);
            const resultFlag = podcast.length > 0 ? 1 : 0;
            const message = podcast.length > 0 ? "Podcast Records Found" : "Podcast Record Not Found";
            const responseData = {
            resultFlag,
            message,
            data: podcast,
            totalCount: totalRecords,
            totalPages,
            currentPage: page,
            };
            res.json(responseData);
        }
        exports.podcastView = async(req, res) =>{
            const pKey = req.query.pKey;
            const podcastWatch = await PodcastModel.findOne({ podcast_key: pKey }).lean();

            if (podcastWatch && podcastWatch.podcast_path) {
            const responseData = {
                resultFlag: 1,
                message: "Podcast Record Found",
                ...podcastWatch,
            };
            res.json(responseData);
            } else {
            const responseData = {
                resultFlag: 0,
                message: "Podcast Record Not Found",
            };
            res.json(responseData);
            }
        }
        

        //Mantra All/
        exports.mantraCategoryView = async(req, res) =>{
            const mantraCAll = await MantraCategoriesModel.find({}).sort({mantra_categories_id:-1}).lean();
            const trueData = {
                resultFlag: 1,
                message: "Mantra Categories Record Found",
                data: mantraCAll
              };
            res.json(trueData);
        }

        exports.mantraByCategory = async(req, res) =>{
            const mantraId = req.query.category;
            const page = req.query.page || 1; // Current page number, defaulting to 1
            const limit = req.query.limit || 10; // Number of records per page, defaulting to 10
            const skip = (page - 1) * limit;
            const countPromise = MantraModel.countDocuments({ mantra_category: mantraId });
            const dataPromise = MantraModel.find({ mantra_category: mantraId })
            .sort({ mantra_id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
            const [totalRecords, mantrabycategory] = await Promise.all([countPromise, dataPromise]);
            const totalPages = Math.ceil(totalRecords / limit);
            const resultFlag = mantrabycategory.length > 0 ? 1 : 0;
            const message = mantrabycategory.length > 0 ? "Mantra Records Found" : "Mantra Records Not Found";
            const responseData = {
            resultFlag,
            message,
            data: mantrabycategory,
            totalCount: totalRecords,
            totalPages,
            currentPage: page,
            };
            res.json(responseData);
        }

        exports.mantraListenId = async(req, res) =>{
            const mantraKey = req.query.mantraKey;
            const manstraStream = await MantraModel.findOne({mantra_key:mantraKey}).lean();
                const obj1 = {
                    resultFlag: 1,
                    message: "Mantra Audio Found",
                  };
                  const object_false = {
                    resultFlag: 0,
                    message: "Mantra Audio Not Found",
                  };
                  
                  let mergedObj;
                  
                  if (manstraStream) {
                    mergedObj = Object.assign({}, obj1, manstraStream);
                    if (manstraStream.mantra_category) {
                      res.json(mergedObj);
                    } else {
                      res.json(object_false);
                    }
                  } else {
                    res.json(object_false);
                  }
        }




        //Musci API/
        exports.MusicCategories = async(req, res) =>{
            const musicCategory = await MusicCategoriesModel.find({}).sort({music_categories_id:-1}).lean();
            const trueData = {
                resultFlag: 1,
                message: "Music Categories Record Found",
                data: musicCategory
              };
            res.json(trueData);
        }

        exports.MusicFilter = async(req, res) =>{
            const category = req.query.category;
            const subcategory = req.query.subcategory;
            const page = req.query.page || 1; // Current page number, defaulting to 1
            const limit = req.query.limit || 10; // Number of records per page, defaulting to 10
            let filter = { music_category: category };
            if (subcategory !== "all") {
            filter.music_subcategory = subcategory;
            }
            const countPromise = MusicModel.countDocuments(filter);
            const dataPromise = MusicModel.find(filter)
            .sort({ music_id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
            const [totalRecords, musicFilter] = await Promise.all([countPromise, dataPromise]);
            const totalPages = Math.ceil(totalRecords / limit);
            const resultFlag = musicFilter.length > 0 ? 1 : 0;
            const message = musicFilter.length > 0 ? "Music Record Found" : "Music Record not Found";
            const responseData = {
            resultFlag,
            message,
            data: musicFilter,
            totalCount: totalRecords,
            totalPages,
            currentPage: page,
            };
            res.json(responseData);
            
        }
        exports.MusicListen = async(req, res) =>{
            const musicKey = req.query.musicKey;
            const listen = await MusicModel.findOne({ music_key: musicKey }).lean();
            if (listen && listen.music_category) {
            const responseData = {
                resultFlag: 1,
                message: "Music Audio Found",
                ...listen,
            };
            res.json(responseData);
            } else {
            const responseData = {
                resultFlag: 0,
                message: "Music Audio Not Found",
            };
            res.json(responseData);
            }
        }

        //Wishes/
        exports.wishesAPI = async(req, res) =>{
            const pageSize = 10; // Number of documents to retrieve per page
            const page = req.query.page || 1; // Current page number (default: 1)

            const countPromise = WishesModel.countDocuments({});
            const skipDocuments = (page - 1) * pageSize;

            const [count, wish] = await Promise.all([
            countPromise,
            WishesModel.find({})
                .sort({ wishes_id: -1 })
                .skip(skipDocuments)
                .limit(pageSize)
                .lean()
            ]);

            const totalPages = Math.ceil(count / pageSize);
            const hasData = wish && wish.length > 0;

            const falseData = {
            resultFlag: 1,
            message: "Wishes Record Found",
            data: wish,
            totalPages: totalPages,
            totalCount: count
            };

            const trueData = {
            resultFlag: 0,
            message: "Wishes Record Not Found",
            data: wish,
            totalPages: totalPages,
            totalCount: count
            };

            res.json(hasData ? falseData : trueData);
        }



        exports.videoOptimise = async(req, res) =>{
            try {
                const vcategory = req.query.category;
                const subcategory = req.query.subcategory;
              
                let query = {};
              
                if (vcategory !== "all") {
                  query.videos_category = vcategory;
                }
              
                if (subcategory !== "all") {
                  query.videos_sub_category = subcategory;
                }
              
                const vd = await VideosModel.find(query).sort({ videos_id: -1 }).lean();
              
                const falseData = {
                  resultFlag: 1,
                  message: "Video SubCategories Available",
                  data: vd
                };
              
                const trueData = {
                  resultFlag: 0,
                  message: "Video Subcategories Categories not Available",
                  data: vd
                };
              
                const hasData = vd.length > 0;
              
                res.json(hasData ? falseData : trueData);
              } catch (error) {
                res.json("Something Went Wrong")
              }
        }


        









    




   
    


exports.testOnePost = async(req, res, next) =>{
    const mData = req.body;
    let upYouTube = new TestOnePost({
        name: mData.name,
        fname: mData.fname,
        english:mData.english,
    });
    await upYouTube.save();
    res.send("Hello World");
    //res.status(200).json("Success");      
    }

    exports.testPage = async(req, res) =>{
    res.render('test');
    }



    //User Creations and Verify//
    exports.registerUser = async(req, res) =>{
        let mno = req.body;
        const userCheck = await UserModel.findOne({phone_no:mno.phone}).lean();
        if(userCheck.phone_no == mno.phone){
            //send response and otp
            const m_otp = "1234";
            res.json(m_otp);
            return;
        }
            const m_otp = "1234";
            let userCreate = new UserModel({
                phone_no: mno.phone,
                phone_otp: m_otp,
                update_date: newDate,
            });
            let userSave = await userCreate.save();
            res.json(userSave);
    }
    exports.verifyOtp = async(req, res) =>{
        const mobile_no = req.body;
        const mobile_otp = req.body;
        const checkOtp = await OtpModel.findOne({$and:[{phone_no:mobile_no},{phone_otp:mobile_otp}]}).lean();
        const falseData = {
            resultFlag: 1,
            message: "Success",
            data: checkOtp
          };
        const trueData = {
            resultFlag: 0,
            message: "Not Match",
            data: checkOtp
          };

          let text = "";
          for(var i=0 ;i<checkOtp.length;i++) {
              text = checkOtp[0].phone_no;
          }
          if(text){
            res.json(falseData)
            }else{
            res.json(trueData);
            }
    }
    
    exports.deleteVidoes = async(req, res) =>{
        let vid = req.query.id;
        VideosModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Videos Deleted");
                }
                else{
                    res.json("Videos Can not Delete");
                }
            }); 
    }


    exports.horoscopeAPI = async(req, res) =>{
        const sign = req.query.sign;
        const hdeatails = await HoroscopeModel.findOne({ horoscope_category: sign }).sort({ horoscope_id: -1 }).lean();
        const obj1 = {
            resultFlag: 1,
            message: "Horoscope Record Found",
          };
          
          const object_false = {
            resultFlag: 0,
            message: "Horoscope Record Not Found",
          };
          
          let mergedObj;
          
          if (hdeatails) {
            mergedObj = Object.assign({}, obj1, hdeatails);
            if (hdeatails.horoscope_category) {
              res.json(mergedObj);
            } else {
              res.json(object_false);
            }
          } else {
            res.json(object_false);
          }
    }

    exports.horoscopeCategoryAPI = async(req, res) =>{
        const obj1 = {
            resultFlag: 1,
            message: "Horoscope Record Found",
            data:[
                {
                    "_id":"1",
                    "horoscope_title": "Aries",
                    "category":"aries",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/aries.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"2",
                    "horoscope_title": "Taurus",
                    "category":"taurus",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"3",
                    "horoscope_title": "Gemini",
                    "category":"gemini",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/gemini.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"4",
                    "horoscope_title": "Cancer",
                    "category":"cancer",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/cancer.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"5",
                    "horoscope_title": "Leo",
                    "category":"leo",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/leo.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"6",
                    "horoscope_title": "Virgo",
                    "category":"virgo",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/virgo.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"7",
                    "horoscope_title": "Scorpio",
                    "category":"scorpio",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/scorpio.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"8",
                    "horoscope_title": "Sagittarius",
                    "category":"sagittarius",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/sagittarius.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"9",
                    "horoscope_title": "Capricorn",
                    "category":"capricorn",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/capricorn.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"10",
                    "horoscope_title": "Aquarius",
                    "category":"aquarius",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/aquarius.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"11",
                    "horoscope_title": "Pisces",
                    "category":"pisces",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/pisces.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"12",
                    "horoscope_title": "Libra",
                    "category":"libra",
                    "thumbnail_sign":"https://kytstorage.b-cdn.net/Thumbnails/Horoscope/libra.jpg",
                    "update_date":"19/06/2023",
                }
            ]
        };
        res.json(obj1);
    }

    exports.panchangAPI = async(req, res) =>{
        const pdate = req.query.pdate;
        const panchangFetch = await PanchangModel.findOne({ publish_date: pdate }).lean();
        const resultFlag = panchangFetch ? 1 : 0;
        const message = panchangFetch ? "Panchang Record Found" : "Panchang Record Not Found";
        const responseData = {
        resultFlag,
        message,
        ...(panchangFetch && { ...panchangFetch }),
        };
        res.json(responseData);
    }





//     exports.sendOTP = async (req, res) => {
//         const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
//         //const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
//         const otp = "1234";
//         const phoneCheck = await UserModel.findOne({ phone_no: phoneNumber }).lean();
      
//         if (phoneCheck) {
//           // Phone number exists in the database
//           cache.set(phoneNumber, otp.toString(), 300);
//           console.log(otp);
//           const obj1 = {
//             resultFlag: 1,
//             message: "OTP sent successfully",
//           };
//           res.json(obj1);

//           console.log("match");
//         } else {
//           // Phone number doesn't exist in the database
//           const newDate = new Date(); // Replace with your desired date logic
//           const insertData = new UserModel({
//             phone_no: phoneNumber,
//             phone_otp: otp,
//             otp_session: otp,
//             update_date: newDate,
//           });
//           await insertData.save();
//           console.log("does not match");
      
//           // Send the OTP via SMS using your preferred SMS gateway/provider
//           // Replace the following line with your actual SMS sending logic
//           // sendSMS(phoneNumber, `Your OTP is: ${otp}`);
      
//           cache.set(phoneNumber, otp.toString(), 300);
//           console.log(otp);
//           const obj1 = {
//             resultFlag: 1,
//             message: "OTP sent successfully",
//           };
//           res.json(obj1);
//         }
//       };
      
      
    
    
  
//         //Endpoint to resend OTP via SMS
//         exports.resendOTP = (req, res) => {
//             const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
        
//             const otp = cache.get(phoneNumber);
        
//             if (otp) {
//             // Resend the OTP via SMS using your preferred SMS gateway/provider
//             // Replace the following line with your actual SMS sending logic
//             //sendSMS(phoneNumber, `Your OTP is: ${otp}`);
//             console.log("Your Resend OTP")
//             console.log(otp)
//             const obj1 = {
//                 resultFlag: 1,
//                 message: "OTP resent successfully",
//               };
//               res.json(obj1);
//             } else {
//                 const obj2 = {
//                     resultFlag: 0,
//                     message: "OTP expired or not found",
//                   };
//                   res.json(obj2);
//             }
//         };
  
//   // Endpoint to verify OTP
//         exports.VerifyOTP = (req, res) => {
//             const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
//             const otp = req.body.otp; // Assuming the OTP is sent in the request body
        
//             const cachedOTP = cache.get(phoneNumber);
        
//             if (cachedOTP && cachedOTP === otp) {
//             // OTP matched, perform the necessary actions (e.g., login, account creation)
        
//             // Remove the OTP from cache after successful verification
//             cache.del(phoneNumber);
//             const obj1 = {
//                 resultFlag: 1,
//                 message: "OTP verified successfully",
//               };
//             res.json(obj1);
            
//             } else {
//                 const obj2 = {
//                     resultFlag: 0,
//                     message: "Invalid OTP",
//                   };
//                   res.json(obj2);
//             }
//         };


        exports.forYou = async(req, res) =>{
            const mantra = await MantraModel.find({}).sort({mantra_id:-1}).limit(4).lean();
            const music = await MusicModel.find({}).sort({music_id:-1}).limit(8).lean();
            const promotional_title = "Promotional Title";
            const promotional_thumbnail = "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=";
            const music_title = "Music for you";
            const mantras_title = "Mantras For You";
            const today_title = "Today Title";
            const today_content_short_description ="short_content"
            const today_content = "Today Content";
            const obj1 = {
                resultFlag: 1,
                message: "For You Record Found",
                today_title,
                today_content_short_description,
                today_content,
                mantras_title,
                mantrasList:mantra,
                promotional_title,
                promotional_thumbnail,
                music_title,
                musicList:music
              };
            res.json(obj1);
        }

        exports.homeScreen = async(req, res) =>{
            const homeSliderVideo = await VideosModel.find({}).sort({videos_id:-1}).limit(5).lean();
            const ShivCategory = await VideosModel.find({videos_category:'shiv_ji'}).sort({videos_id:-1}).limit(5).lean();
            const VishnuCategory = await VideosModel.find({videos_category:'vishnu_ji'}).sort({videos_id:-1}).limit(5).lean();
            const Rishi = await VideosModel.find({videos_category:'rishi'}).sort({videos_id:-1}).limit(5).lean();
            const Mahatma = await VideosModel.find({videos_category:'mahatma'}).sort({videos_id:-1}).limit(5).lean();
            const Shakti = await VideosModel.find({videos_category:'shakti'}).sort({videos_id:-1}).limit(5).lean();
            const trendingPost = await PostModel.find({}).sort({post_id:-1}).limit(5).lean();
            const reelsGet = await ReelsModel.aggregate([
                { $sample: { size: 10 } },
                { $project: { _id: 0 } }, // Exclude the _id field from the response
              ]);
            
            const object1 = {
               resultFlag: 1,
               message: "Homescreen Records Found",
               data:[
                {
                    "title": "homebanner",
                    "viewtype": "banner",
                    "list": homeSliderVideo,
                },
                {
                    "title": "Shiv Ji",
                    "viewtype": "horizontal",
                    "categoryId":"shiv_ji",
                    "list": ShivCategory,
                },
                {
                    "title": "Vishnu Ji",
                    "viewtype": "horizontal",
                    "categoryId":"vishnu_ji",
                    "list": VishnuCategory,
                },
                {
                    "title": "Rishi",
                    "viewtype": "horizontal",
                    "categoryId":"rishi",
                    "list": Rishi,
                },
                {
                    "title": "Mahatma",
                    "viewtype": "horizontal",
                    "categoryId":"mahatma",
                    "list": Mahatma,
                },
                {
                    "title": "Shakti",
                    "viewtype": "horizontal",
                    "categoryId":"shakti",
                    "list": Shakti,
                },
                {
                    "title": "Shorts",
                    "viewtype": "shorts",
                    "categoryId":"shorts",
                    "list": reelsGet,   
                },
                {
                    "title": "Bholenath",
                    "description": "Image descriptions",
                    "viewtype": "photos",
                    "categoryId": "bolenath_photos",
                    "list": [
                        {
                            "_id" : "1",
                            "videos_title" : "Image 1",
                            "image_thumbnail": "https://kytstorage.b-cdn.net/Thumbnails/Nabhi Kamal.jpg"
                        },
                        {
                            "_id" : "2",
                            "videos_title" : "Image 2",
                            "image_thumbnail": "https://kytstorage.b-cdn.net/Thumbnails/Kapilmuni.jpg"
                        },
                        {
                            "_id" : "3",
                            "videos_title" : "Image 3",
                            "image_thumbnail": "https://kytstorage.b-cdn.net/Thumbnails/Nabhi Kamal.jpg"
                        },
                        {
                            "_id" : "4",
                            "videos_title" : "Image 4",
                            "image_thumbnail": "https://kytstorage.b-cdn.net/Thumbnails/Kapilmuni.jpg"
                        }
                    ]
                },{
                    "title": "Trending Articles",
                    "viewtype": "trendingArticles",
                    "categoryId": "trendingArticles",
                    "list": trendingPost
                }
                
               ]
            }
            res.json(object1);
        }
  
    

        exports.sendOTP = async (req, res) => {
            const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
            //const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
            const otp = "1234";
            const phoneCheck = await UserModel.findOne({ phone_no: phoneNumber }).lean();
          
            if (phoneCheck) {
              // Phone number exists in the database
              await UserModel.updateOne({ phone_no: phoneNumber }, { $set: { phone_otp: otp } });
              console.log(otp);
              const obj1 = {
                resultFlag: 1,
                message: "OTP sent successfully",
              };
              res.json(obj1);
            } else {
              // Phone number doesn't exist in the database
              const newDate = new Date(); // Replace with your desired date logic
              const insertData = new UserModel({
                phone_no: phoneNumber,
                phone_otp: otp,
                otp_session: otp,
                update_date: newDate,
              });
              await insertData.save();
              console.log("does not match");
          
              // Send the OTP via SMS using your preferred SMS gateway/provider
              // Replace the following line with your actual SMS sending logic
              // sendSMS(phoneNumber, `Your OTP is: ${otp}`);
          
              console.log(otp);
              const obj1 = {
                resultFlag: 1,
                message: "OTP sent successfully",
              };
              res.json(obj1);
            }
        };
          
          
          // Endpoint to resend OTP via SMS
          exports.resendOTP = async (req, res) => {
            const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
          
            const phoneData = await UserModel.findOne({ phone_no: phoneNumber }).lean();
          
            if (phoneData) {
              const otp = "1234"; // Generate a new OTP
              await UserModel.updateOne({ phone_no: phoneNumber }, { $set: { phone_otp: otp } });
          
              // Resend the OTP via SMS using your preferred SMS gateway/provider
              // Replace the following line with your actual SMS sending logic
              // sendSMS(phoneNumber, `Your OTP is: ${otp}`);
              console.log("Your Resend OTP");
              console.log(otp);
          
              const obj1 = {
                resultFlag: 1,
                message: "OTP resent successfully",
              };
              res.json(obj1);
            } else {
              const obj2 = {
                resultFlag: 0,
                message: "Phone number not found",
              };
              res.json(obj2);
            }
          };
          
          
          // Endpoint to verify OTP
          exports.VerifyOTP = async (req, res) => {
            const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
            const otp = req.body.otp; // Assuming the OTP is sent in the request body
          
            const phoneData = await UserModel.findOne({ phone_no: phoneNumber }).lean();
          
            if (phoneData && phoneData.phone_otp === otp) {
              // OTP matched, perform the necessary actions (e.g., login, account creation)
          
              // Remove the OTP from the user's data after successful verification
              await UserModel.updateOne({ phone_no: phoneNumber }, { $unset: { phone_otp: "" } });
          
              const obj1 = {
                resultFlag: 1,
                message: "OTP verified successfully",
              };
              res.json(obj1);
            } else {
              const obj2 = {
                resultFlag: 0,
                message: "Invalid OTP",
              };
              res.json(obj2);
            }
          };
                  



exports.senOTPWEB = async (req, res) => {
  const phoneNumber = req.body.phoneNumber; // Assuming the phone number is sent in the request body
  const otp = "1234";
  const phoneCheck = await UserModel.findOne({ phone_no: phoneNumber }).lean();

  if (phoneCheck) {
    // Phone number exists in the database
    await UserModel.updateOne({ phone_no: phoneNumber }, { $set: { phone_otp: otp } });

    const obj1 = {
      resultFlag: 1,
      message: "OTP sent successfully",
    };
    res.json(obj1);
  } else {
    // Phone number doesn't exist in the database
    const newDate = new Date(); // Replace with your desired date logic
    const insertData = new UserModel({
      phone_no: phoneNumber,
      phone_otp: otp,
      otp_session: otp,
      update_date: newDate,
    });
    await insertData.save();

    // Send the OTP via MSG91 SMS gateway
    const msg91AuthKey = 'YOUR_MSG91_AUTH_KEY';
    const msg91SenderId = 'YOUR_MSG91_SENDER_ID';
    const msg91Route = '4'; // Promotional route
    const msg91Url = `http://api.msg91.com/api/sendhttp.php?authkey=${msg91AuthKey}&mobiles=${phoneNumber}&message=${encodeURIComponent(`Your OTP is: ${otp}`)}&sender=${msg91SenderId}&route=${msg91Route}&country=91`;

    request(msg91Url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body); // Use body to handle the response from MSG91
        const obj1 = {
          resultFlag: 1,
          message: "OTP sent successfully",
        };
        res.json(obj1);
      } else {
        console.error(error); // Handle the error occurred during the API request
        const obj1 = {
          resultFlag: 0,
          message: "Failed to send OTP",
        };
        res.json(obj1);
      }
    });
  }
};

  exports.settingPromotional = async(req, res) =>{
      const object1 = {
          resultFlag: 1,
          message: "Promotional Data Found",
          promotional_2_thumbnail: "https://fastly.picsum.photos/id/237/200/300.jpg?hmac="
      }
      res.json(object1);
  }



    exports.updateVideosCategory = async(req, res) =>{
        const getData = req.body;
        VcategoriesModel.findByIdAndUpdate(getData.id, 
            {   
            vcategories_title: getData.vcategories_title,
            categoriesId: getData.categoriesId,
            vcategories_thumbnail: getData.vcategories_thumbnail,
            update_date: newDate, 
            }, function(err, data) {
            if(err){
                res.json("Something Went Wrong")
            }
            else{
                res.json(data);
            }
            });
    }

    exports.mantraCategoryUpdate = async(req, res) =>{
        const getData = req.body;
        MantraCategoriesModel.findByIdAndUpdate(getData.id,{
            mantras_categories_title: getData.mantras_categories_title,
            mantra_category_Id: getData.mantra_category_Id,
            mantras_categories_thumbnail: getData.mantras_categories_thumbnail,
            update_date: newDate,   
        }, function(err, data) {
            if(err){
                res.json("Something Went Wrong")
            }
            else{
                res.json(data);
            }
        });
    }

    exports.musicDelete = async(req, res) =>{
        let vid = req.query.id;
        MusicModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Videos Subcatory Deleted");
                }
                else{
                    res.json("Videos Subcategory Deleted");
                }
        }); 
    }

    exports.deleteSubcategoryVideos = async(req, res) =>{
        let vid = req.query.id;
        SubCategoryModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Videos Subcatory Deleted");
                }
                else{
                    res.json("Videos Subcategory Deleted");
                }
            }); 
    }

    exports.deleteMantra = async(req, res) =>{
        let vid = req.query.id;
        MantraModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Videos Subcatory Deleted");
                }
                else{
                    res.json("Videos Subcategory Deleted");
                }
            }); 
    }

    exports.addBlogs = async(req, res) =>{
        const add = req.body;
        const addB = new BlogsModel({
            title: add.title,
            url: add.url,
            description: add.description,
            thumbnail: add.thumbnail,
            category: add.category,
            keyword: add.keyword,
            update_date: newDate, 
        });
        const hh = await addB.save();
        res.json(hh);
    }
    
    exports.checkAllVideo = async(req, res) =>{
        const all = await VideosModel.find({}).lean();
        res.json(all);
    }


    exports.videoList = async(req, res) =>{
        const vall = await VideosModel.find({}).lean();
        res.render('videolist',{
            vall
        })
    }

    exports.WebVideosUpdate = async(req,res) => {
        const addV = req.body;
        VideosModel.findByIdAndUpdate(addV.id, 
            {   
                    videos_title: addV.videos_title,
                    videos_description: addV.videos_description,
                    videos_category: addV.videos_category,
                    videos_url: addV.vurl,
                    videos_key: addV.vKey,
                    videos_sub_category: addV.videos_sub_category,
                    videos_path: addV.videos_path,
                    videos_keyword: addV.videos_keyword,
                    videos_temple_locate: addV.videos_temple_locate,         
                    videos_thumbnail: addV.videos_thumbnail,
                    videos_publisher: addV.videos_publisher,
                    videos_publish: addV.videos_publish,
                    videos_duration: addV.videos_duration,
                    update_date: newDate,   
            }, function(err, data) {
            if(err){
                res.json("Something Went Wrong")
            }
            else{
                res.json(data);
            }
            });   
    }


    exports.podcastDelete = async(req, res) =>{
        let vid = req.query.id;
        PodcastModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Podcast Can not Deleted.");
                }
                else{
                    res.json("Podcast Deleted");
                }
            });    
    }



    exports.WebVidoesDelete = async(req, res) =>{
        let vid = req.query.id;
        VideosModel.remove({_id:vid}, 
            function(err, data) {
                if(err){
                    res.json("Videos Deleted");
                }
                else{
                    res.json("Videos Deleted");
                }
            }); 
    }

    exports.WebVideoEdit = async(req, res) =>{
        let vid = req.query.id;
        const v = await VideosModel.findById(vid).lean();
        res.render('videoedit',{
            v
        })
    }

    //Temples Information Controller
    exports.templesAdd =  async(req, res) =>{
        const data = req.body;
        const t_code = generateString(12);
        let addTemples = new TempleModel({
            name: data.name,
            summary: data.summary,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            about: data.about,
            temple_status: data.temple_status,
            temple_status_text: data.temple_status_text,
            temple_cover_photo: data.temple_cover_photo,
            temple_round_photo: data.temple_round_photo,
            temple_phone: data.temple_phone,
            status: data.status,
            coordinates: {
                type: 'Point',
                coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
              },
            temple_code:t_code,
            temple_timings:data.temple_timings,
            update_date: newDate,
        });
        let ds = addTemples.save();
        res.json(ds);
    }
    exports.templesEdit = async(req, res) =>{
        let data = req.body;
        TempleModel.findByIdAndUpdate(data.id,{
            name: data.name,
            summary: data.summary,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            about: data.about,
            temple_status: data.temple_status,
            temple_cover_photo: data.temple_cover_photo,
            temple_round_photo: data.temple_round_photo,
            temple_phone: data.temple_phone,
            temple_code: data.t_code,
            sunday: data.sunday,
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday,
            satuarday: data.satuarday,
            update_date: newDate,
        },function(err, data) {
            if(err){
                res.json("Something Went Wrong")
            }
            else{
                res.json(data);
            }
            });
    }
    exports.templeDetele = async(req, res) =>{
        let id = req.query.id;
        TempleModel.remove({_id:id}, 
            function(err, data) {
                if(err){
                    res.json("Temples Not Deleted");
                }
                else{
                    res.json("Temples info Deleted");
                }
            });    
    }
    
    exports.templeList = async (req, res) => {
        // Create the 2dsphere index on the "coordinates" field
        TempleModel.collection.createIndex({ coordinates: '2dsphere' }, (err) => {
            if (err) {
            console.error('Error creating 2dsphere index:', err);
            } else {
            console.log('2dsphere index created successfully.');
            }
        });  

        const { latitude, longitude, page } = req.query; // Use req.query to access query parameters
        const itemsPerPage = 10; // Number of items to display per page
      
        // Validate the page parameter
        if (isNaN(page) || page < 1) {
          res.status(400).json({ error: 'Invalid page number. Page must be a positive integer.' });
          return;
        }
      
        const skip = (page - 1) * itemsPerPage; // Calculate the number of items to skip
      
        try {
          const temples = await TempleModel.aggregate([
            {
              $geoNear: {
                near: {
                  type: 'Point',
                  coordinates: [parseFloat(longitude), parseFloat(latitude)], // Note the order: [longitude, latitude]
                },
                distanceField: 'distance',
                spherical: true,
                distanceMultiplier: 0.001, // Convert meters to kilometers
              },
            },
            {
              $project: {
                name: 1,
                distance: { $toInt: '$distance' },
                summary: 1,
                address: 1,
                latitude: 1,
                longitude: 1,
                about: 1,
                temple_status: 1,
                temple_status_text: 1,
                temple_cover_photo: 1,
                temple_round_photo: 1,
                temple_code: 1,
                temple_phone: 1,
                update_date: { $toDate: '$update_date' }, // Assuming update_date is stored as a Date field
              },
            },
            {
              $skip: skip, // Skip the specified number of items
            },
            {
              $limit: itemsPerPage, // Limit the number of items per page
            },
          ]);
      
          if (temples && temples.length > 0) {
            console.log('Found nearby places.');
            temples.forEach((temple) => {
              console.log('Nearest place:', temple.name);
              console.log('Distance (km):', temple.distance);
            });
      
            res.json({
              resultFlag: 1,
              message: 'Nearby temples found',
              data: temples,
              totalCount: temples.length,
              totalPages: Math.ceil(temples.length / itemsPerPage),
              currentPage: parseInt(page),
            });
          } else {
            console.log('No nearby places found.');
            res.json({
              resultFlag: 0,
              message: 'No nearby places found.',
              data: [],
              totalCount: 0,
              totalPages: 0,
              currentPage: parseInt(page),
            });
          }
        } catch (error) {
          console.error('Error finding nearest place:', error);
          res.status(500).json({ resultFlag: 0, message: 'Internal server error', data: [], totalCount: 0, totalPages: 0, currentPage: parseInt(page) });
        }
      };


      exports.singleTemples = async (req, res) => {
        const { code } = req.query; // Assuming the URL parameter is "code"
        const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      
        try {
          const temple_one = await TempleModel.findOne({ temple_code: code }).lean();
      
          if (temple_one && temple_one.temple_code) {
            // Set isToday to true for the current day and false for other days
            temple_one.temple_timings.forEach((timing) => {
              timing.isToday = timing.day === dayOfWeek;
            });
      
            const responseData = {
              resultFlag: 1,
              message: "Temple Record Found",
              ...temple_one,
            };
            res.json(responseData);
          } else {
            const responseData = {
              resultFlag: 0,
              message: "Temple Record Not Found",
            };
            res.json(responseData);
          }
        } catch (err) {
          console.error(err);
          const responseData = {
            resultFlag: 0,
            message: "Error occurred while fetching temple data",
          };
          res.json(responseData);
        }
      };
      
      



      exports.loveMantra = async (req, res) => {
        const data = req.body;
        try {
          // Assuming LoveMantraModel is a mongoose model for the database
          let LoveMantra = new LoveMantraModel({
            username: data.username,
            mantra_key: data.mantra_key,
            update_date: new Date(), // Use new Date() to get the current date and time
          });
          let addL = await LoveMantra.save();
      
          // Success response
          res.json({
            resultFlag: 1,
            message: "Love Mantra added successfully!",
            data: addL, // If you want to return the added LoveMantra data
          });
        } catch (error) {
          // Error response
          res.json({
            resultFlag: 0,
            message: "Failed to add Love Mantra.",
            error: error.message, // Optional: You can include the error message for debugging purposes
          });
        }
      };
      

      exports.loveMantraList = async (req, res) => {
        try {
          const { users } = req.query; // Extract the 'users' property from req.query
          const mantraList = await LoveMantraModel.find({ username: users }).sort({ lovem_id: -1 }).lean();
      
          // Create an empty array to store the data
          const mantraArray = [];
      
          // Add each mantra from the mantraList to the mantraArray
          mantraList.forEach(mantra => {
            mantraArray.push(mantra);
          });
      
          const anotherModelData = await MantraModel.find({ mantra_key: { $in: mantraArray.map(mantra => mantra.mantra_key) } }).lean();
      
          // Add the 'is_favorite_mantra' property to each item in 'anotherModelData'
          const updatedAnotherModelData = anotherModelData.map(item => ({
            ...item,
            is_favorite_mantra: true,
          }));
      
          const response = {
            resultFlag: updatedAnotherModelData.length > 0 ? 1 : 0,
            message: updatedAnotherModelData.length > 0 ? "Mantra Records found" : "Mantra Records not found",
            data: updatedAnotherModelData,
          };
      
          // Send the response
          res.status(200).json(response);
        } catch (err) {
          // Handle any errors that might occur during the process
          console.error('Error fetching mantra list:', err);
          res.status(500).json({ error: 'Failed to fetch mantra list' });
        }
      };
      


      exports.deleteMantraLove = async (req, res) => {
        try {
            const { username, mantra_key } = req.body; // Extract the 'username' and 'key' properties from req.body
    
            // Find the LoveMantraModel data with the given username and key
            const mantraLove = await LoveMantraModel.findOne({ username, mantra_key });
    
            if (!mantraLove) {
                return res.status(200).json({ resultFlag: 0, message: "Love MantraModel data not found" });
            }
    
            // Delete the LoveMantraModel data
            await LoveMantraModel.deleteOne({ username, mantra_key });
    
            return res.status(200).json({ resultFlag: 1, message: "LoveMantraModel data deleted successfully" });
        } catch (error) {
            console.error("Error deleting LoveMantraModel data:", error);
            res.status(500).json({ resultFlag: 0, message: "Internal server error" });
        }
    };
    

      exports.pujaTemplesAdd = async(req, res) =>{
        const data = req.body;
        const t_code = generateString(16);
        let PujaT = new PujaTemplesModel({
            temple_name: data.temple_name,
            summary: data.summary,
            address: data.address,
            puja_timing: data.puja_timing,
            temple_thumbnail: data.temple_thumbnail,
            puja_temple_code: t_code,
            puja_services: data.puja_services,
            update_date: newDate,
        });
        const save = PujaT.save();
        res.json(save);
      }

      exports.deletePujaTemple = async(req, res) =>{
        let id = req.query.id;
        PujaTemplesModel.remove({_id:id}, 
            function(err, data) {
                if(err){
                    res.json("Temples Not Deleted");
                }
                else{
                    res.json("Temples info Deleted");
                }
            }); 
      }

      exports.packagesTempleList = async(req, res) =>{
            const page = req.query.page || 1; // Current page number, defaulting to 1
            const limit = req.query.limit || 10; // Number of records per page, defaulting to 10
            const countPromise = PujaTemplesModel.countDocuments({});
            const dataPromise = PujaTemplesModel.find({})
            .sort({ p_temples_ids: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
            const [totalRecords, packageservice] = await Promise.all([countPromise, dataPromise]);
            const totalPages = Math.ceil(totalRecords / limit);
            const resultFlag = packageservice.length > 0 ? 1 : 0;
            const message = packageservice.length > 0 ? "Register Puja Records Found" : "Register Puja Record Not Found";
            const responseData = {
            resultFlag,
            message,
            data: packageservice,
            totalCount: totalRecords,
            totalPages,
            currentPage: page,
            };
            res.json(responseData);
      }

    //   exports.servicesDetailsPage = async(req, res) =>{
    //     try {
    //         const packageServiceCode = req.query.scode;
    //         const temple_code = req.query.tcode;
    //         const users = req.query.user;
    //         // Find the temples that contain the provided package_service_code
    //         const templesWithPackageServiceCode = await PujaTemplesModel.find({ puja_services: { $elemMatch: { package_service_code: packageServiceCode } } }).lean();
    //         if (templesWithPackageServiceCode.length === 0) {
    //           return res.status(404).json({ message: 'No temples found with the provided package_service_code' });
    //         }
    //         // Send the found temples as the response
    //         // Extract the desired data from the puja_services array
    //         const packageServiceData = templesWithPackageServiceCode.map(temple => {
    //             return temple.puja_services.find(service => service.package_service_code === packageServiceCode);
    //         });
    //         // Send the extracted data as the response
    //         res.status(200).json(packageServiceData);
    //       } catch (err) {
    //         // Handle any errors that might occur during the process
    //         console.error('Error fetching temples:', err);
    //         res.status(500).json({ error: 'Failed to fetch temples' });
    //       }
    //   }



    // exports.servicesDetailsPage = async (req, res) => {
    //     try {
    //       const packageServiceCode = req.query.scode;
    //       //const temple_code = req.query.tcode;
    //       const users = req.query.user;
      
    //       // Find the temples that contain the provided package_service_code
    //       const templesWithPackageServiceCode = await PujaTemplesModel.find({
    //         puja_services: { $elemMatch: { package_service_code: packageServiceCode } },
    //       }).lean();
      
    //       // Calculate the total package_discount_price and discount_amount
    //       let totalPackageDiscountPrice = 0;
    //       let totalDiscountAmount = 0;
      
    //       // Extract the desired data from the puja_services array, including package_extra_fee details
    //       const packageServiceData = templesWithPackageServiceCode.map(temple => {
    //         const pujaService = temple.puja_services.find(service => service.package_service_code === packageServiceCode);
    //         if (pujaService) {
    //           const packageExtraFeeData = pujaService.package_extra_fee.map(extraFee => {
    //             if (!extraFee.isFree) {
    //               totalDiscountAmount += parseFloat(extraFee.discount_amount);
    //             }
    //             return {
    //               isFree: extraFee.isFree,
    //               fee_code: extraFee.fee_code,
    //               tittle: extraFee.tittle,
    //               amount: extraFee.amount,
    //               discount_amount: extraFee.discount_amount,
    //             };
    //           });
      
    //           totalPackageDiscountPrice += parseFloat(pujaService.package_discount_price);
      
    //           return {
    //             temple_name: temple.temple_name,
    //             package_name: pujaService.package_name,
    //             package_price: pujaService.package_price,
    //             package_discount_price: pujaService.package_discount_price,
    //             package_details: pujaService.package_details,
    //             package_service_code: pujaService.package_service_code,
    //             package_extra_fee: packageExtraFeeData,
    //           };
    //         }
    //       });
      
    //       // Calculate the total price after discounts
    //       const totalPriceAfterDiscounts = totalPackageDiscountPrice + totalDiscountAmount;
      
    //       // Check if there is data available or not and set the resultFlag accordingly
    //       const resultFlag = packageServiceData.length > 0 ? 1 : 0;
    //       const message = resultFlag === 1 ? "Payment Summary Records found" : "No records found";
      
    //       // Send the extracted data and total price as the response
    //       res.status(200).json({
    //         resultFlag,
    //         message,
    //         packageServiceData,
    //         totalPriceAfterDiscounts,
    //       });
    //     } catch (err) {
    //       // Handle any errors that might occur during the process
    //       console.error('Error fetching temples:', err);
    //       res.status(500).json({ resultFlag: 0, message: 'Failed to fetch temples', data: [] });
    //     }
    //   };
      


    exports.servicesDetailsPage = async (req, res) => {
        try {
            const packageServiceCode = req.query.scode;
    
            // Find the temples that contain the provided package_service_code
            const templesWithPackageServiceCode = await PujaTemplesModel.find({
                puja_services: { $elemMatch: { package_service_code: packageServiceCode } },
            }).lean();
    
            if (templesWithPackageServiceCode.length === 0) {
                return res.status(404).json({ resultFlag: 0, message: "No records found" });
            }
    
            // Extract the first temple data
            const templeData = templesWithPackageServiceCode[0];
    
            // Extract the package data from the first temple that matches the packageServiceCode
            const pujaService = templeData.puja_services.find(
                (service) => service.package_service_code === packageServiceCode
            );
    
            const packageExtraFeeData = pujaService.package_extra_fee.map((extraFee) => ({
                isFree: extraFee.isFree,
                fee_code: extraFee.fee_code,
                tittle: extraFee.tittle,
                amount: extraFee.amount,
                discount_amount: extraFee.discount_amount,
            }));
    
            const totalPriceAfterDiscounts =
                parseFloat(pujaService.package_discount_price) +
                packageExtraFeeData.reduce(
                    (total, fee) => total + (fee.isFree ? 0 : parseFloat(fee.discount_amount)),
                    0
            );
    
            // Prepare the response
            const response = {
                resultFlag: 1,
                message: "Payment Summary Records found",
                temple_name: templeData.temple_name,
                package_name: pujaService.package_name,
                package_price: pujaService.package_price,
                package_discount_price: pujaService.package_discount_price,
                package_details: pujaService.package_details,
                package_service_code: pujaService.package_service_code,
                package_extra_fee: packageExtraFeeData,
                totalPriceAfterDiscounts,
            };
    
            res.status(200).json(response);
        } catch (err) {
            // Handle any errors that might occur during the process
            console.error("Error fetching temples:", err);
            res.status(500).json({ resultFlag: 0, message: "Failed to fetch temples", data: [] });
        }
    };
    

      exports.reelsAdd = async(req, res) =>{
            const data = req.body;
            const r_code = generateString(20);
            let addReels = new ReelsModel({
                reels_name: data.reels_name,
                reels_summary: data.reels_summary,
                reels_path: data.reels_path,
                reels_thumbnail: data.reels_thumbnail,
                reels_code: r_code,
                reels_category: data.reels_category,
                update_date: newDate,
            });
            const saveReels = addReels.save();
            res.json(saveReels);
      }


      exports.reelsDelete = async(req, res) =>{
        const data = req.body;
        const reels_code = data.reels_code;
        const reelsDelete = await ReelsModel.deleteOne({reels_code: reels_code});
        res.json(reelsDelete);
      }


      exports.reelsGenerate = async (req, res) => {
        try {
            const { page, perPage } = req.query;
            const pageNumber = parseInt(page) || 1;
            const itemsPerPage = parseInt(perPage) || 10; // Set a default of 10 items per page
    
            // Count total documents in the collection
            const totalCount = await ReelsModel.countDocuments();
            // Calculate total pages
            const totalPages = Math.ceil(totalCount / itemsPerPage);
    
            // Check if the requested page is out of range
            if (pageNumber > totalPages) {
                return res.status(404).json({ resultFlag: 0, message: "Page not found" });
            }
    
            // Retrieve data using aggregation pipeline with skip and limit
            const reelsGet = await ReelsModel.aggregate([
                { $skip: (pageNumber - 1) * itemsPerPage },
                { $limit: itemsPerPage },
                { $project: { _id: 0 } }, // Exclude the _id field from the response
            ]);
    
            const resultFlag = reelsGet.length > 0 ? 1 : 0;
            const message = resultFlag === 1 ? "Reels Records found" : "No data found";
    
            res.json({
                resultFlag,
                message,
                data: reelsGet,
                totalCount,
                totalPages,
                currentPage: pageNumber,
            });
        } catch (error) {
            console.error("Error in reelsGenerate:", error);
            res.status(500).json({ resultFlag: 0, message: "Internal server error" });
        }
    };

    exports.getRecentlyWatchedVideos = async (req, res) => {
        try {
            const { users, page, perPage } = req.query; // Extract the 'users', 'page', and 'perPage' properties from req.query
            const pageNumber = parseInt(page) || 1;
            const itemsPerPage = parseInt(perPage) || 10; // Set a default of 10 items per page
    
            const watchedVideos = await WatchedVideoModel.find({ username: users }).lean();
    
            if (watchedVideos.length === 0) {
                return res.status(200).json({ resultFlag: 0, message: "Videos Records not found", data: [] });
            }
    
            // Get an array of unique videos_key from the watched videos
            const uniqueVideoKeys = [...new Set(watchedVideos.map((video) => video.video_key))];
    
            // Calculate the starting index and ending index for pagination
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
    
            // Slice the videosList based on the pagination range
            const videosList = await VideosModel.find({ videos_key: { $in: uniqueVideoKeys } })
                .skip(startIndex)
                .limit(itemsPerPage)
                .lean();
    
            const response = {
                resultFlag: videosList.length > 0 ? 1 : 0,
                message: videosList.length > 0 ? "Videos Records found" : "No more data available",
                data: videosList,
                totalCount: uniqueVideoKeys.length,
                totalPages: Math.ceil(uniqueVideoKeys.length / itemsPerPage),
                currentPage: pageNumber,
            };
    
            // Send the response
            res.status(200).json(response);
        } catch (err) {
            // Handle any errors that might occur during the process
            console.error('Error fetching videos list:', err);
            res.status(500).json({ error: 'Failed to fetch videos list' });
        }
    };






    exports.updateProfile = async(req, res) =>{
        try {
            const updatedUserData = req.body; // The updated user data sent in the request body
            //const checkPhone = await UserModel.findOne({phone_no:updatedUserData.phone_no})
            // Update the user data in the database
            const updatedUser = await UserModel.findOneAndUpdate(
                { phone_no: updatedUserData.phone_no },
                updatedUserData,
                { new: true, runValidators: true } // Set new to true to return the updated document and runValidators to validate the updated data
            ).lean();
            if (!updatedUser) {
                return res.status(404).json({ resultFlag: 0, message: "User not found" });
            }
            // Send the updated user data as the response
            res.status(200).json({ resultFlag: 1, message: "User data updated successfully", data: updatedUser });
        } catch (error) {
            console.error('Error updating user data:', error);
            res.status(500).json({ error: 'Failed to update user data' });
        }        
    }
    

// Assuming you have imported the required modules and defined the UserModel properly

    // Assuming you have imported the required modules and defined the UserModel properly

    exports.getProfile = async (req, res) => {
        try {
            const user = req.query.user;
            const getUserDetails = await UserModel.findOne({ phone_no: user }, { phone_otp: 0, otp_session: 0, users_id: 0 }).lean();
    
            // Set default values for gender, location, and username if they are not available
            const userDetailsWithDefaults = {
                gender: "",
                location: "",
                username: "",
                horoscope: "",
                ...getUserDetails,
            };
    
            if (getUserDetails) {
                res.json({ resultFlag: 1, message: "User Record Found", ...userDetailsWithDefaults });
            } else {
                res.status(404).json({ resultFlag: 0, message: "User not found" });
            }
        } catch (err) {
            // Handle any potential errors that might occur during the database query
            res.status(500).json({ resultFlag: 0, message: "Internal Server Error" });
        }
    };
    


    
    
    


//-------------- API v2 ----------//
// exports.playVideoV2 = async (req, res) => {
//     try {
//         const user = req.query.user;
//         const vkey = req.query.vkey;

//         // Check if the user exists in the UserModel
//         const userExists = await UserModel.exists({ phone_no: user });

//         if (!userExists) {
//             return res.status(404).json({ resultFlag: 0, message: "User Not Found" });
//         }


//         // Find the video based on vkey and project only required fields
//         const watch_videos = await VideosModel.findOne(
//             {
//                 $and: [
//                     { videos_key: vkey },
//                     { videos_category: { $exists: true } }, // Ensure videos_category exists
//                 ],
//             },
//             {
//                 videos_url: 0,
//                 videos_keyword: 0,
//                 videos_temple_locate: 0,
//                 videos_key: 0,
//                 videos_publish: 0,
//             }
//         ).lean();

//         if (watch_videos) {
//             let sVi = new WatchedVideoModel({
//                 username: user,
//                 video_key: vkey,
//                 update_date: newDate,
//             });
//             sVi.save();
//             return res.json({ resultFlag: 1, message: "Video Found", ...watch_videos });
//         } else {
//             return res.json({ resultFlag: 0, message: "Video Not Found" });
//         }
//     } catch (error) {
//         res.status(500).json({ resultFlag: 0, message: "Internal server error" });
//     }
// };


    // exports.playVideoV2 = async (req, res) => {
    //     try {
    //         const user = req.query.user;
    //         const vkey = req.query.vkey;
    //         const promotional_banner = "https://kytstorage.b-cdn.net/Thumbnails/Temples%20Info/temple_1.jpg";
    //         // Check if the user exists in the UserModel
    //         const userExists = await UserModel.exists({ phone_no: user });

    //         if (!userExists) {
    //             return res.status(404).json({ resultFlag: 0, message: "User Not Found" });
    //         }

    //         // Find the video based on vkey and project only required fields
    //         const watch_videos = await VideosModel.findOne(
    //             {
    //                 $and: [
    //                     { videos_key: vkey },
    //                     { videos_category: { $exists: true } }, // Ensure videos_category exists
    //                 ],
    //             },
    //             {
    //                 videos_url: 0,
    //                 videos_keyword: 0,
    //                 videos_temple_locate: 0,
    //                 videos_key: 0,
    //                 videos_publish: 0,
    //             }
    //         ).lean();

    //         if (watch_videos) {
    //             let sVi = new WatchedVideoModel({
    //                 username: user,
    //                 video_key: vkey,
    //                 update_date: new Date(),
    //             });
    //             sVi.save();

    //             // Get related videos based on the same videos_category
    //             const relatedVideos = await VideosModel.find(
    //                 {
    //                     $and: [
    //                         { videos_key: { $ne: vkey } }, // Exclude the current video
    //                         { videos_category: watch_videos.videos_category }, // Get videos with the same videos_category
    //                     ],
    //                 }
    //             ).limit(5).lean();

    //             return res.json({ resultFlag: 1, message: "Video Found", ...watch_videos, relatedVideos, promotional_banner });
    //         } else {
    //             return res.json({ resultFlag: 0, message: "Video Not Found" });
    //         }
    //         } catch (error) {
    //             res.status(500).json({ resultFlag: 0, message: "Internal server error" });
    //         }
    // };




        exports.getUser = async(req, res) =>{
            const getU = await UserModel.find().lean();
            res.json(getU);
        }
        exports.getVideosall = async(req, res) =>{
            const getU = await VideosModel.find().lean();
            res.json(getU);
        }





        exports.playVideoV2 = async (req, res) => {
            try {
                const user = req.query.user;
                const vkey = req.query.vkey;
                const promotional_banner = "https://kytstorage.b-cdn.net/Thumbnails/Temples%20Info/temple_1.jpg";
                // Check if the user exists in the UserModel
                const userExists = await UserModel.exists({ phone_no: user });
        
                if (!userExists) {
                    return res.status(404).json({ resultFlag: 0, message: "User Not Found" });
                }
        
                // Find the video based on vkey and project only required fields
                const watch_videos = await VideosModel.findOne(
                    {
                        $and: [
                            { videos_key: vkey },
                            { videos_category: { $exists: true } }, // Ensure videos_category exists
                        ],
                    },
                    {
                        videos_url: 0,
                        videos_keyword: 0,
                        videos_temple_locate: 0,
                        videos_key: 0,
                        videos_publish: 0,
                    }
                ).lean();
        
                if (watch_videos) {
                    let sVi = new WatchedVideoModel({
                        username: user,
                        video_key: vkey,
                        update_date: new Date(),
                    });
                    sVi.save();
        
                    // Get related videos based on the same videos_category
                    const relatedVideos = await VideosModel.find(
                        {
                            $and: [
                                { videos_key: { $ne: vkey } }, // Exclude the current video
                                { videos_category: watch_videos.videos_category }, // Get videos with the same videos_category
                            ],
                        }
                    ).limit(5).lean();
        
                    // Check if videos_duration is available and add it to each related video
                    const relatedVideosWithDuration = relatedVideos.map(video => {
                        if ('videos_duration' in video) {
                            return video;
                        } else {
                            return { ...video, videos_duration: "" };
                        }
                    });
        
                    return res.json({ resultFlag: 1, message: "Video Found", ...watch_videos, relatedVideos: relatedVideosWithDuration, promotional_banner });
                } else {
                    return res.json({ resultFlag: 0, message: "Video Not Found" });
                }
            } catch (error) {
                res.status(500).json({ resultFlag: 0, message: "Internal server error" });
            }
        };







        exports.mantraByCategoryV2 = async (req, res) => {
            const user = req.query.user;
            const mantraId = req.query.category;
            const page = req.query.page || 1; // Current page number, defaulting to 1
            const limit = req.query.limit || 10; // Number of records per page, defaulting to 10
            const skip = (page - 1) * limit;
            
            try {
              const countPromise = MantraModel.countDocuments({ mantra_category: mantraId });
              const dataPromise = MantraModel.find({ mantra_category: mantraId })
                .sort({ mantra_id: -1 })
                .skip(skip)
                .limit(limit)
                .lean();
                
              const loveMantras = await LoveMantraModel.find({ username: user }).lean();
              const [totalRecords, mantrabycategory] = await Promise.all([countPromise, dataPromise]);
          
              // Function to check if a mantra_key is present in the LoveMantraModel
              const isFavoriteMantra = (mantraKey) => loveMantras.some(mantra => mantra.mantra_key === mantraKey);
          
              // Add 'is_favorite_mantra' property to each mantra in mantrabycategory based on its presence in LoveMantraModel
              const mantrabycategoryWithFavorites = mantrabycategory.map(mantra => ({
                ...mantra,
                is_favorite_mantra: isFavoriteMantra(mantra.mantra_key),
              }));
          
              const totalPages = Math.ceil(totalRecords / limit);
              const resultFlag = mantrabycategoryWithFavorites.length > 0 ? 1 : 0;
              const message = mantrabycategoryWithFavorites.length > 0 ? "Mantra Records Found" : "Mantra Records Not Found";
              const responseData = {
                resultFlag,
                message,
                data: mantrabycategoryWithFavorites,
                totalCount: totalRecords,
                totalPages,
                currentPage: page,
              };
              res.json(responseData);
            } catch (err) {
              console.error('Error fetching mantra list by category:', err);
              res.status(500).json({ error: 'Failed to fetch mantra list by category' });
            }
          };


          exports.mantraListenIdv2 = async (req, res) => {
            const user = req.query.user;
            const mantraKey = req.query.mantraKey;
            const manstraStream = await MantraModel.findOne({ mantra_key: mantraKey }).lean();
            
            try {
              const loveMantra = await LoveMantraModel.findOne({ username: user, mantra_key: mantraKey }).lean();
          
              if (manstraStream) {
                if (loveMantra) {
                  manstraStream.is_favorite_mantra = true;
                } else {
                  manstraStream.is_favorite_mantra = false;
                }
          
                const obj1 = {
                  resultFlag: 1,
                  message: "Mantra Audio Found",
                };
                
                const object_false = {
                  resultFlag: 0,
                  message: "Mantra Audio Not Found",
                };
                
                const responseObj = manstraStream.mantra_category ? { ...obj1, ...manstraStream } : object_false;
                res.json(responseObj);
              } else {
                res.json(object_false);
              }
            } catch (err) {
              console.error('Error fetching mantra by key:', err);
              res.status(500).json({ error: 'Failed to fetch mantra by key' });
            }
          };



          exports.forYouV2 = async (req, res) => {
            const user = req.query.user;
            const mantra = await MantraModel.find({}).sort({ mantra_id: -1 }).limit(4).lean();
            const music = await MusicModel.find({}).sort({ music_id: -1 }).limit(8).lean();
          
            try {
              // Fetching the LoveMantraModel data for the specified user
              const loveMantras = await LoveMantraModel.find({ username: user }).lean();
          
              // Create a Set of mantra keys from LoveMantraModel for faster lookup
              const favoriteMantraKeys = new Set(loveMantras.map(mantra => mantra.mantra_key));
          
              // Add 'is_favorite_mantra' property to each mantra in mantrasList
              const mantrasListWithFavorites = mantra.map(mantraItem => ({
                ...mantraItem,
                is_favorite_mantra: favoriteMantraKeys.has(mantraItem.mantra_key),
              }));
          
              const promotional_title = "Promotional Title";
              const promotional_thumbnail = "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=";
              const music_title = "Music for you";
              const mantras_title = "Mantras For You";
              const today_title = "Today Title";
              const today_content_short_description = "short_content";
              const today_content = "Today Content";
          
              const obj1 = {
                resultFlag: 1,
                message: "For You Record Found",
                today_title,
                today_content_short_description,
                today_content,
                mantras_title,
                mantrasList: mantrasListWithFavorites, // Use the updated mantrasList with is_favorite_mantra property
                promotional_title,
                promotional_thumbnail,
                music_title,
                musicList: music,
              };
          
              res.json(obj1);
            } catch (err) {
              console.error('Error fetching data for "For You":', err);
              res.status(500).json({ error: 'Failed to fetch data for "For You"' });
            }
          };
          

          
          exports.razorpayGenerateOrder = async (req, res) => {
            try {
              const { packageServiceCode, user } = req.body;
          
              const existingUser = await UserModel.findOne({ phone_no: user });
          
              if (!existingUser) {
                return res.status(404).json({ resultFlag: 0, error: 'User not found' });
              }
          
              const templeData = await PujaTemplesModel.findOne({
                'puja_services.package_service_code': packageServiceCode
              });
          
              if (!templeData) {
                return res.status(404).json({ resultFlag: 0, message: "No records found" });
              }
          
              const pujaService = templeData.puja_services.find(
                (service) => service.package_service_code === packageServiceCode
              );
          
              const packageExtraFeeData = pujaService.package_extra_fee;
          
              const totalPriceAfterDiscounts =
                parseFloat(pujaService.package_discount_price) +
                packageExtraFeeData.reduce(
                  (total, fee) => total + (fee.isFree ? 0 : parseFloat(fee.discount_amount)),
                  0
                );
          
              const description = `Puja Booking for ${templeData.temple_name} for package ${pujaService.package_name}`;
          
              const instance = new Razorpay({
                key_id: 'rzp_test_xmAF4mhT1iSMZ6',
                key_secret: 'xMZwdj0bpvk0w2GPhbGd77ty'
              });
          
              const orderOptions = {
                amount: totalPriceAfterDiscounts * 100, // Convert amount to paise (1 INR = 100 paise)
                currency: "INR",
                receipt: "receipt#1",
                notes: {
                  key1: "value3",
                  key2: "value2"
                }
              };
          
              instance.orders.create(orderOptions, async (error, order) => {
                if (error) {
                  console.error('Error creating Razorpay order:', error);
                  return res.status(500).json({ resultFlag: 0, error: 'Failed to create Razorpay order' });
                } else {
                  const newOrder = new OrderModel({
                    order_user_id: user,
                    order_user_phone: user,
                    package_service_code: packageServiceCode,
                    order_amount: totalPriceAfterDiscounts,
                    razorpay_order_id: order.id,
                    razorpay_payment_id: "",
                    payment_status: "Pending",
                    payment_description: description,
                    payment_date: new Date(),
                    update_date: new Date(),
                  });
          
                  await newOrder.save();
          
                  res.status(200).json({
                    resultFlag: 1, // Success, order created
                    message: 'Razorpay order created successfully',
                    order_id: order.id,
                    total_amount: totalPriceAfterDiscounts * 100,
                    currency: "INR",
                    user_id: user,
                    description
                  });
                }
              });
            } catch (err) {
              console.error('Error generating Razorpay order:', err);
              res.status(500).json({ resultFlag: 0, error: 'Failed to generate Razorpay order' });
            }
          };


          exports.razorpayPaymentStatusUpdate = async (req, res) => {
            try {
              const { order_id, payment_id, user, status, status_message } = req.body;
          
              // Check if order_id and user are present in OrderModel
              const existingOrder = await OrderModel.findOne({ razorpay_order_id: order_id, order_user_id: user });
              if (!existingOrder) {
                return res.status(200).json({ resultFlag: 0, error: 'Order not found' });
              }
          
              // Check if payment_status is already set to "success"
              if (existingOrder.payment_status === "success") {
                return res.json({ resultFlag: 1, message: 'Payment status already updated to success' });
              }
          
              // Update data in OrderModel by order.id and user
              existingOrder.razorpay_payment_id = payment_id;
              existingOrder.payment_status = status;
              existingOrder.update_date = new Date();
              await existingOrder.save();
          
              res.json({ resultFlag: 1, message: 'Payment status updated successfully' });
            } catch (err) {
              console.error('Error updating payment status:', err);
              res.status(500).json({ resultFlag: 0, error: 'Failed to update payment status' });
            }
          };
          
          
          

          
          





          exports.testRazor = async (req, res) => {
            try {
              const { amount } = req.body; // Assuming the mobile app sends the amount in the request body
          
              // Perform validation on the 'amount' if required
              // For example, check if the amount is a valid number, greater than zero, etc.
          
              const instance = new Razorpay({
                key_id: 'rzp_test_xmAF4mhT1iSMZ6',
                key_secret: 'xMZwdj0bpvk0w2GPhbGd77ty'
              });
          
              const orderOptions = {
                amount: amount * 100, // Convert amount to paise (1 INR = 100 paise)
                currency: "INR",
                receipt: "receipt#1",
                notes: {
                  key1: "value3",
                  key2: "value2"
                }
              };
          
              instance.orders.create(orderOptions, (error, order) => {
                if (error) {
                  // Handle error if any
                  console.error('Error creating Razorpay order:', error);
                  res.status(500).json({ error: 'Failed to create Razorpay order' });
                } else {
                  // Send the order ID to the mobile app in the response
                  res.status(200).json({ order_id: order.id });
                }
              });
            } catch (err) {
              console.error('Error generating Razorpay order:', err);
              res.status(500).json({ error: 'Failed to generate Razorpay order' });
            }
          };
          


          //Get All Order details
            exports.getAllOrderDetails = async (req, res) => {
                const uu = await OrderModel.find();
                res.json(uu);
            }

            //Post Model
            exports.addPost = async (req, res) => {
                const post = new PostModel({
                    article_title: req.body.article_title,
                    article_thumbnail: req.body.article_thumbnail,
                    article_link: req.body.article_link,
                    update_date: newDate
                });
                const savedPost = await post.save();
                res.json(savedPost);
            }
            exports.deteletPost = async (req, res) => {
                const uu = await PostModel.remove({ _id: req.params.postId });
                res.json(uu);
            }
            


            exports.panchangv2Post = async(req, res) =>{
              //insert data to PanchangV2Model
              const panchangv2 = new PanchangV2Model({
                panchang_thumbnail: req.body.panchang_thumbnail,
                panchang_title: req.body.panchang_title,
                panchang_time: req.body.panchang_time,
                slon: req.body.slon,
                mlon: req.body.mlon,
                tithinum: req.body.tithinum,
                tithi: req.body.tithi,
                paksha: req.body.paksha,
                tithiTill: req.body.tithiTill,
                nakshatra: req.body.nakshatra,
                nakshatraTill: req.body.nakshatraTill,
                yoga: req.body.yoga,
                karana: req.body.karana,
                rashi: req.body.rashi,
                publish_date: req.body.publish_date,
                update_date: newDate
              });
              const savedPanchangv2 = await panchangv2.save();
              res.json(savedPanchangv2);
            }

            exports.panchangAPIV2 = async(req, res) =>{
              const pdate = req.query.pdate;
              const panchangFetch = await PanchangV2Model.findOne({ publish_date: pdate }).lean();
              const resultFlag = panchangFetch ? 1 : 0;
              const message = panchangFetch ? "Panchang Record Found" : "Panchang Record Not Found";
              const responseData = {
              resultFlag,
              message,
              ...(panchangFetch && { ...panchangFetch }),
              };
              res.json(responseData);
          }