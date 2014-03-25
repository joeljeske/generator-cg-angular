'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

	yeoman.generators.NamedBase.apply(this, arguments);

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var name = this.name;
    var defaultDir = this.config.get('serviceDirectory');
    if (!_(defaultDir).endsWith('/')) {
        defaultDir += '/';
    }

    var relative = path.relative(this.destinationRoot(),this.env.cwd);
    if (relative) {
        defaultDir = relative + '/' + defaultDir;
    }

    var prompts = [
        {
            name:'dir',
            message:'Where would you like to create the service files?',
            default: defaultDir
        }
    ];

    this.prompt(prompts, function (props) {
        this.dir = cgUtils.cleanDirectory(props.dir);
        cb();
    }.bind(this));
};

ServiceGenerator.prototype.files = function files() {

    var module = cgUtils.getParentModule(this.dir);
    this.appname = module.name;

    cgUtils.processTemplates(this.name,this.dir,'service',this,null,null,module);

};
