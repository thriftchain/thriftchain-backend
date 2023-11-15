const Notification = require("../models/notificationModel");

module.exports.getNotification = async (req, res)=>{
    try{
        const notifications = await Notification.find().sort('-timestamp').limit(10).exec();
        res.status(200).json(notifications);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports.addNotification = async (notification, io)=>{
    try{
        const newNotification = new Notification(notification);
        await newNotification.save();
        io.emit("notification", newNotification);
        res.status(200).json(newNotification);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
