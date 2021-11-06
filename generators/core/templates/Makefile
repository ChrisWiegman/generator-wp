DOCKER_RUN     := @docker run --rm
HAS_LANDO      := $(shell command -v lando 2> /dev/null)
HIGHLIGHT      :=\033[0;32m
END_HIGHLIGHT  :=\033[0m # No Color

.PHONY: clean
clean: clean-build  ## Removes all build files and the plugin files. This is destructive.

.PHONY: clean-build
clean-build:
	@echo "Cleaning up build-artifacts"
	rm -rf \
		wordpress

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

.PHONY: lando-start
lando-start:
ifdef HAS_LANDO
	if [ ! "$$(docker ps | grep <%= appNoSpaces %>_appserver)" ]; then \
		echo "Starting Lando"; \
		lando start; \
	fi
	if [ ! -f ./wordpress/wp-config.php ]; then \
		$(MAKE) setup-wordpress; \
		$(MAKE) setup-wordpress-plugins; \
		echo "Your dev site is at: ${HIGHLIGHT}https://<%= appDash %>.lndo.site${END_HIGHLIGHT}"; \
		echo "See the readme for further details."; \
	fi
endif

.PHONY: lando-stop
lando-stop:
ifdef HAS_LANDO
	if [ "$$(docker ps | grep <%= appNoSpaces %>_appserver)" ]; then \
		echo "Stopping Lando"; \
		lando stop; \
	fi
endif

.PHONY: open-db
open-db: ## Open the database in TablePlus
	@echo "Opening the database for direct access"
	open mysql://wordpress:wordpress@127.0.0.1:$$(lando info --service=database --path 0.external_connection.port | tr -d "'")/wordpress?enviroment=local&name=$database&safeModeLevel=0&advancedSafeModeLevel=0

.PHONY: open-site
open-site: ## Open the development site in your default browser
	open https://<%= appDash %>.lndo.site

.PHONY: reset
reset: destroy start ## Resets a running dev environment to new

.PHONY: setup-wordpress
setup-wordpress:
	@echo "Setting up WordPress"
	lando wp core download --path=./wordpress --version=latest
	lando wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --dbhost=database --path=./wordpress
	lando wp core install --path=./wordpress --url=https://<%= appDash %>.lndo.site --title="WordPress Development Site" --admin_user=admin --admin_password=password --admin_email=developer@wordpress.com

.PHONY: setup-wordpress-plugins
setup-wordpress-plugins:
	lando wp plugin install --path=./wordpress debug-bar --activate
	lando wp plugin install --path=./wordpress query-monitor --activate

.PHONY: start
start: lando-start open-site ## Starts the development environment including downloading and setting up everything it needs

.PHONY: stop
stop: lando-stop ## Stops the development environment. This is non-destructive.

.PHONY: trust-lando-cert-mac
trust-lando-cert-mac: ## Trust Lando's SSL certificate on your mac
	@echo "Trusting Lando cert"
	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.lando/certs/lndo.site.pem
