const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const episodeSchema = new mongoose.Schema({
            episode_id: Number,
            videos_title: String,
            videos_description: String,
            videos_category: String,
            videos_url: String,
            videos_path: String,
            videos_keyword: String,
            videos_temple_locate: String,
            videos_publish: String,
            videos_publisher: String,
            videos_thumbnail: String,
            videos_episode: String,
            episode_storage:{
                episode_1:{
                    type: String,
                },
                episode_2:{
                    type: String,
                },
                episode_3:{
                    type: String,
                },
                episode_4:{
                    type: String,
                },
                episode_5:{
                    type: String,
                },
                episode_6:{
                    type: String,
                },
                episode_7:{
                    type: String,
                },
                episode_8:{
                    type: String,
                },
                episode_9:{                           
                    type: String,
                },
                episode_10:{
                    type: String,
                },
            },
            
            episode_thumbnail:{
                episode_1:{
                    type: String,
                },
                episode_2:{
                    type: String,
                },
                episode_3:{  
                    type: String,
                },
                episode_4:{
                    type: String,
                },
                episode_5:{
                    type: String,
                },
                episode_6:{
                    type: String,
                },
                episode_7:{
                    type: String,
                },
                episode_8:{
                    type: String,
                },
                episode_9:{
                    type: String,
                },
                episode_10:{
                    type: String,
                },
            }

});

episodeSchema.plugin(AutoIncrement, {id:'episode_id',inc_field: 'episode_id'});
module.exports = mongoose.model('episodes', episodeSchema);