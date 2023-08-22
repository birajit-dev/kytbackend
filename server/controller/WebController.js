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
const VideosCategoryModel = require('../model/videos_categories');
const VideosModel = require('../model/kytvideos');
const MusicCategoryModel = require('../model/music_categories');
const MusicModel = require('../model/music');
const ReelsModel = require('../model/reels');
const newDate = moment().format('lll');


    //Pandeet Database Page
    exports.pandeetPage = async(req, res) =>{
        const pandeetName = await PandeetModel.find({}).lean();
        res.render('pandeet_add',{
            pandeetName
        });
    }

    exports.addVc = async(req, res) =>{
        res.render('vcategory_add');
    }
    exports.mCategoryPage = async(req, res) =>{
        res.render('mcategories_add');
    }
    exports.musicPage = async(req, res) =>{
        const MusicCate = await MusicCategoryModel.find({}).lean();
        res.render('music_add',{
            MusicCate
        })
    }
    exports.mantraPage = async(req, res) =>{
        res.render('mantras');
    }

    exports.mantraCategoriesPage = async(req, res) =>{
        res.render('mantras_categories');
    }

    exports.wishesPage = async(req, res) =>{
        res.render('wishes');
    }

    exports.podcastPage = async(req, res) =>{
        res.render('podcast');
    }

    exports.horoscopePage = async(req, res) =>{
        res.render('horoscope');
    }
    exports.homePage = async(req, res, next) => {
        res.render('home');
    }
    exports.sentot = async(req, res, next) => {
        res.render('otp');
    }
    exports.blogs = async(req, res) =>{
        res.render('blogs');
    }



    exports.getAllReels = async(req, res) =>{
        const reels = await ReelsModel.find({}).lean();
        res.render('allreels',{
            reels
        });
    }
    exports.reelsPost = async(req, res) =>{
        res.render('reels');
    }
    exports.editReels = async(req, res) =>{
        const reels = await ReelsModel.findOne({_id: req.query.id}).lean();
        res.render('edit_reels',{
            reels
        });
    }

    exports.getAllMusic = async(req, res) =>{
        const music = await MusicModel.find({}).lean();
        res.render('all_music',{
            music
        });
    }
    exports.musicPost = async(req, res) =>{
        const music_categories = await MusicCategoryModel.find({}).lean();
        res.render('music',{
            music_categories
        });
    }
    exports.editMusic = async(req, res) =>{
        //edit music model
        const music_categories = await MusicCategoryModel.find({}).lean();
        const singleMusic = await MusicModel.findOne({_id: req.query.id}).lean();
        res.render('music_edit',{
            singleMusic,
            music_categories
        });
    }

    exports.getAllVidoes = async(req, res) =>{
        const category = await VideosCategoryModel.find({}).lean();
        const videos = await VideosModel.find({}).lean();
        res.render('videos_all',{
            videos, category
        });
    }

    exports.videosPost = async(req, res) =>{
        const category = await VideosCategoryModel.find({}).lean();
        const videos = await VideosModel.find({}).lean();
        res.render('videos_add',{
            videos, category
        });
    }

    exports.editVideos = async(req, res) =>{
        const category = await VideosCategoryModel.find({}).lean();
        const singleVideo = await VideosModel.findOne({ _id: req.query.id }).lean();
        res.render('videos_edit',{
            singleVideo,
            category
        });
    }
    

    
    
    



  




