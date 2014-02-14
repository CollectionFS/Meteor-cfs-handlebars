cfs-handlebars
=========================

NOTE: This branch is under active development right now (2013-11-18). It has
bugs and the API may continue to change. Please help test it and fix bugs,
but don't use in production yet.

A Meteor package that adds handlebars helpers for [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS).

## Installation

NOTE: Until this is added to atmosphere, use this in smart.json:

```js
"cfs-handlebars": {
  "git": "https://github.com/CollectionFS/Meteor-cfs-handlebars.git",
  "branch": "master"
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

## Upload Helpers

### cfsIsUploading

When used with a `FS.File` as the current context, returns true if
the current FS.File is being uploaded from this client. When used
outside of a `FS.File` context, returns true if *any* files are being
uploaded from this client.

```
{{#if cfsIsUploading}}
{{/if}}
```

### cfsUploadProgress

Returns an integer indicating the percentage progress of the upload.

When used with a `FS.File` as the current context, returns the progress
for that `FS.File`. When used outside of a `FS.File` context,
returns total progress for all files that are being uploaded from this client.

```
{{#if cfsIsUploading}}
Upload Progress: {{cfsUploadProgress}}%
{{/if}}
```

### cfsUploadProgressBar

Outputs an HTML5 `<progress>` element that shows the progress of the upload.

When used with a `FS.File` as the current context, shows the progress
for that `FS.File`. When used outside of a `FS.File` context,
shows total progress for all files that are being uploaded from this client.

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting progress element.

```
{{#if cfsIsUploading}}
{{cfsUploadProgressBar}} Uploading...
{{/if}}
```

### cfsUploadsArePaused

True if the upload queue is paused.

```
{{#if cfsUploadsArePaused}}
<div><button type="button" class="resumeUploads">Resume All Uploads</button></div>
{{else}}
<div><button type="button" class="pauseUploads">Pause All Uploads</button></div>
{{/if}}
```

## Download Helpers

### cfsIsDownloading

When used with a `FS.File` as the current context, returns true if
the current FS.File is being downloaded from this client. When used
outside of a `FS.File` context, returns true if *any* files are being
downloaded from this client.

When used with a `FS.File` as the current context, you **must** specify a `store`
attribute.

```
{{#if cfsIsDownloading}}
{{/if}}

{{#with myFSFile}}
  {{#if cfsIsDownloading store="thumbnail"}}
  {{/if}}
{{/with}}
```

### cfsDownloadProgress

Returns an integer indicating the percentage progress of the download.

When used with a `FS.File` as the current context, returns the progress
for that `FS.File`. When used outside of a `FS.File` context,
returns total progress for all files that are being downloaded from this client.

When used with a `FS.File` as the current context, you **must** specify a `store`
attribute.

```
{{#if cfsIsDownloading}}
Download Progress: {{cfsDownloadProgress}}%
{{/if}}

{{#each files}}
{{#if cfsIsDownloading store="thumbnail"}}
Download Progress: {{cfsDownloadProgress store="thumbnail"}}%
{{/if}}
{{/each}}
```

### cfsDownloadProgressBar

Outputs an HTML5 `<progress>` element that shows the progress of the download.

When used with a `FS.File` as the current context, shows the progress
for that `FS.File`. When used outside of a `FS.File` context,
shows total progress for all files that are being downloaded from this client.

When used with a `FS.File` as the current context, you **must** specify a `store`
attribute.

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting progress element.

```
{{#if cfsIsDownloading}}
{{cfsDownloadProgressBar}} Downloading...
{{/if}}

{{#if cfsIsDownloading copy="thumbnail"}}
{{cfsDownloadProgressBar copy="thumbnail"}} Downloading...
{{/if}}
```

```
{{#if cfsIsDownloading}}
{{cfsDownloadProgressBar}} Downloading...
{{/if}}

{{#each files}}
{{#if cfsIsDownloading store="thumbnail"}}
{{cfsDownloadProgressBar store="thumbnail"}} Downloading...
{{/if}}
{{/each}}
```

### cfsDownloadsArePaused

True if the upload queue is paused.

```
{{#if cfsDownloadsArePaused}}
<div><button type="button" class="resumeDownloads">Resume All Downloads</button></div>
{{else}}
<div><button type="button" class="pauseDownloads">Pause All Downloads</button></div>
{{/if}}
```

## User Interface Element Helpers

### cfsDeleteButton

Creates an HTML `<button>` element for the current `FS.File` which, when clicked,
deletes the file from its FS.Collection, thereby deleting its data and the data
for any copies from their respective stores.

Specify a `content` attribute to set the button element content. If you don't
specify content, the button will say "Delete".

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting `<button>` element.

```
{{cfsDeleteButton}}
{{cfsDeleteButton class="btn"}}
{{cfsDeleteButton content="Delete This Image" class="btn"}}
```

### cfsDownloadButton

Creates an HTML `<button>` element for the current `FS.File` which, when clicked,
initiates downloading of the file by the browser. This uses a FileSaver
shim which should support most modern browsers.

Specify a `content` attribute to set the button element content. If you don't
specify content, the button will say "Download".

Specify a `store` attribute to indicate the store from which you want to
download. If you don't specify a store name, it will download the file from the
first store listed in the collection's `stores` array.

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting `<button>` element.

Examples:

```
{{cfsDownloadButton}}
{{cfsDownloadButton class="btn"}}
{{cfsDownloadButton content="Download This Image" class="btn"}}
{{cfsDownloadButton store="thumbnail" class="btn"}}
```

### cfsFileInput

Creates an HTML file input element that uploads to the given FS.Collection as
soon as the user selects a file (or files).

As the first positional argument, specify the FS.Collection instance to use.

As a second (optional) positional argument, specify an object to be used as metadata. A helper on the template that returns an object is useful here. This is completely optional.

Any other attributes you specify on the helper (for example, "class") will be
transferred to attributes on the resulting `<input>` element.

**app.html:**

```
{{cfsFileInput myImageFiles}}
{{cfsFileInput myImageFiles multiple="multiple"}}
{{cfsFileInput myImageFiles metadata}}
{{cfsFileInput myImageFiles metadata multiple="multiple"}}
```

**client.js:**

```js
var Images = new FS.Collection(/* ... */);
Template.images.myImageFiles = function() {
  return Images;
};

Template.images.metadata = {
  userId:Meteor.userId()
};
```