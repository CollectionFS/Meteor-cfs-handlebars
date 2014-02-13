// Define the helper scope
_scopeFS = {};

// Register the helper scope as `FS`
Handlebars.registerHelper('FS', _scopeFS);

// Add FS.inputFile XXX: This will prop. go away in the future
_scopeFS.inputFile = Template['FS.inputFile'];

Template['FS.inputFile'].options = function(className, multiple, o) {
  return {
    multiple: multiple,
    'class': className
  };
};

Template['FS.inputFile'].events({
  'change #files': function(event, temp) {
    if (temp.data && temp.data instanceof FS.Collection) {
      console.log('Got a file...');
      console.log(this);
      var uploads = temp.find('input[type=hidden]');

      uploads.value = _uploadFiles(event.target.files, temp.data);

      console.log(uploads.value);
      console.log(uploads);
    } else {
      throw new Error('{{> FS.inputFile}} requires a FS.Collection as input');
    }
  }
});

_uploadFiles = function(files, collectionFS) {
  var result = [];
  if (files.length) {
    for (var i = 0, f; f = files[i]; i++) {
      var file = collectionFS.insert(f);
      if (file) {
        result.push(file._id);
      }
    }    
  }
  return result; // Return array of file id's
};

// dropfile = function(elementId, collectionFS) {
//         var dropbox = document.getElementById(elementId);

//         // Prevent default drag and drop 
//         function noopHandler(evt) {
//           evt.stopPropagation();
//           evt.preventDefault();
//         } 

//         // Handle file dropped
//         function dropped(evt) {
//                 noopHandler(evt);                
//                 uploadFiles(evt.dataTransfer.files, collectionFS);
//         }

//         // init event handlers
//         dropbox.addEventListener("dragenter", noopHandler, false);
//         dropbox.addEventListener("dragexit", noopHandler, false);
//         dropbox.addEventListener("dragover", noopHandler, false);
//         dropbox.addEventListener("drop", dropped, false);

//         return dropbox;        
// };