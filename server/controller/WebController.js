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
const VideosCategory = require('../model/videos_categories');
const  MusicCategoryModel = require('../model/music_categories');
const newDate = moment().format('lll');


    //Pandeet Database Page
    exports.pandeetPage = async(req, res) =>{
        const pandeetName = await PandeetModel.find({}).lean();
        res.render('pandeet_add',{
            pandeetName
        });
    }
    exports.videosPage = async(req, res) =>{
        const vCname = await VideosCategory.find({}).lean();
        res.render('videos_add',{
            vCname
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


    



    
    
    
    



  




