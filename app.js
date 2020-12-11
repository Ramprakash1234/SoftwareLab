var express 	= require("express"),
	app			= express(),
	mongoose	= require("mongoose"),
	bodyparser	= require("body-parser");

app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended: true}));

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);

mongoose.connect("mongodb://localhost/employeelist");

let employeeSchema=new mongoose.Schema({
		eName:String,
		eMail:String,
		eAddress:String,
		eSalary:Number,
		ePhone:Number,
});
let employees=mongoose.model("employees",employeeSchema);

//=======================================================================
//==============================ROUTES===================================
//=======================================================================

app.get("/",function(req,res){
	res.redirect("/corporate");	
});
app.get("/corporate",function(req,res){
	employees.find({},function(err,employees){
		res.render("allemployees",{employees:employees});
	});
});

app.get("/addEmployee",function(req,res){
	res.render("addEmployee");
});

app.post("/addEmployee",function(req,res){
	employees.create({
						eName:req.body.name,
						eMail:req.body.mail,
						eAddress:req.body.address,
						eSalary:req.body.salary,
						ePhone:req.body.phone,
	},function(err,emp){
		res.redirect("/corporate");
	});
});
app.listen(3000,function(req,res){
	console.log("App is running");
});