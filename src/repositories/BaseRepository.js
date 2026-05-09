class BaseRepository{
    constructor(model){
        this.model=model;
    }
    async findAll(filter={},options={}){
        const {sort,skip,limit,populate,select}=options
        let query=this.model.find(filter);
        if(sort) query=query.sort(select);
        if(skip) query=query.skip(skip);
        if(limit) query=query.limit(limit);
        if(populate) query=query.populate(populate);
        if(select) query=query.select(select);
        return await query.exec();
    }
    async findById(id,options={}){
        const {populate,select}=options;
        let query=query.findById(id);
        if(populate) query=query.populate(populate);
        if(select) query=query.select(select);
        return await query.exec();
    }
    async findOne(filters,options={}){
        const {populate,select}=options;
        let query=query.findOne(filters);
        if(populate) query=query.populate(populate);
        if(select) query=query.select(select);
        return query.exec();
    }
    async create(data){
        const document=new this.model(data);
        return await document.save();
    }
    async updateById(id,updateData,options={}){
        const defaultOptions={
            new: true,
            runValidators: true,
            ...options
        }
        return await this.model.findByIdAndUpdate(
            id,
            {...updateData,updatedAt: new Date()},
            defaultOptions
        );
    }
    async deleteById(id){
        return await this.model.findByIdAndDeleteById(id);
    }
    async count(filters={}){
        return await this.model.countDocuments(filters);
    }
}
module.exports=BaseRepository