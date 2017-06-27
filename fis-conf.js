/**
 * Created by vengean on 15/10/13.
 */

/**
 * 请求服务Service打包替换路径
 */
fis.match('*', {
    deploy: [
        fis.plugin('replace', {
            from: 'server_address',
            to: '/api/'
        }),
		fis.plugin('replace', {
            from: 'server_login_url',
            to: 'http://www.fayuan.dev:9001/page/login/login.html'
        }),
        fis.plugin('local-deliver')
    ]
});

fis.match('::packager', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true
    })
});

fis.match('*.{js,css,png,jpg,gif,jpeg,scss}', {
    useHash: false
});
// hash

fis.match('*.css', {
    useSprite: true
});

fis.match('/front-widget/**/*.js', {
    //optimizer: fis.plugin('uglify-js'),
    isMod: true
    //packTo: '/static/pkg.js'
});

fis.match('/page/**/*.js', {
    //optimizer: fis.plugin('uglify-js'),
    isMod: true
    //packTo: '/static/pkg.js'
});
fis.match('/components/**/*.js', {
    //optimizer: fis.plugin('uglify-js'),
    isMod: true
    //packTo: '/static/pkg.js'
});
fis.match('/page/index.js', {
    //optimizer: fis.plugin('uglify-js'),
    isMod: false
    //packTo: '/static/pkg.js'
});
fis.match('/page/widget/**/*.js', {
    //optimizer: fis.plugin('uglify-js'),
    isMod: true
    //packTo: '/static/pkg.js'
});

fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass')
});

fis.match('/page/**/*.{js}', {
    isMod: true,
    useHash: false
});


// fis.match('*.{css,node-sass}', {
//     useSprite: true,
//     optimizer: fis.plugin('clean-css')
// });
// 内置压缩样式

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});
// 内置压缩png图片

fis.media('test')
    .match('package.json', {
        release: false
    })
    .match('*.{js,css,png,jpg,gif,jpeg,scss}', {
        useHash: true
    })
    .match('/front-widget/**/*.{png,jpg,gif,jpeg}', {
        useHash: false
    })
    .match('/page/**/*.js', {
        useHash: false
    })
    .match('*', {
        deploy: [
            fis.plugin('replace', {
                from: 'server_address',
                to: '/api/'
            }),
    		fis.plugin('replace', {
                from: 'server_login_url',
                to: 'http://www.fayuan.test:19001/page/login/login.html'
            }),
            fis.plugin('local-deliver')
        ]
    });

fis.media('prod')
    .match('package.json', {
        release: false
    })
    .match('/front-jslib/*.{js,css,png,jpg,gif,jpeg,scss}', {
        useHash: true
    })
    .match('/static/*.{js,css,png,jpg,gif,jpeg,scss}', {
        useHash: true
    })
    .match('/page/**/*.js', {
        useHash: false
    })
    .match('/front-widget/**/*.{png,jpg,gif,jpeg}', {
        useHash: false
    });



fis.match('/mock/**', {
    release: '$0'
});

fis.match('/mock/server.conf', {
    release: '/config/server.conf'
});

fis.hook('amd', {
    baseUrl: '/',
    paths: {
        jquery: 'front-jslib/jquery-1.11.3',
        avalon: "front-jslib/avalon.js",
        mmRouter: 'front-jslib/mmRouter',
        text: 'front-jslib/text',
        css: 'front-jslib/css'
    },
    shim: {
        jquery: {
            exports: "$"
        },
        avalon: {
            exports: "avalon"
        },
        mmRouter: {
            deps: ['avalon']
        }
    },
    globalAsyncAsSync: true
});