
#############
# VARIABLES #

# Set the node.js environment to test:
NODE_ENV ?= test


# NOTES #

NOTES ?= 'TODO|FIXME'


# MOCHA #

# Specify the test framework bin locations:
MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha

# Specify the mocha reporter:
MOCHA_REPORTER ?= spec


# ISTANBUL #

# Istanbul configuration:
ISTANBUL ?= ./node_modules/.bin/istanbul
ISTANBUL_OUT ?= ./reports/coverage
ISTANBUL_REPORT ?= lcov
ISTANBUL_LCOV_INFO_PATH ?= $(ISTANBUL_OUT)/lcov.info
ISTANBUL_HTML_REPORT_PATH ?= $(ISTANBUL_OUT)/lcov-report/index.html



# FILES #

# Source files:
SOURCES ?= perf-tests/*.js

# Test files:
TESTS ?= test/*.js



# PERFORMANCE TESTS #

PERF ?= ./bin/perf



###########
# TARGETS #


# PERFORMANCE TESTS #

.PHONY: perf perf-minimal perf-jsdom perf-jsdom-d3

perf: perf-minimal perf-jsdom perf-jsdom-d3

perf-minimal: node_modules
	$(PERF) --test minimal-element

perf-jsdom: node_modules
	$(PERF) --test jsdom

perf-jsdom-d3: node_modules
	$(PERF) --test jsdom-d3


# NOTES #

.PHONY: notes

notes:
	grep -Ern $(NOTES) $(SOURCES) $(TESTS)



# UNIT TESTS #

.PHONY: test test-mocha

test: test-mocha

test-mocha: node_modules
	NODE_ENV=$(NODE_ENV) \
	NODE_PATH=$(NODE_PATH_TEST) \
	$(MOCHA) \
		--reporter $(MOCHA_REPORTER) \
		$(TESTS)



# CODE COVERAGE #

.PHONY: test-cov test-istanbul-mocha

test-cov: test-istanbul-mocha

test-istanbul-mocha: node_modules
	NODE_ENV=$(NODE_ENV) \
	NODE_PATH=$(NODE_PATH_TEST) \
	$(ISTANBUL) cover \
	--dir $(ISTANBUL_OUT) --report $(ISTANBUL_REPORT) \
	$(_MOCHA) -- \
		--reporter $(MOCHA_REPORTER) \
		$(TESTS)



# COVERAGE REPORT #

.PHONY: view-cov view-istanbul-report

view-cov: view-istanbul-report

view-istanbul-report:
	open $(ISTANBUL_HTML_REPORT_PATH)



# NODE #

# Installing node_modules:
install:
	npm install

# Clean node:
clean-node:
	rm -rf node_modules



# CLEAN #

clean:
	rm -rf build
