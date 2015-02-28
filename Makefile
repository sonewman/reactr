mocha:
	mocha --compilers js:jsx-compiler.js --recursive test/

karma:
	karma start karma.conf.js /Users/sam/code/reactr/test/
