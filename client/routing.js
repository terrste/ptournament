Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  console.log("rendering home /");
  this.render("navbar", {to:"header"});
  this.render("landing_page", {to:"main"});
});


