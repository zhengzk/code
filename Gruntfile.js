/**
 * 相关配置文件
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            script: {
                files: [{
                    src: ['src/base/**/*js', 'src/basic/**/*.js'],
                    dest: 'js/basic.js'
                }, {
                    src: ['src/module/resume/**/*.js','src/module/resume.js'],
                    dest: 'js/resume.js'
                }]
            },
            style:{
                files: [{
                    src: ['src/base/css/basic.css','src/basic/**/*.css'],
                    //src: ['src/base/css/reset.css', 'src/base/css/basic.css','src/basic/**/*.css'],
                    dest: 'temp/basic.css'
                },{
                    src: ['src/module/resume/**/*.css'],
                    dest: 'temp/resume.css'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                report: "min",
                //beautify:true,
                //sourceMapRoot: '',
                //sourceMap: 'js/*.min.js.map',
                //sourceMapUrl: '*.min.js.map',
                compress: {
                    drop_console: true
                }
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'js/',
                    src: ['**/*.js'],
                    dest: 'js/',
                    ext: '.min.js'
                }]
            }
        },
        csscomb: {
            options: {
                config: 'csscomb.json'
            },
            build: {
                expand: true,
                cwd: 'temp/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.css'
            }
        },
        cssmin: {
            target: {
                options: {
                    compatibility: 'ie8', //设置兼容模式
                    noAdvanced: true //取消高级特性
                },
                files: [{
                    expand: true,
                    cwd: 'temp/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        clean: {
            build: {
                src: ["temp/*.css"]
            }
        }
    });

    // 加载相关任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat:script', 'uglify']);
    grunt.registerTask('css', ['concat:style','csscomb', 'cssmin','clean']);
};
