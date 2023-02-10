var os = require("os")
var express = require("express")
var router = express.Router();
console.log('hostname : ' + os.hostname());

// OS type
console.log('type : ' + os.type());

// OS platform
console.log('platform : ' + os.platform());

const requireJsonContent = () => {
    return (req, res, next) => {
     
    res.json({
        hostname:os.hostname(),
        type:os.type(),
        platform:os.platform(),
    });
}
}

router.get('/cpus/', function(req, res, next) {
  res.json({
      cpus:os.cpus(),
  });
});

router.get('/cpus/:id', function(req, res, next) {
  res.json({
      cpus:os.cpus()[req.params.id],
  });
});

 
  
  module.exports = router;
  