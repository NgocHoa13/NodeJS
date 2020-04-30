const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION');
    console.log(err.name, err.message);
    process.exit(1);
});
//we don't need the server here because these error not happen asynchronously now we have it before we require our main application
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
        //useUnifiedTopology: true
    })
    .then(
        /*con*/ () => {
            //console.log(con.connections);
            console.log('DB connection successful!');
        }
    );
// .catch(err => {
//     console.log('error', err.message);
// });

// const testTour = new Tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 497
// });

// testTour
//     .save()
//     .then(doc => {
//         console.log(doc);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//4 STaRT SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('uNHANDLER REJECTION');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
