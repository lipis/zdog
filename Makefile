bundle:
	node tasks/bundle

uglify:
	npx uglifyjs dist/zdog.dist.js -o dist/zdog.dist.min.js --mangle --comments /^!/

dist: bundle uglify

versionTick:
	node ./tasks/version

version: versionTick dist
	git add -A dist js
