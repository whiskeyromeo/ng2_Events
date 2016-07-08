const gulp =  require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const tsProject = typescript.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps');
const htmlreplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');

//clean the build dir contents
gulp.task('clean', () => {
	return del('build/**/*');
});

gulp.task('compile', ['clean'], () => {
	var tsResult = gulp
		.src('app/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/dist'));
});

gulp.task('moveHtml', ['clean'], () => {
	return gulp
		.src(["app/templates/*"])
		.pipe(gulp.dest('build/app/templates'));
});

gulp.task('minifyCss', ['clean'], () => {
	return gulp.src("static/css/*")
		.pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/static/css'))
})

gulp.task('moveResources', ['clean'], () => {
	return gulp
		.src(["index.html","systemjs.config.js", "static/img/*", "!**/*.ts"],
			{ base: './'})
		.pipe(gulp.dest('build'));
});


gulp.task("libs",['clean'],() => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'moment/min/moment.min.js',
            'bootstrap/dist/**',
            'ng2-bootstrap/bundles/ng2-bootstrap.min.js',
            'jquery/dist/jquery.min.js'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("./build/node_modules"));
});

gulp.task('clearIndex',['clean','moveResources', 'libs'],() => {
	var indexResources = [
		'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuBuEwXRt0RW6-su2mN7H3IDMfhO6l04&libraries=places'
	]

	return gulp.src('./build/index.html')
		.pipe(htmlreplace({
			'js': {
				src : indexResources,
				tpl : '<script src="%s"></script>'
			},
			'css':'node_modules/bootstrap/dist/css/bootstrap.min.css'
		}))
		.pipe(gulp.dest('build'))
});

gulp.task('build', ['compile', 'clearIndex', 'moveHtml', 'minifyCss'], () => {
	console.log('creating build...');
});

gulp.task('default', ['build']);




