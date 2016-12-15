var path = require('path')
var fs = require('fs')
var createTemplate = require('lodash/template')

var packageJsonPath = path.join(__dirname, '..', 'package.json')
var sourceFilePath = path.join(__dirname, 'readme.tpl.md')
var targetFilePath = path.join(__dirname, '..', 'README.md')

var packageInfo = require(packageJsonPath)
var context = {}

/**
 * Setup template variables
 */
context.package = packageInfo

/**
 * Read template
 */
var uncompiledTemplate = fs.readFileSync(sourceFilePath, 'utf8')
var template = createTemplate(uncompiledTemplate)

/**
 * Write built template
 */
fs.writeFileSync(targetFilePath, template(context), 'utf8')
