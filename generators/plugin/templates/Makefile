DOCKER_RUN     := @docker run --rm
COMPOSER_IMAGE := -v "$$(pwd):/app" --user $$(id -u):$$(id -g) composer
NODE_IMAGE     := -w /home/node/app -v "$$(pwd):/home/node/app" --user node node:lts
HAS_LANDO      := $(shell command -v lando 2> /dev/null)
PLUGIN_VERSION := $$(grep "^ \* Version" <%= pluginDash %>.php| awk -F' ' '{print $3}' | cut -d ":" -f2 | sed 's/ //g')
HIGHLIGHT      :=\033[0;32m
END_HIGHLIGHT  :=\033[0m # No Color

.PHONY: build
build: build-pot-file  ## Generates a .pot file for use in translations.

.PHONY: build-pot-file
build-pot-file: | lando-start
	@echo "Generating .pot file"
	lando wp --path=./wordpress i18n make-pot --exclude="vender,wordpress,tests,node_modules,languages,.vscode,Docker" . ./languages/<%= pluginDash %>.pot

.PHONY: clean
clean: clean-assets clean-build clean-release ## Removes all build files and the plugin files. This is destructive.

.PHONY: clean-assets
clean-assets:
	@echo "Cleaning up plugin assets"
	rm -rf \
		languages/*.pot

.PHONY: clean-build
clean-build:
	@echo "Cleaning up build-artifacts"
	rm -rf \
		node_modules \
		wordpress \
		vendor \
		.phpunit.result.cache

.PHONY: clean-release
clean-release:
	@echo "Cleaning up release file"
	rm -f chriswiegman-theme*.zip

.PHONY: destroy
destroy: ## Destroys the developer environment completely (this is irreversible)
	lando destroy -y
	$(MAKE) clean

.PHONY: flush-cache
flush-cache: ## Clears all server caches enabled within WordPress
	@echo "Flushing cache"
	lando wp cache flush --path=./wordpress

.PHONY: delete-transients
delete-transients: ## Deletes all WordPress transients stored in the database
	@echo "Deleting transients"
	lando wp transient delete --path=./wordpress --all

.PHONY: help
help:  ## Display help
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
			printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
		}' $(MAKEFILE_LIST) | sort

.PHONY: install
install: | clean-assets clean-build
	$(MAKE) install-composer
	$(MAKE) install-npm

.PHONY: install-composer
install-composer:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) install

.PHONY: install-npm
install-npm:
	$(DOCKER_RUN) $(NODE_IMAGE) npm install

.PHONY: lando-start
lando-start:
ifdef HAS_LANDO
	if [ ! -d ./wordpress/ ]; then \
		$(MAKE) install; \
	fi
	if [ ! "$$(docker ps | grep <%= pluginNoSpaces %>_appserver)" ]; then \
		echo "Starting Lando"; \
		lando start; \
	fi
	if [ ! -f ./wordpress/wp-config.php ]; then \
		$(MAKE) setup-wordpress; \
		$(MAKE) setup-wordpress-plugins; \
		$(MAKE) build-pot-file; \
		echo "Your dev site is at: ${HIGHLIGHT}https://<%= pluginDash %>.lndo.site${END_HIGHLIGHT}"; \
		echo "See the readme for further details."; \
	fi
endif

.PHONY: lando-stop
lando-stop:
ifdef HAS_LANDO
	if [ "$$(docker ps | grep <%= pluginNoSpaces %>_appserver)" ]; then \
		echo "Stopping Lando"; \
		lando stop; \
	fi
endif

.PHONY: open
open: ## Open the development site in your default browser
	open https://<%= pluginDash %>.lndo.site

.PHONY: open-db
open-db: ## Open the database in TablePlus
	@echo "Opening the database for direct access"
	open mysql://wordpress:wordpress@127.0.0.1:$$(lando info --service=database --path 0.external_connection.port | tr -d "'")/wordpress?enviroment=local&name=$database&safeModeLevel=0&advancedSafeModeLevel=0

.PHONY: open-site
open-site: open

.PHONY: release
release: | build-pot-file <%= pluginDash %>-version.zip ## Generates a release zip of the plugin

.PHONY: reset
reset: destroy start ## Resets a running dev environment to new

.PHONY: setup-wordpress
setup-wordpress:
	@echo "Setting up WordPress"
	lando wp core download --path=./wordpress --version=latest
	lando wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --dbhost=database --path=./wordpress
	lando wp core install --path=./wordpress --url=https://<%= pluginDash %>.lndo.site --title="<%= pluginName %> Development" --admin_user=admin --admin_password=password --admin_email=<%= authorEmail %>

.PHONY: setup-wordpress-plugins
setup-wordpress-plugins:
	lando wp plugin install --path=./wordpress debug-bar --activate
	lando wp plugin install --path=./wordpress query-monitor --activate

.PHONY: start
start: lando-start open-site ## Starts the development environment including downloading and setting up everything it needs

.PHONY: stop
stop: lando-stop ## Stops the development environment. This is non-destructive.

.PHONY: test
test: test-lint test-phpunit  ## Run all testing

.PHONY: test-lint
test-lint: test-lint-php test-lint-javascript ## Run linting on both PHP and JavaScript

.PHONY: test-lint-javascript
test-lint-javascript: ## Run linting on JavaScript only
	@echo "Running JavaScript linting"
	$(DOCKER_RUN) $(NODE_IMAGE) npm run lint

.PHONY: test-lint-php
test-lint-php: ## Run linting on PHP only
	@echo "Running PHP linting"
	docker run \
		-v "$$(pwd):/app" \
		--workdir /app \
		--rm \
		php:7.4-cli \
		/app/vendor/bin/phpcs --standard=./phpcs.xml

.PHONY: test-phpunit
test-phpunit: ## Run PhpUnit
	@echo "Running Unit Tests Without Coverage"
	docker run \
		-v "$$(pwd):/app" \
		--workdir /app \
		--rm \
		php:7.4-cli \
		/app/vendor/bin/phpunit

.PHONY: trust-lando-cert-mac
trust-lando-cert-mac: ## Trust Lando's SSL certificate on your mac
	@echo "Trusting Lando cert"
	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.lando/certs/lndo.site.pem

.PHONY: update-composer
update-composer:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) update

.PHONY: update-npm
update-npm:
	$(DOCKER_RUN) $(NODE_IMAGE) npm update

.PHONY: <%= pluginDash %>-version.zip
<%= pluginDash %>-version.zip: clean-release
	@echo "Building release file: <%= pluginDash %>.$(PLUGIN_VERSION).zip"
	PLUGIN_VERSION=$(PLUGIN_VERSION) && cd ../ && zip --verbose -r -x=@<%= pluginDash %>/.zipignore <%= pluginDash %>/<%= pluginDash %>.$$PLUGIN_VERSION.zip <%= pluginDash %>/*
	if [ ! -f ./<%= pluginDash %>.$(PLUGIN_VERSION).zip  ]; then \
		echo "file not available"; \
		exit 1; \
	fi
