# Geonym

## Overview

Geonym is a computational geometry playground.

Check it out: http://geonym.io/

## Extending

To create a new named space to explore (such as burrito or zen), create a subclass of Space and call your init method before you're done. The purpose of a `Space` subclass is to answer five questions:

* `identifier`: the unique ID to use to refer to your space, set in init().
* `title`: the title to display above your space, also set in init().
* `summary`: the text to display below your space, also set in init().
* `generate()`: the method that generates the data to be rendered.
* `render(context,structure)`: the method that draws the structure onto the active canvas context.

Check out the Zen class for a working template.

## Deploying

Just push to master on this repo.

