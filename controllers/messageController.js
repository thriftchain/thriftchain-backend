const Message = require("../models/messageModel");

module.exports.getMessages = async(req, res)=>{
    try{
        const messages = await Message.find().sort('-timestamp').limit(10).exec();
        res.status(200).json(messages);
    }catch(err){
        console.error(err)
        res.status(500).json(err);
    }
}

module.exports.addMessage = async(message, wsInstance)=>{
    try{
        const parsedMessage = JSON.parse(message);
        const newMessage = new Message(parsedMessage);
        await newMessage.save();

        wsInstance.getWss().clients.forEach((client)=>{
            client.send(JSON.stringify([newMessage]));
        })
    }catch(err){
        console.error(err)
        
    }
}