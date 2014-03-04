cfs-handlebars
=========================

NOTE: This branch is under active development right now (2014-3-3). It has
bugs and the API may continue to change. Please help test it and fix bugs,
but don't use in production yet.

A Meteor package that adds handlebars helpers for [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS).

## Installation

NOTE: Until this is added to atmosphere, use this in smart.json:

```js
"cfs-handlebars": {
  "git": "https://github.com/CollectionFS/Meteor-cfs-handlebars.git",
  "branch": "shark"
}
```

Install using Meteorite. When in a Meteorite-managed app directory, enter:

```bash
$ mrt add cfs-handlebars
```

## General FS.File Helpers

### url

Returns the HTTP file URL for the current FS.File.

Use with an `FS.File` instance as the current context.

Specify a `store` attribute to get the URL for a specific store. If you don't
specify the store name, the URL will be for the copy in the first defined store.

```
{{url}}
{{url store="thumbnail"}}
```

### isImage

Returns true if the copy of this file in the specified store has an image
content type. If the file object is unmounted or was not saved in the specified
store, the content type of the original file is checked instead.

Use with an `FS.File` instance as the current context.

```
{{#if isImage}}
{{/if}}
{{#if isImage store='thumbnail'}}
{{/if}}
```

### isAudio

Returns true if the copy of this file in the specified store has an audio
content type. If the file object is unmounted or was not saved in the specified
store, the content type of the original file is checked instead.

Use with an `FS.File` instance as the current context.

```
{{#if isImage}}
{{/if}}
{{#if isImage store='thumbnail'}}
{{/if}}
```

### isVideo

Returns true if the copy of this file in the specified store has a video
content type. If the file object is unmounted or was not saved in the specified
store, the content type of the original file is checked instead.

Use with an `FS.File` instance as the current context.

```
{{#if isImage}}
{{/if}}
{{#if isImage store='thumbnail'}}
{{/if}}
```

### cfsFormattedSize

Formats the file size of the current FS.File using any format string supported by
numeral.js. If you don't specify formatString, a default format string
`0.00 b` is used.

Use with a `FS.File` as the current context.

Specify a `store` attribute to get the size for a specific store. If you don't
specify the store name, the size of the original uploaded file is used.

```
{{cfsFormattedSize}}
```

--OR--

```
{{cfsFormattedSize store="thumbnail" formatString=formatString}}
```

## User Interface Element Helpers

### cfsDeleteButton

Creates an HTML `<button>` element for the current `FS.File` which, when clicked,
deletes the file from its FS.Collection, thereby deleting its data and the data
for any copies from their respective stores.

By default, the button will say "Delete". If you want something else as 
children of the generated `button` element, then use this component as a block
and put your content within the block.

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting `<button>` element.

```
{{> cfsDeleteButton}}
{{> cfsDeleteButton class="btn"}}
{{#cfsDeleteButton class="btn"}}Delete This Image{{/cfsDeleteButton}}
```