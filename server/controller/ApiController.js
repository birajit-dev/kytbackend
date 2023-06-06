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
                    vcategories_name: vData.vcategories_name,
                    vcategories_thumbnail: vData.vcategories_thumbnail,
                    vcategories_keywrods: vData.vcategories_keywrods,
                    vcategories_descriptions: vData.vcategories_descriptions,
                    update_date: newDate, 
                });
                await upVcategories.save();
                res.send("Videos Categories Saved,")
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
                res.send("Videos Categories Saved,")

            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addMusic = async(req, res) =>{
            try{
                const addM = req.body;
                let adMusic = new MusicModel({
                    music_title: adMusic.music_title,
                    music_description: adMusic.music_description,
                    music_category: adMusic.music_category,
                    music_subcategory: adMusic.music_subcategory,
                    music_url: adMusic.music_url,
                    music_path: adMusic.music_path,
                    music_keyword: adMusic.music_keyword,
                    music_thumbnail: adMusic.music_thumbnail,
                    music_publisher: adMusic.music_publisher,
                    music_publish: adMusic.music_publish,
                    update_date: newDate,
                });
                await addM.save();
                res.send('Music Saved');
            }catch(error){
                res.status(400).json({message: error.message})
            }
        }

        exports.addMcategories = async(req, res) =>{
            try{
                const addMc = req.body;
                let addMct = new MusicCategoriesModel({
                    mcategories_name: addMc.mcategories_name,
                    mcategories_thumbnail: addMc.mcategories_thumbnail,
                    mcategories_keywrods: addMc.mcategories_keywrods,
                    mcategories_descriptions: addMc.mcategories_descriptions,
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
                    podcast_thumbnail: podData.podcast_thumbnail,
                    podcast_publish: podData.podcast_publish,
                    update_date: newDate,
                })
                await addPodData.save();
                res.send("Music Categories Saved");
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
                res.send("Horoscope Added Successfully");
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.wishesPost = async(req, res) =>{
            try{
                const wData = res.body;
                let wishesAdd = new WishesModel({
                    wishes_thumbnail: wData.wishes_thumbnail,
                    wishes_url: wData.wishes_url,
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
                    mantras_categories_name: mantraCdata.mantras_categories_name,
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
                    mantra_category: mantraData.mantra_category,
                    mantra_keyword: mantraData.mantra_keyword,
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
                const videos_categories = await VideosModel.find({videos_category:vcategory}).sort({videos_id:-1}).lean();
                res.json(videos_categories);
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }

        exports.playVideos = async(req, res) =>{
            try{
                const vkey = req.query.vkey;
                const watch_videos = await VideosModel.find({videos_key:vkey}).lean();
                res.json(watch_videos);
            }catch(error){
                res.status(400).json({message: error.message});
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



    
    
    
    



  




