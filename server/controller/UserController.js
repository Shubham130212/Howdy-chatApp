  
const User=require("../models/UserModel");
const bcrypt=require("bcrypt");

//signup
module.exports.register=async(req,res,next)=>{
   try{
   const{username,email,password}=(req.body);
   const usernameCheck=await User.findOne({username})
   if(usernameCheck){
      return res.json({message:"Username already used",status:false});
   }
   const emailCheck=await User.findOne({email})
   if(emailCheck){
      return res.json({message:"Email already used",status:false});
   }
   const hashedPassword=await bcrypt.hash(password,10);
   const user=await User.create({email,username,password:hashedPassword,});
   delete user.password;
   return res.json({status:true,user});
}
catch(err){
   next(err);
}
   
};

//login
module.exports.login=async(req,res,next)=>{
   try{
   const{username,password}=(req.body);
   const user=await User.findOne({username});
   if(!user){
      return res.json({message:"incorrect username or password",status:false});
   }
   const isPasswordValid=await bcrypt.compare(password,user.password);
   if(!isPasswordValid){
      return res.json({message:"incorrect username or password",status:false});
   }
  delete user.password;
   
   return res.json({status:true,user});
}
catch(err){
   next(err);
}
   
};

//setAvatar
module.exports.setAvatar=async(req,res,next)=>{
   try{
       const userid=req.params.id;
       const avatarImage=req.body.image;
       const userData=await User.findByIdAndUpdate(userid,{
         isAvatarImageSet:true,
         avatarImage,
       });
       return res.json({
         isSet:userData.isAvatarImageSet,
         image:userData.avatarImage,
       });
   }
   catch(err){
      next(err);
   }
};

//getAllUser
module.exports.getAllUsers=async(req,res,next)=>{
   try{
      const users=await User.find({_id:{$ne:req.params.id}}).select([
         "email","username","avatarImage","_id",
      ]);
      return res.json(users);
   }
   catch(err){
      next(err);
   }
};

//logout
module.exports.logOut = (req, res, next) => {
   try {
     if (!req.params.id) return res.json({ msg: "User id is required " });
     onlineUsers.delete(req.params.id);
     return res.status(200).send();
   } catch (err) {
     next(err);
   }
 };