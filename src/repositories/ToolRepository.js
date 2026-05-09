const BaseRepository=require('./BaseRepository.js')
const Tool=require('../models/Tools.js')

class ToolRepository extends BaseRepository{
    constructor(){
        super(Tool)
    }
    /**
     * This method returns Tool by Tool Name
     * @param {*} name -Tool name
     * @returns 
     */
    async findByName(name){
        return await this.findOne({name});
    }
    async findByCategory(name){
        return await Tool.findByCategory({name});
    }
    async findPopular(){
        return await Tool.findPopular()
    }
    async search(searchQuery){
        return await this.findAll({
            $or:[
                {name: {$regex: searchQuery, $options: 'i'}},
                {description :{$regex: searchQuery, $options: 'i'}},
                {tags: {$in : [new RegExp(searchQuery,'i')]}}
            ]
        },{sort: {createdAt: -1}});
    }
}
module.exports=ToolRepository