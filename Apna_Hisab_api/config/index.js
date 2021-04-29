const convict =  require('convict')


const config = convict({
    env:{
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default:'development',
        env: 'NODE_ENV'

    },
    ip:{
        doc:'IP addresses to bind',
        default:'127.0.0.1',
      },
    port:{
        doc:'port to bind',
        format:'port',
        default:8080,
        env:'PORT',


    },
    accessTokenSecret:{
      doc:'authenticate the user',
      default:'qwerrtytyui'
      },
    db:{
        host: {
        doc: 'Database host name/IP',
        format: '*',
        default: 'start'
      },
      user:{
        doc: 'Database Username',
        format: String
      },
      pass: {
        doc: 'Database password',
        format: String,
        sensitive: true
      },
      name: {
        doc: 'Database name',
        format: String,
        default: 'users',
      }
    } 

})

const env = config.get('env');
config.loadFile('./config/' + env + '.json');
//config.validate({allowed: 'strict'});
module.exports = config;