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
const music = require('../model/music');
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
                const {lucky_numbers,lucky_colour,presiding_deity,auspicious_dates,panchang_date,panchang_day,vikranm_samvat,shak_samvat,ion,season,month,side,p_date,nakshatra,yoga,rahukal,sunrise,sunset,directional,extra_1,extra_2,extra_3,extra_4,extra_5,extra_6,extra_7,extra_8,extra_9,extra_10,panchang_thumbnail,pandeet,heading,content} = req.body;
                let uploadPanchang = new PanchangModel({
                    lucky_numbers: lucky_numbers, 
                    lucky_colour:lucky_colour,
                    presiding_deity:presiding_deity,
                    auspicious_dates:auspicious_dates,
                    panchang_date:panchang_date,                                    
                    panchang_day:panchang_day,                                      
                    vikranm_samvat:vikranm_samvat,
                    shak_samvat:shak_samvat,                                      
                    ion:ion,                                     
                    season:season,                                       
                    month:month,                                     
                    side:side,                                     
                    p_date:p_date,                               
                    nakshatra:nakshatra,                                
                    yoga:yoga,                                  
                    rahukal:rahukal,                                 
                    sunrise:sunrise,                             
                    sunset:sunset,                                 
                    directional:directional,                        
                    extra_1:extra_1,                                   
                    // extra_2: extra_2,                                   
                    // extra_3:extra_3,                                
                    // extra_4: extra_4,                                     
                    // extra_5:extra_5,                                  
                    // extra_6:extra_6,                                        
                    // extra_7:extra_7,                             
                    // extra_8:extra_8,              
                    // extra_9:extra_9,                   
                    // extra_10:extra_10,                                  
                    panchang_thumbnail:panchang_thumbnail,
                    pandeet_name:pandeet,                                   
                    update_date:'Hello World'                      
                });
                await uploadPanchang.save();


                res.send('Panchang Save Successfully.');
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
                let addVideos = new VideosModel({
                    videos_title: addV.videos_title,
                    videos_description: addV.videos_description,
                    videos_category: addV.videos_category,
                    videos_url: addV.videos_url,
                    videos_key: addV.videos_key,
                    videos_sub_category: addV.videos_sub_category,
                    videos_path: addV.videos_path,
                    videos_keyword: addV.videos_keyword,
                    videos_temple_locate: addV.videos_temple_locate,         
                    videos_thumbnail: addV.videos_thumbnail,
                    videos_publisher: addV.videos_publisher,
                    videos_publish: addV.videos_publish,
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
                let adMusic = new MusicModel({
                    music_title: addM.music_title,
                    music_category: addM.music_category,
                    music_subcategory: addM.music_subcategory,
                    music_url: addM.music_url,
                    music_key: addM.music_key,
                    music_path: addM.music_path,
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
                let manatraAdd = new MantraModel({
                    mantra_title: mantraData.mantra_title,
                    mantra_path: mantraData.mantra_path,
                    mantra_url: mantraData.mantra_url,
                    mantra_key: mantraData.mantra_key,
                    mantra_category: mantraData.mantra_category,
                    mantra_sloak: mantraData.mantra_sloak,
                    mantra_thumbnail: mantraData.mantra_thumbnail,
                    mantra_publish: mantraData.mantra_publish,
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
            const podcast = await PodcastModel.find({}).sort({podcast_id: -1}).lean();
            res.json(podcast);
        }
        exports.podcastView = async(req, res) =>{
            const pKey = req.query.pKey;
            const podcastWatch = await PodcastModel.findOne({podcast_key:pKey}).lean();
            res.json(podcastWatch);
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
            const mantrabycategory = await MantraModel.find({ mantra_category: mantraId }).sort({ mantra_id: -1 }).lean();
            const resultFlag = mantrabycategory.length > 0 ? 1 : 0;
            const message = mantrabycategory.length > 0 ? "Mantra Records Found" : "Mantra Records Not Found";
            const responseData = {
            resultFlag,
            message,
            data: mantrabycategory
            };
            res.json(responseData);
            /* const mantraId = req.query.category;
            const mantrabycategory = await MantraModel.find({mantra_category:mantraId}).sort({mantra_id:-1}).lean();
            const trueData = {
                resultFlag: 0,
                message: "Mantra Records Not Found",
                data: mantrabycategory
            };
            const falseData = {
                resultFlag: 1,
                message: "Mantra Records Found",
                data: mantrabycategory
            };
            let text = "";
            for(var i=0 ;i<mantrabycategory.length;i++) {
                text = mantrabycategory[0].mantra_category;
            }
            if(text){
                res.json(falseData)
            }else{
                res.json(trueData);
            }
            */
        }




        exports.mantraListenId = async(req, res) =>{
            const mantraKey = req.query.mantraKey;
            const manstraStream = await MantraModel.findOne({mantra_key:mantraKey}).lean();
            res.json(manstraStream);
        }




        //Musci API/
        exports.MusicCategories = async(req, res) =>{
            const musicCategory = await MusicCategoriesModel.find({}).sort({music_categories_id:-1}).lean();
            res.json(musicCategory);
        }
        exports.MusicFilter = async(req, res) =>{
            const category = req.query.category;
            const subcategory = req.query.subcategory;

            if(subcategory == "all"){
                const musicFilter = await MusicModel.find({music_category:category}).sort({music_id:-1}).lean();
                res.json(musicFilter);
            }
            else{
                const musicFilter = await MusicModel.find({$and:[{music_category:category},{music_subcategory:subcategory}]}).sort({music_id:-1}).lean();
                res.json(musicFilter);
            }
            
        }
        exports.MusicListen = async(req, res) =>{
            const musicKey = req.query.musicKey;
            const listen = await MusicModel.findOne({music_key:musicKey}).lean();
            res.json(listen);
        }

        //Wishes/
        exports.wishesAPI = async(req, res) =>{
            /* const pageSize = 10; // Number of documents to retrieve per page
            const page = req.query.page || 1; // Current page number (default: 1)
            const count = await WishesModel.countDocuments({});
            const totalPages = Math.ceil(count / pageSize);
            const skipDocuments = (page - 1) * pageSize;
            const wish = await WishesModel.find({})
            .sort({ wishes_id: -1 })
            .skip(skipDocuments)
            .limit(pageSize)
            .lean();
            const hasData = wish && wish.length > 0;
            const falseData = {
            resultFlag: 1,
            message: "Wishes Record Found",
            data: wish,
            totalPages: totalPages
            };
            const trueData = {
            resultFlag: 0,
            message: "Wishes Record Not Found",
            data: wish,
            totalPages: totalPages
            };
            res.json(hasData ? falseData : trueData); */
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
    exports.authUser = async(req, res) =>{
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
                    "thumbnail_sign":"aries.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"2",
                    "horoscope_title": "Taurus",
                    "category":"taurus",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"3",
                    "horoscope_title": "Gemini",
                    "category":"gemini",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"4",
                    "horoscope_title": "Cancer",
                    "category":"cancer",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"5",
                    "horoscope_title": "Leo",
                    "category":"leo",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"6",
                    "horoscope_title": "Virgo",
                    "category":"virgo",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"7",
                    "horoscope_title": "Scorpio",
                    "category":"scorpio",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"8",
                    "horoscope_title": "Sagittarius",
                    "category":"sagittarius",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"9",
                    "horoscope_title": "Capricorn",
                    "category":"capricorn",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"10",
                    "horoscope_title": "Aquarius",
                    "category":"aquarius",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"11",
                    "horoscope_title": "Pisces",
                    "category":"pisces",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                },
                {
                    "_id":"12",
                    "horoscope_title": "Libra",
                    "category":"libra",
                    "thumbnail_sign":"taurus.jpg",
                    "update_date":"19/06/2023",
                }
            ]
        };
        res.json(obj1);
    }