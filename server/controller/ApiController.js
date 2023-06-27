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
const { json } = require('body-parser');
const { rmSync } = require('fs');





const newDate = moment().format('lll');
//Value KEY Generator for Podcast and Videos & Musics
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
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
            url: add.title,
            description: add.description,
            thumbnail: add.thumbnail,
            category: add.category,
            keyword: add.keyword,
            update_date: newDate, 
        });
        const hh = await addB.save();
        res.json(hh);
    }
