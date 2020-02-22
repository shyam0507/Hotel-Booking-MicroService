var env = process.env.NODE_ENV || 'development';
console.log(env)
if(env === undefined){
    env = 'development';
}

//console.log("Env", env);

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    //console.log(config);

    var envConfig = config[env];

    //console.log(Object.keys(envConfig));

    Object.keys(envConfig).forEach(key => {

        process.env[key] = envConfig[key];

    });
}