
    var express    = require( 'express' ),
        connect    = require( 'connect' ),
        staticPath = __dirname + '/app/';

    function initialiseServer (indexFile, port) {

        var server = express();

        server.use( connect.logger('dev') );
        server.use( express.static(staticPath) );

        server.get('/*', function (request, response) {
            response.sendfile(staticPath + indexFile);
        });

        server.listen(port);

        console.log('Started Server on: http://localhost:' + port);

        return server;

    }

    // check args passed to node
    if (process.argv[2] === 'dev') {

        initialiseServer('indexdev.html', 3000);

    }

    if (process.argv[2] === 'dist') {

        initialiseServer('indexdist.html', 3333);

    }