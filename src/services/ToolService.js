const ToolRepository=require('../repositories/ToolRepository.js')

class ToolService{
    constructor(){
        this.model=new ToolRepository();
    }
    async createTool(tooldata){
        try{
            const existingTool=await this.ToolRepository.findByName(tooldata.name);
            if(existingTool){
                throw new Error("This tool already exisits");
            }
            const savedTool= await this.ToolRepository.createTool(tooldata);
            return savedTool;
        }
        catch(err){
            throw new Error(`Failed to create new tool: ${err.message}`);
        }
    }
    async createBulkTools(toolsdata){
        const result={
            created: [],
            failed: [],
            total: toolsdata.length
        }
        for(const tooldata of toolsdata){
            try{
                const createdtool=await this.ToolRepository.createTool(tooldata);
                result.created.push(createdtool)
            }
            catch(err){
                result.failed.push({
                    failed: tooldata,
                    msg: err.message
                })
            }
        }
        return result;
    }
    async getAlltools(filters={},options={}){
        try{
            const tools=await this.ToolRepository.findAll(filters,options);
            return tools;
        }
        catch(err){
            throw new Error(`failed to fetch tools: ${err.message}`)
        }
    }
    async getToolbyId(id){
        try{
            const tool=await this.ToolRepository.findById(id);
            if(!tool){
                throw new Error('Tool not found');
            }
            return tool;
        }
        catch(err){
            throw new Error(`Failed to fetch tool: ${err.message}`);
        }
    }
    async updateTool(id, updateData){
        try{
            const tool=await this.ToolRepository.findByIdandUpdate(id,updateData);
            if(!tool){
                throw new Error('Tool not found');
            }
            return tool;
        }
        catch(err){
            if(err.name==="ValidationError"){
                const msg=Object.values(err.errors).map(err=>err.message);
                throw new Error(`Validation failed: ${msg.join(',')}`);
            }
            throw new Error(`Failed to update tool: ${err.message}`);
        }
    }
    async deleteTool(id){
        try{
            const tool=await this.ToolRepository.deleteById(id);
            if(!tool){
                throw new Error("Tool doesn't exist");
            }
            return tool;
        }
        catch(err){
            throw new Error(`Failed to delete tool: ${err.message}`);
        }
    }
    async deleteBulkTools(ids){
        const result={
            created: [],
            failed: [],
            total: ids.length
        };
        for(const id of ids){
            try{
                const deletedtool=await this.ToolRepository.deleteTool(id);
                result.created.push(deletedtool);
            }
            catch(err){
                result.failed.push({
                    id,
                    err: err.message
                });
            }
        }
        return result;
    }
    async getToolsByCategory(category) {
        try {
            const tools = await this.toolRepository.findByCategory(category);
            return tools;
        } catch (error) {
            throw new Error(`Failed to fetch tools by category: ${error.message}`);
        }
    }

    async getPopularTools() {
        try {
            const tools = await this.toolRepository.findPopular();
            return tools;
        } catch (error) {
            throw new Error(`Failed to fetch popular tools: ${error.message}`);
        }
    }

    async searchTools(query) {
        try {
            const tools = await this.toolRepository.search(query);
            return tools;
        } catch (error) {
            throw new Error(`Failed to search tools: ${error.message}`);
        }
    }
}
module.exports=ToolService