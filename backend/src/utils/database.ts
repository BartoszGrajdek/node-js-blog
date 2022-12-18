const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

type databaseConnection = any;

interface clientObject {
    db: () => void
};

let _db: databaseConnection = undefined;

const mongoConnect = (callback: () => void) => {
    MongoClient.connect('mongodb://admin:pass@mongodb:27017/blog?authMechanism=DEFAULT&authSource=admin', {useUnifiedTopology: true}).then((client: clientObject) => {
        console.log('connected');
        _db = client.db();
        callback();
    }).catch((err: object) => {
        console.log(err);
        throw err;
    })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;