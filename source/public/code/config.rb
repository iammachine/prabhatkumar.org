#!/usr/bin/env ruby


# prabhatkumar.org [v0.0.1]
# @author    : Prabhat Kumar
# @copyright : Prabhat Kumar
# @date      : 14-July-2015
# @require   : Ruby [v2.2.2]
# @require   : Sass - Selective Steve [3.4.15]
# @require   : Compass - Polaris [1.0.3]
# @require   : Breakpoint
# @require   : Builder
# @require   : Typogruby
# ============================================


require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'breakpoint'
require 'builder'
require 'typogruby'


# Set this to the root of your project when deployed:
http_path     = "/"
project_path  = File.expand_path(File.join(File.dirname(__FILE__), '/'))
sass_dir      = "assets/sass"

# To enable relative paths to assets via compass helper functions.
relative_assets = true

# selected preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded
