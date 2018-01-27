.PHONY: xpi host managed

xpi: extlib/webextensions-lib-configs/Configs.js extlib/webextensions-lib-options/Options.js
	git submodule update
	cp extlib/webextensions-lib-configs/Configs.js common/
	cp extlib/webextensions-lib-options/Options.js options/
	rm -f katakatataaaaaaan-we.xpi
	zip -r -0 katakatataaaaaaan-we.xpi *.json js/*.js _locales common images options

extlib/webextensions-lib-configs/Configs.js:
	git submodule update --init

extlib/webextensions-lib-options/Options.js:
	git submodule update --init

extlib/webextensions-lib-l10n/l10n.js:
	git submodule update --init

host:
	host/build.sh
	rm -f katakatataaaaaaan-we-host.zip
	cd host && zip -r -9 ../katakatataaaaaaan-we-host.zip 386 amd64 *.bat *.json

managed:
	rm -f katakatataaaaaaan-we-managed-storage.zip
	cd managed-storage && zip -r -9 ../katakatataaaaaaan-we-managed-storage.zip *.bat *.json

all: host managed xpi

